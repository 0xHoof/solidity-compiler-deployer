## To get started, you will need a `.env` file in the root of your folder.


It should contain the following:


```
NODE_URL={your node url i.e infura url with api key}
MNEMONIC={your address menmonic}
```


### Move your contract (needs to be a single file) to the contracts folder and put the start point in the `contractName.js` file.


Then simply run `node compile.js` to compile followed by `node deploy.js` to deploy.


PROTIP: You may need to change the solc version based on the pragma version used in your contract.