import * as os from "os";
import chalk from 'chalk';
import promisify from 'es6-promisify';

const DEFAULT_TX_CONFIRMATION_BLOCK = 5;

class mine_when_need {

    async statusUpdate(thisCls) {

        const blockNumber = await promisify(thisCls.web3.eth.getBlockNumber)();

        //TODO: Use .map to do the job

        let txCounts = await ['pending'].concat([...Array(DEFAULT_TX_CONFIRMATION_BLOCK).keys()]
            .map((x) => blockNumber - x));

        for(let i = 0; i < txCounts.length; i++) {
            txCounts[i] = await promisify(thisCls.web3.eth.getBlockTransactionCount)(txCounts[i]);
        }

        if (!txCounts.every((x) => x === 0)) {
            thisCls.startMining(thisCls);
        }
        else {
            thisCls.stopMining(thisCls);
        }
    }

    constructor(ethIPC, web3, txConfirmation, mineCores) {
        this.ethIPC = ethIPC;
        this.web3 = web3;
        this.mineCores = mineCores || os.cpus().length;
        this.txConfirmation = txConfirmation || DEFAULT_TX_CONFIRMATION_BLOCK;

        this.statusUpdate(this);
        web3.eth.filter('latest', ()=>{this.statusUpdate(this,...arguments)});
        web3.eth.filter('pending',()=>{this.statusUpdate(this, ...arguments)});
    }


    async startMining(thisCls) {

        if (! await promisify(thisCls.web3.eth.getMining)()) {
            thisCls.ethIPC.minerStart(this.mineCores);
            console.log(chalk.green(`Start mining at ${new Date()}`));
        }
    }

    async stopMining(thisCls) {

        if (await promisify(thisCls.web3.eth.getMining)()) {
            thisCls.ethIPC.minerStop();
            console.log(chalk.green(`Stop mining at ${new Date()}`));
        }
    }
}

export {mine_when_need};