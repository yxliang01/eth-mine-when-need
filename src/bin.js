#!/usr/bin/env node

import Web3 from 'web3';
import * as lib from './index.js'
import chalk from 'chalk';
import * as eth from 'ethereum-go-ipc';

if (!(process.argv.length - 2 >= 1)) {
    console.log('Usage: <Web3 RPC Address> [number of blocks for confirmation] [number of mining thread]');
    process.exit(1);
}

const web3RPC = process.argv[2];
const txConfirmation = typeof process.argv[3] !== 'undefined' ? parseInt(process.argv[3]) : undefined;
const mineCores = typeof process.argv[4] !== 'undefined' ? parseInt(process.argv[4]) : undefined;

const web3 = new Web3(new Web3.providers.HttpProvider(web3RPC));
eth.setGethSocket(require('./getipcPath.js')());
new lib.mine_when_need(eth, web3, txConfirmation, mineCores);

console.log(chalk.green('Start succeeded. Press Control+C to stop'));