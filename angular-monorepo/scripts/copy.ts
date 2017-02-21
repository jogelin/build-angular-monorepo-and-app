import {exec, cp, exit} from 'shelljs';
import {readFileSync, writeFileSync} from 'fs';
import {log, doAll} from './common';

const bundle = (modulePath, moduleDistPath) => {
    bundlePackageFile(moduleDistPath);
};

const bundlePackageFile = (moduleDistPath) => {
    log.info('BUNDLE PACKAGE FILE', 'copy to dist');

    cp(`package.json`, moduleDistPath);

    //cleanup
    log.info('BUNDLE PACKAGE FILE', 'cleanup');
    const packageFile = `./${moduleDistPath}/package.json`;
    const packageJson = JSON.parse(readFileSync(packageFile).toString());
    delete packageJson.devDependencies;
    delete packageJson.scripts;
    writeFileSync(packageFile, JSON.stringify(packageJson, null, 2));
};

doAll(bundle);