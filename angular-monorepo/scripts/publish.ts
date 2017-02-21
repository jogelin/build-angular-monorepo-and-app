import {exec, exit} from 'shelljs';
import {log, doAll, cfg} from './common';

const publish = (modulePath, moduleDistPath) => {
    log.info('PUBLISH', 'publish');

    if (exec(`npm publish`).code !== 0) {
        exit(1);
    }
};

doAll(publish, cfg.DIST_PATH);