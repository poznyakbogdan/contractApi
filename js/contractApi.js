"use strict";

let web3;

class ContractApi {
    constructor(provider, period, contractOptions) {
        this.contract = {};
        this.provider = provider || "https://mainnet.infura.io/gIWjuD8y664Biko4Quf8";
        this.contract.abi = contractOptions.abi;
        this.contract.address = contractOptions.address;
        this.period = period || 10000;
    }

    start(callback) {
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider(this.provider));
        }
        this.contractInstance = new web3.eth.Contract(this.contract.abi, this.contract.address);
        this.pinger(callback);
    }

    pinger(callback) {
        let timer = setInterval(() => {
            web3.eth.getBalance("0x095bd25c6bb8a705315349fe98ec394c37f82e2d", (err, balance) => {
                this.contractInstance.methods.hasEnded().call((err, res) => {
                    if (err) {
                        callback(err, null);
                    }
                    callback(null, {
                        hasEnded: res,
                        balance: balance
                    })
                });
            })
        }, this.period);
        return timer;
    }
}
