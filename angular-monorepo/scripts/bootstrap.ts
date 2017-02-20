import {exec, exit} from 'shelljs';
import {doAll} from './common';

const bootstrap = (modulePath, moduleDistPath) => {
    link(modulePath, moduleDistPath);
    install(modulePath, moduleDistPath);
};

const link = (modulePath, moduleDistPath) => {
    if (exec(`npm link`).code !== 0) {
        exit(1);
    }
};

const install = (modulePath, moduleDistPath) => {
    if (exec(`npm install`).code !== 0) {
        exit(1);
    }
};

//execute install for each package
doAll(bootstrap);