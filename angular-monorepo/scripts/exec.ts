import {exec as shellExec, echo, exit} from 'shelljs';
import {doAll, log} from './common';
import * as process from 'process';

const exec = (modulePath: string, moduleDistPath: string) => {
    let [, , ...args]:string[] = process.argv;
    let command: string = args.reduce((acc: string, one: string) => acc.concat(`${one} `), '');

    if (command === '') {
        log.error('EXEC','Empty command');
        exit(1);
    }

    log.info('EXEC',command);
    if (shellExec(command).code !== 0) {
        exit(1);
    }
};

doAll(exec);