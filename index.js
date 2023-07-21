import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [numAccounts, setNumAccounts] = useState(0);
  const [networkId, setNetworkId] = useState("");
  const [networkName, setNetworkName] = useState("");
  const [accountInfo, setAccountInfo] = useState(undefined);

  // Replace this with the correct contract address and ABI
  const contractAddress = "0x5FD6eB55D12E759a21C09eF703fe0CBa1DC9d88D";
  const accountInfoABI = [
	{
		"inputs": [],
		"name": "connectAccount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "disconnectAccount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getNetworkName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumConnectedAccounts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwnerAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "numAccounts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(new ethers.providers.Web3Provider(window.ethereum));
    }
  };

  const handleAccount = (account) => {
    if (account && account.length > 0) {
      console.log("Account connected: ", account);
      setAccount(account[0]);
      setNumAccounts(account.length);
    } else {
      console.log("No account found");
      setAccount(undefined);
      setNumAccounts(0);
    }
  };

  const handleNetwork = (networkId) => {
    console.log("Network ID connected: ", networkId);
    setNetworkId(networkId);
    setNetworkName(getNetworkName(networkId));
  };

  const getNetworkName = (networkId) => {
    switch (networkId) {
      case "1":
        return "Mainnet";
      case "3":
        return "Ropsten";
      case "4":
        return "Rinkeby";
      case "5":
        return "Goerli";
      case "42":
        return "Kovan";
      default:
        return "Unknown";
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.listAccounts();
    handleAccount(accounts);
    handleNetwork((await ethWallet.getNetwork()).chainId.toString());

    getAccountInfoContract();
  };

  const getAccountInfoContract = async () => {
    if (ethWallet) {
      try {
        const provider = ethWallet.getSigner();
        const accountInfoContract = new ethers.Contract(contractAddress, accountInfoABI, provider);
        setAccountInfo(accountInfoContract);
      } catch (error) {
        console.error("Error getting contract instance:", error.message);
      }
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask in order to use this ATM.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your MetaMask wallet</button>;
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Number of Accounts Connected: {numAccounts}</p>
        <p>Network ID: {networkId}</p>
        <p>Network Name: {networkName}</p>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>siva's metamask information</h1>
      </header>
      <div>
        {initUser()}
        <style jsx>{`
          .container {
            text-align: center;
          }
        `}</style>
      </div>
    </main>
  );
}
