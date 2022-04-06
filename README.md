# Solidity Escrow Smart Contract
## A smart contract that only releases the funds involved to the freelancer once the contract's terms are met. 



## Contract

- Escrow.sol


```sh
npx hardhat run scripts/deploy.js
```
## Testing

Basic test using Chai and Hardhat

```sh
npx hardhat test
```
## Deployment
In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Rinkeby node URL (eg from Infura), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:


```shell
npx hardhat run --network rinkeby scripts/deploy.js
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```
