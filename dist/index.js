'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mine_when_need = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _os = require('os');

var os = _interopRequireWildcard(_os);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_TX_CONFIRMATION_BLOCK = 5;

var mine_when_need = function () {
    function mine_when_need(ethIPC, web3, txConfirmation, mineCores) {
        var _this = this,
            _arguments = arguments;

        _classCallCheck(this, mine_when_need);

        this.ethIPC = ethIPC;
        this.web3 = web3;
        this.mineCores = mineCores || os.cpus().length;
        this.txConfirmation = txConfirmation || DEFAULT_TX_CONFIRMATION_BLOCK;

        this.statusUpdate(this);
        web3.eth.filter('latest', function () {
            _this.statusUpdate.apply(_this, [_this].concat(Array.prototype.slice.call(_arguments)));
        });
        web3.eth.filter('pending', function () {
            _this.statusUpdate.apply(_this, [_this].concat(Array.prototype.slice.call(_arguments)));
        });
    }

    _createClass(mine_when_need, [{
        key: 'statusUpdate',
        value: function statusUpdate(thisCls) {

            var blockNumber = thisCls.web3.eth.blockNumber;
            var txCounts = ['pending'].concat([].concat(_toConsumableArray(Array(DEFAULT_TX_CONFIRMATION_BLOCK).keys())).map(function (x) {
                return blockNumber - x;
            })).map(thisCls.web3.eth.getBlockTransactionCount);

            if (!txCounts.every(function (x) {
                return x == 0;
            })) {
                thisCls.startMining(thisCls);
            } else {
                thisCls.stopMining(thisCls);
            }
        }
    }, {
        key: 'startMining',
        value: function startMining(thisCls) {
            if (!thisCls.web3.eth.mining) {
                thisCls.ethIPC.minerStart(this.mineCores);
                console.log(_chalk2.default.green('Start mining at ' + new Date()));
            }
        }
    }, {
        key: 'stopMining',
        value: function stopMining(thisCls) {
            if (thisCls.web3.eth.mining) {
                thisCls.ethIPC.minerStop();
                console.log(_chalk2.default.green('Stop mining at ' + new Date()));
            }
        }
    }]);

    return mine_when_need;
}();

exports.mine_when_need = mine_when_need;
//# sourceMappingURL=index.js.map