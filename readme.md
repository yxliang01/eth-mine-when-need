[![Build Status](https://travis-ci.org/yxliang01/eth-mine-when-need.svg?branch=master)](https://travis-ci.org/yxliang01/eth-mine-when-need)
[![Dependency Status](https://david-dm.org/yxliang01/eth-mine-when-need.svg)]()
[![Code Climate](https://codeclimate.com/github/yxliang01/eth-mine-when-need/badges/gpa.svg)](https://codeclimate.com/github/yxliang01/eth-mine-when-need)
[![NSP Status](https://nodesecurity.io/orgs/yxliang01/projects/53b5a956-e853-407a-a399-8457af89ccb1/badge)](https://nodesecurity.io/orgs/yxliang01/projects/53b5a956-e853-407a-a399-8457af89ccb1)
[![npm version](https://badge.fury.io/js/eth-mine-when-need.svg)](https://badge.fury.io/js/eth-mine-when-need)


This will start your Ethereum miner when there are transactions pending or waiting for confirmation. This would be super useful when you are using private Ethereum Blockchain to do the development - you don't have to keep mining yourself for the transactions to be effective.

Installation
======

```bash
npm install -g eth-mine-when-need
```

To Use
=====
You can either type `eth-mine-when-need` or `emwn` into the console to start it. If you didn't change the default Ethereum IPC path, it will do the job automatically. If you did, execute with `emwn IPC_PATH` where `IPC_PATH` is the path to your Ethereum IPC path.