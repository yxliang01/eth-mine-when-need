#!/usr/bin/env node
'use strict';

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _index = require('./index.js');

var lib = _interopRequireWildcard(_index);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _ethereumGoIpc = require('ethereum-go-ipc');

var eth = _interopRequireWildcard(_ethereumGoIpc);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!(process.argv.length - 2 >= 1)) {
    console.log('Usage: <Web3 RPC Address> [number of blocks for confirmation] [number of mining thread]');
    process.exit(1);
}

var web3RPC = process.argv[2];
var txConfirmation = typeof process.argv[3] !== 'undefined' ? parseInt(process.argv[3]) : undefined;
var mineCores = typeof process.argv[4] !== 'undefined' ? parseInt(process.argv[4]) : undefined;

var web3 = new _web2.default(new _web2.default.providers.HttpProvider(web3RPC));
eth.setGethSocket(require('./getipcPath.js')());
new lib.mine_when_need(eth, web3, txConfirmation, mineCores);

console.log(_chalk2.default.green('Start succeeded. Press Control+C to stop'));
//# sourceMappingURL=bin.js.map