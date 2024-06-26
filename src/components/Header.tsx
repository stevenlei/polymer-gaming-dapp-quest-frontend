import Link from "next/link";
import { useAccount, useConnect, useDisconnect, useChainId } from "wagmi";
// import { optimismSepolia } from "wagmi/chains";
// import { switchChain } from "@wagmi/core";

const Header = () => {
  const account = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  // const chainId = useChainId();

  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="text-2xl font-bold tracking-tight">
        <Link href="/">Gaming dApp</Link>
      </h1>
      <ul className="flex gap-x-16">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/points">Points</Link>
        </li>
        <li>
          <Link href="/nft">NFT</Link>
        </li>
        <li>
          <Link href="/leaderboard">Leaderboard</Link>
        </li>
      </ul>
      <div className="w-32 text-right">
        <button
          className="bg-black text-white text-center px-4 py-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          type="button"
          onClick={() => {
            if (account.status === "connected") {
              disconnect();
            } else {
              if (connectors.length === 0) {
                alert("No wallets detected.");
                return;
              }

              connect({
                connector: connectors[0],
              });
            }
          }}
          disabled={
            account.status === "connecting" || account.status === "reconnecting"
          }
        >
          {account.status === "connecting" || account.status === "reconnecting"
            ? "Loading..."
            : account.status === "connected"
              ? "Disconnect"
              : "Connect"}
        </button>
      </div>
    </header>
  );
};

export default Header;
