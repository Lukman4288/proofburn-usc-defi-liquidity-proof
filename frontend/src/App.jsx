import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const CONTRACT_ADDRESS = "0x4E3bc91B437cd59eeB3774e6A53BaF9b0e9704f1";

const ABI = [
  "function commitLiquidity(uint256 amount) external",
  "function balanceOf(address owner) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "event LiquidityCommitted(address indexed user,uint256 amount,uint256 timestamp)"
];

export default function App() {
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState("1");
  const [balance, setBalance] = useState("0");
  const [totalSupply, setTotalSupply] = useState("0");
  const [totalBurned, setTotalBurned] = useState("0");
  const [burnPercent, setBurnPercent] = useState("0");
  const [loading, setLoading] = useState(false);
  const [lastTx, setLastTx] = useState(null);
  const [history, setHistory] = useState([]);

  const provider =
    typeof window !== "undefined"
      ? new ethers.BrowserProvider(window.ethereum)
      : null;

  const connectWallet = async () => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xaa36a7" }]
    });

    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
    loadStats(accounts[0]);
    listenBurnEvent(accounts[0]);
  };

  const loadStats = async (userAddress) => {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ABI,
      signer
    );

    const userBal = await contract.balanceOf(userAddress);
    const supply = await contract.totalSupply();

    const formattedBal = ethers.formatEther(userBal);
    const formattedSupply = ethers.formatEther(supply);

    const initialSupply = 1000000;
    const burned = initialSupply - parseFloat(formattedSupply);
    const percent = ((burned / initialSupply) * 100).toFixed(4);

    setBalance(parseFloat(formattedBal).toFixed(4));
    setTotalSupply(parseFloat(formattedSupply).toFixed(4));
    setTotalBurned(burned.toFixed(4));
    setBurnPercent(percent);

    setHistory(prev => [
      ...prev,
      {
        time: new Date().toLocaleTimeString(),
        supply: parseFloat(formattedSupply)
      }
    ]);
  };

  const commit = async () => {
    try {
      setLoading(true);

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        signer
      );

      const tx = await contract.commitLiquidity(
        ethers.parseEther(amount)
      );

      await tx.wait();

      setLastTx(tx.hash);
      alert("🔥 Burn Success!");
      loadStats(account);
    } catch (err) {
      console.log(err);
      alert("Transaction gagal ❌");
    }

    setLoading(false);
  };

  const listenBurnEvent = async (userAddress) => {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ABI,
      signer
    );

    contract.on("LiquidityCommitted", async () => {
      console.log("🔥 Burn detected realtime");
      loadStats(userAddress);
    });
  };

  useEffect(() => {
    if (!window.ethereum) return;
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d0d",
        color: "white",
        padding: "40px",
        fontFamily: "sans-serif"
      }}
    >
      <h1 style={{ color: "#ff8800" }}>🔥 ProofBurn Dashboard</h1>

      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Connected: {account}</p>
      )}

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <Card title="Your Balance" value={`${balance} PBT`} />
        <Card title="Total Supply" value={`${totalSupply} PBT`} />
        <Card title="Total Burned" value={`${totalBurned} PBT`} />
        <Card title="Burn %" value={`${burnPercent}%`} />
      </div>

      <div style={{ marginTop: 30 }}>
        <input
          value={amount}
          onChange={e => setAmount(e.target.value)}
          style={{ padding: 10 }}
        />
        <button
          onClick={commit}
          disabled={loading}
          style={{
            padding: 10,
            background: "#ff8800",
            color: "white",
            marginLeft: 10
          }}
        >
          {loading ? "Processing..." : "Burn"}
        </button>
      </div>

      {lastTx && (
        <p style={{ marginTop: 20 }}>
          Last Tx:{" "}
          <a
            href={`https://sepolia.etherscan.io/tx/${lastTx}`}
            target="_blank"
            rel="noreferrer"
          >
            View on Etherscan
          </a>
        </p>
      )}

      <div style={{ marginTop: 50 }}>
        <h2>🔥 Burn History</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history}>
            <CartesianGrid stroke="#333" />
            <XAxis dataKey="time" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="supply"
              stroke="#ff8800"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "#1a1a1a",
        padding: 20,
        borderRadius: 12,
        width: 220,
        boxShadow: "0 0 20px rgba(255,136,0,0.3)"
      }}
    >
      <h3>{title}</h3>
      <h2 style={{ color: "#ff8800" }}>{value}</h2>
    </div>
  );
}
