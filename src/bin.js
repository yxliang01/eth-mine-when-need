#!/usr/bin/env node

import * as lib from './index.js'
import chalk from 'chalk';
import * as eth from 'ethereum-go-ipc';
import defined from 'defined';
import getDefaultIPCPath from './getIpcPath.js';

if (process.argv.slice(2).includes('--help')) {
    console.log('Usage: [number of blocks for confirmation] [number of mining thread] [Eth IPC Path]');
    console.log('If you leave Eth IPC Path blank, it will use the default IPC address for your system')
    process.exit(1);
}

const txConfirmation = typeof process.argv[3] !== 'undefined' ? parseInt(process.argv[3]) : undefined;
const mineCores = typeof process.argv[4] !== 'undefined' ? parseInt(process.argv[4]) : undefined;
const ipcAddress = defined(process.argv[5], getDefaultIPCPath());

eth.setGethSocket(ipcAddress);
const web3 = eth.web3Provider();
new lib.mine_when_need(eth, web3, txConfirmation, mineCores);

console.log(chalk.green('Start succeeded. Press Control+C to stop'));