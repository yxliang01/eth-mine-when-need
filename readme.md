[![Build Status](https://travis-ci.org/yxliang01/eth-mine-when-need.svg?branch=master)](https://travis-ci.org/yxliang01/eth-mine-when-need)
[![Dependency Status](https://david-dm.org/yxliang01/eth-mine-when-need.svg)]()
[![Code Climate](https://codeclimate.com/github/yxliang01/eth-mine-when-need/badges/gpa.svg)](https://codeclimate.com/github/yxliang01/eth-mine-when-need)
[![npm version](https://badge.fury.io/js/eth-mine-when-need.svg)](https://badge.fury.io/js/eth-mine-when-need)

#eth-mine-when-need

*Automatically mine Ether only when it's needed.*

This will start your Ethereum miner when there are transactions pending or waiting for confirmation. This would be super useful when you are using private Ethereum Blockchain to do the development - you don't have to keep mining yourself for the transactions to be effective.

Installation
======

```bash
npm install -g eth-mine-when-need
```

To Use
=====
You can either type `eth-mine-when-need` or `emwn` into the console to start it. If you didn't change the default Ethereum IPC path, it will do the job automatically. If you did, you have to specify it as an argument.

Command Usage

```bash
eth-mine-when-need [number of blocks for confirmation] [number of mining threads] [Eth IPC Path]
```

