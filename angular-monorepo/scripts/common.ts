import {exec, cp, cd, config} from 'shelljs';
const color = require('bash-color');
//config.verbose = true;

export const cfg = {
    //order is important depending to the dependencies
    MODULES: [
        'lib-1',
        'lib-2'
    ],
    MODULES_PATH: './packages',
    DIST_PATH: `../../dist`
};

export const doAll = (todo:Function) => {
    cfg.MODULES.forEach(moduleName => {

        const modulePath = `${cfg.MODULES_PATH}/${moduleName}`;
        const moduleDistPath = `${cfg.DIST_PATH}/${moduleName}`;

        cd(modulePath);

        console.log(`${color.green('======>')} ${color.purple(moduleName.toUpperCase())}`);

        todo(modulePath, moduleDistPath);

        console.log('--');
        cd('../../');
    });
};

export class log {

    static log(funcName: string, message: string) {
        console.log(`${funcName} : ${message}`);
    }

    static info(funcName: string, message: string) {
        log.log(`${color.green(funcName)}`, `${message}`);
    }

    static error(funcName: string, message: string) {
        log.log(`${color.red(funcName)}`, `${color.red(message)}`);
    }
}