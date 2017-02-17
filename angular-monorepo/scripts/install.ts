import {exec, exit} from 'shelljs';
import {doAll} from './common';

const install = (modulePath, moduleDistPath) => {
    if (exec(`yarn`).code !== 0) {
        exit(1);
    }
};

//execute install for each package
doAll(install);