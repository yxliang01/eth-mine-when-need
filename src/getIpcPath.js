/**
Gets the right IPC path

@module getIpcPath
*/

import fs from "fs";
import p from 'path';

export default function() {
    let path = process.env.HOME;

    const macDefaultDir = "/Library/Ethereum/geth.ipc";
    const linuxDefaultDir = "/.ethereum/geth.ipc";

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
