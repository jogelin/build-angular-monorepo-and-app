import {exec, cp, exit} from 'shelljs';
import {readFileSync, writeFileSync} from 'fs';
import {doAll, log} from './common';

const build = (modulePath, moduleDistPath) => {
    clean(moduleDistPath);
    transpile(moduleDistPath);
    bundle(moduleDistPath);
};

//TRANSPILE
const clean = (moduleDistPath) => {
    log.info('CLEAN', 'build');
    if (exec(`rimraf ./build`).code !== 0) {
        exit(1);
    }
};

//TRANSPILE
const transpile = (moduleDistPath) => {
    log.info('TRANSPILE', 'ngc');
    if (exec(`ngc`).code !== 0) {
        exit(1);
    }
};

//BUNDLE
const bundle = (moduleDistPath) => {
    bundleJS(moduleDistPath);
    bundlePackageFile(moduleDistPath);
};

const bundleJS = (moduleDistPath: string) => {
    log.info('BUNDLE JS', 'rollup');
    if(exec(`rollup -c rollup.config.js ${moduleDistPath}/index.js > ${moduleDistPath}/index.umd.js`).code !== 0) {
        exit(1);
    }
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

if (exec(`rimraf ./dist`).code !== 0) {
    exit(1);
}

doAll(build);