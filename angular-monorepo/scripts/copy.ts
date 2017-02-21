import {exec, cp, exit} from 'shelljs';
import {readFileSync, writeFileSync} from 'fs';
import {log, doAll, cfg} from './common';

const copy = (modulePath, moduleDistPath) => {
    copyPackage(moduleDistPath);
    copyReadme(moduleDistPath);
};

const copyPackage = (moduleDistPath) => {
    log.info('COPY PACKAGE FILE', 'copy to dist');

    cp(`package.json`, `./../../${moduleDistPath}/package.json`);

    //cleanup
    log.info('BUNDLE PACKAGE FILE', 'cleanup');
    const packageFile = `./../../${moduleDistPath}/package.json`;
    const packageJson = JSON.parse(readFileSync(packageFile).toString());
    delete packageJson.devDependencies;
    delete packageJson.scripts;
    writeFileSync(packageFile, JSON.stringify(packageJson, null, 2));
};

const copyReadme = (moduleDistPath) => {
    log.info('COPY README FILE', 'copy to dist');

    cp(`README.md`, `./../../${moduleDistPath}/README.md`);

};

doAll(copy, cfg.MODULES_PATH);