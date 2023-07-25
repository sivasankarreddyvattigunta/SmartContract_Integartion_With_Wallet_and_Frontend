Hardhat Project

This repository contains a starter project for integrating smart contract using solidity and Hardhat.

Getting Started

To get the code running on your computer, follow the steps below:

1. Clone the GitHub Repository

git clone <repository_url>
2. Install Dependencies
Inside the project directory, open your terminal and run the following command to install the necessary dependencies:

npm install

3. Open Additional Terminals
Open two additional terminals within your Visual Studio Code (or any other code editor).

4. Start Local Hardhat Node
In the second terminal, run the following command to start the local Hardhat node:

npx hardhat node

5. Deploy Smart Contracts
In the third terminal, run the following command to deploy the smart contracts to the local network:

npx hardhat run --network localhost scripts/deploy.js

6. Launch the Frontend
Go back to the first terminal and run the following command to launch the frontend application:


npm run dev

7. Access the Application
The project should now be running on your localhost at: 

http://localhost:3000/

Author

VATTIGUNTA SIVA SANKAR REDDY

Prerequisites

Make sure you have Node.js and npm installed on your computer before proceeding with the installation.
Contributing

Feel free to explore the code and modify it to build your decentralized applications. If you find any issues or have improvements to suggest, please submit a pull request.

License

This project is licensed under the MIT License.
