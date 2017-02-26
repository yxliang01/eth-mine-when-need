/**
Gets the right IPC path

@module getIpcPath
*/

var fs = require("fs");

module.exports = function() {
    var p = require('path');
    var path = process.env.HOME;

    var macDefaultDir = "/Library/Ethereum/geth.ipc";
    var linuxDefaultDir = "/.ethereum/geth.ipc";

    if(process.platform === 'darwin') {
        if(fs.existsSync(path + macDefaultDir))
          path += macDefaultDir;
        else
          if(fs.existsSync(path + linuxDefaultDir))
            path += linuxDefaultDir;
          else
            path += macDefaultDir;
    }

    if(process.platform === 'freebsd' ||
       process.platform === 'linux' ||
       process.platform === 'sunos')
        path += linuxDefaultDir;

    if(process.platform === 'win32')
        path = '\\\\.\\pipe\\geth.ipc';
    
    return path;
};
