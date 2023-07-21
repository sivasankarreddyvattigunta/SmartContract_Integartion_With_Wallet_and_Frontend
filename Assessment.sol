// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract siva {
    address public owner;
    uint256 public numAccounts;

    constructor() {
        owner = msg.sender;
        numAccounts = 0;
    }

    function getNetworkName() public view returns (string memory) {
        return getNetwork();
    }

    function getOwnerAddress() public view returns (address) {
        return owner;
    }

    function getNumConnectedAccounts() public view returns (uint256) {
        return numAccounts;
    }

    function getNetwork() private view returns (string memory) {
        uint256 chainId;
        assembly {
            chainId := chainid()
        }
        if (chainId == 1) return "Mainnet";
        if (chainId == 3) return "Ropsten";
        if (chainId == 4) return "Rinkeby";
        if (chainId == 5) return "Goerli";
        if (chainId == 42) return "Kovan";
        return "Unknown";
    }

    function connectAccount() public {
        numAccounts++;
    }

    function disconnectAccount() public {
        require(numAccounts > 0, "No accounts to disconnect");
        numAccounts--;
    }
}
