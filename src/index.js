import * as os from "os";
import chalk from 'chalk';
import assert from 'assert';

const DEFAULT_TX_CONFIRMATION_BLOCK = 5;

class mine_when_need {

    constructor(ethIPC, web3, txConfirmation, mineCores) {
        this.ethIPC = ethIPC;
        this.web3 = web3;
        this.mineCores = mineCores || os.cpus().length;
        this.txConfirmation = txConfirmation || DEFAULT_TX_CONFIRMATION_BLOCK;

        this.statusUpdate(this);
        web3.eth.filter('latest', ()=>{this.statusUpdate(this,...arguments)});
        web3.eth.filter('pending', ()=>{this.statusUpdate(this, ...arguments)});
    }
    statusUpdate(thisCls) {

        const blockNumber = thisCls.web3.eth.blockNumber;
        const txCounts = ['pending'].concat([...Array(DEFAULT_TX_CONFIRMATION_BLOCK).keys()]
            .map((x) => blockNumber - x))
            .map(thisCls.web3.eth.getBlockTransactionCount);

        if (!txCounts.every((x) => x == 0)) {
            thisCls.startMining(thisCls);
        }
        else {
            thisCls.stopMining(thisCls);
        }
    }


    startMining(thisCls) {
        if (!thisCls.web3.eth.mining) {
            thisCls.ethIPC.minerStart(this.mineCores);
            console.log(chalk.green(`Start mining at ${new Date()}`));
        }
    }

    stopMining(thisCls) {
        if (thisCls.web3.eth.mining) {
            thisCls.ethIPC.minerStop();
            console.log(chalk.green(`Stop mining at ${new Date()}`));
        }
    }
}

export {mine_when_need};