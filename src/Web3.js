import abi from "./abi/abi.json" assert { type: "json" };
// Address: 0x0369AFd9a61Dc60b7924f32D6AB99A3EE8AfB607

const blockchain = new Promise((res, rej) => {
  // If MetaMask is not installed
  if (typeof window.ethereum === "undefined") {
    rej("MetaMask is not installed: You should install Metamask to use it");
  }

  // Web3 Instance
  let web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(
    abi,
    "0x3da6C1dE25BEEbB899aCF19EA5Df9d4BC8259cfe"
  );

  // Get my MetaMask address
  web3.eth.requestAccounts().then((accounts) => {
    console.log("-> My MetaMask account address: ", accounts[0]);
  });

  // Get the current supply of NFT Tokens
  web3.eth.requestAccounts().then((accounts) => {
    contract.methods
      .totalSupply()
      .call({ from: accounts[0] })
      .then((supply) => {
        console.log("-> Current supply of NFT Token is: ", supply);
      });
  });

  // Get the Maximum supply of NFT Tokens
  web3.eth.requestAccounts().then((accounts) => {
    contract.methods
      .maxSupply()
      .call({ from: accounts[0] })
      .then((maxsupply) => {
        console.log("-> Maximum supply of NFT Token is: ", maxsupply);
      });
  });

  // Get your building made in the Metaverse
  web3.eth.requestAccounts().then((accounts) => {
    contract.methods
      .getOwnerBuilding()
      .call({ from: accounts[0] })
      .then((buildings) => {
        console.log("-> Your buildings: ", buildings);
      });
  });

  // Get all building made in the Metaverse
  web3.eth.requestAccounts().then((accounts) => {
    contract.methods
      .totalSupply()
      .call({ from: accounts[0] })
      .then((supply) => {
        contract.methods
          .getBuildings()
          .call({ from: accounts[0] })
          .then((data) => {
            res({ supply: supply, building: data });
          });
      });
  });
});

export default blockchain;
