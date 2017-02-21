import {exec, cp, exit} from 'shelljs';
import {readFileSync, writeFileSync} from 'fs';
import {log, doAll, cfg} from './common';

const copyPackage = (modulePath, moduleDistPath) => {
    log.info('BUNDLE PACKAGE FILE', 'copy to dist');

    cp(`package.json`, `./../../${moduleDistPath}/package.json`);

    //cleanup
    log.info('BUNDLE PACKAGE FILE', 'cleanup');
    const packageFile = `./../../${moduleDistPath}/package.json`;
    const packageJson = JSON.parse(readFileSync(packageFile).toString());
    delete packageJson.devDependencies;
    delete packageJson.scripts;
    writeFileSync(packageFile, JSON.stringify(packageJson, null, 2));
};

doAll(copyPackage, cfg.MODULES_PATH);