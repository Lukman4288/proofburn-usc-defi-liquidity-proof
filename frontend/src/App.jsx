import { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import "./App.css";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const ABI = [
  "function commitLiquidity(uint256 amount) external",
  "function balanceOf(address owner) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "event LiquidityCommitted(address indexed user,uint256 amount,uint256 newTotalSupply,uint256 timestamp)"
];

const INITIAL_SUPPLY = 1000000;

export default function App() {
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState("1");
  const [balance, setBalance] = useState("0");
  const [totalSupply, setTotalSupply] = useState("0");
  const [totalBurned, setTotalBurned] = useState("0");
  const [burnPercent, setBurnPercent] = useState("0");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const providerRef = useRef(null);
  const contractRef = useRef(null);

  // Initialize provider once
  useEffect(() => {
    if (window.ethereum) {
      providerRef.current = new ethers.BrowserProvider(window.ethereum);
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Install MetaMask first");
      return;
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }] // Sepolia
      });

      const accounts = await providerRef.current.send(
        "eth_requestAccounts",
        []
      );

      const signer = await providerRef.current.getSigner();
      contractRef.current = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        signer
      );

      setAccount(accounts[0]);

      await loadStats(accounts[0]);
      listenEvents();
    } catch (err) {
      alert(err.reason || err.message);
    }
  };

  const loadStats = async (user) => {
    try {
      const contract = contractRef.current;

      const bal = await contract.balanceOf(user);
      const supply = await contract.totalSupply();

      const formattedBal = parseFloat(ethers.formatEther(bal));
      const formattedSupply = parseFloat(ethers.formatEther(supply));
      const burned = INITIAL_SUPPLY - formattedSupply;

      setBalance(formattedBal.toFixed(2));
      setTotalSupply(formattedSupply.toFixed(2));
      setTotalBurned(burned.toFixed(2));
      setBurnPercent(((burned / INITIAL_SUPPLY) * 100).toFixed(4));
    } catch (err) {
      console.error(err);
    }
  };

  const burn = async () => {
    try {
      setLoading(true);

      const tx = await contractRef.current.commitLiquidity(
        ethers.parseEther(amount)
      );

      await tx.wait();

      await loadStats(account);
    } catch (err) {
      alert(err.reason || err.message);
    }

    setLoading(false);
  };

  const listenEvents = () => {
    const contract = contractRef.current;

    contract.removeAllListeners("LiquidityCommitted");

    contract.on(
      "LiquidityCommitted",
      (user, amt, newSupply, timestamp) => {
        const formatted = {
          amount: parseFloat(ethers.formatEther(amt)),
          supply: parseFloat(ethers.formatEther(newSupply)),
          timestamp: new Date(
            Number(timestamp) * 1000
          ).toLocaleTimeString()
        };

        setHistory((prev) => [formatted, ...prev.slice(0, 19)]);
      }
    );
  };

  return (
    <div className="container">
      <h1>🔥 ProofBurn Dashboard</h1>

      {!account && (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}

      {account && (
        <>
          <p>
            Connected: {account.slice(0, 6)}...
            {account.slice(-4)}
          </p>

          <div className="cards">
            <div className="card">Balance: {balance} PBT</div>
            <div className="card">Supply: {totalSupply} PBT</div>
            <div className="card">Burned: {totalBurned} PBT</div>
            <div className="card">Burn %: {burnPercent}%</div>
          </div>

          <div className="burn-box">
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={burn} disabled={loading}>
              {loading ? "Processing..." : "Burn"}
            </button>
          </div>

          <h3>🔥 Burn History</h3>
          <ul>
            {history.map((item, i) => (
              <li key={i}>
                {item.timestamp} — Burn {item.amount} PBT → Supply {item.supply}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
