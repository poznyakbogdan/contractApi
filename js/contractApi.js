"use strict";

class ContractApi {
    constructor(provider, period, contractOptions) {
        this.contract = {};
        this.provider = provider;
        this.contract.abi = contractOptions.abi;
        this.contract.address = contractOptions.address;
        this.period = period;
    }

    start(callback) {
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            let web3 = new Web3(new Web3.providers.HttpProvider(this.provider));

            this.contractInstance = new web3.eth.Contract(this.contract.abi, this.contract.address);

            this.pinger(callback);
        }
    }

    pinger(callback) {
        let timer = setInterval(() => {
            this.contractInstance.methods.balanceOf("0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0").call(callback);
        }, this.period);
        return timer;
    }
}
