import {exec, cp, exit} from 'shelljs';
import {readFileSync, writeFileSync} from 'fs';
import {log, doAll, cfg} from './common';

const copy = (modulePath, moduleDistPath) => {
    copyAndExtendPackage(moduleDistPath);
    copyReadme(moduleDistPath);
};

const copyAndExtendPackage = (moduleDistPath) => {
    log.info('PACKAGE FILE', 'copy to dist');
    cp(`package.json`, `./../../${moduleDistPath}/package.json`);

    //cleanup
    const packageFile = `./../../${moduleDistPath}/package.json`;
    const packageJson = JSON.parse(readFileSync(packageFile).toString());

    const parentPackageFile = `./../../package.json`;
    const parentPackageJson = JSON.parse(readFileSync(parentPackageFile).toString());

    //cleanup lib package
    log.info('PACKAGE FILE', 'cleanup');
    delete packageJson.devDependencies;
    delete packageJson.scripts;

    //update info from parent
    log.info('PACKAGE FILE', 'update common properties');
    packageJson.version = parentPackageJson.version;
    if(parentPackageJson.repository) packageJson.repository = parentPackageJson.repository;
    if(parentPackageJson.publishConfig) packageJson.publishConfig = parentPackageJson.publishConfig;

    //resolve dependencies PLACEHOLDERS
    if(parentPackageJson.peerDependenciesPlaceholders) {
        log.info('PACKAGE FILE', 'replace peerDependencies placeholders');
        Object.keys(parentPackageJson.peerDependenciesPlaceholders)
            .forEach(placeHolderKey => {
                const placeHolderValue = parentPackageJson.peerDependenciesPlaceholders[placeHolderKey];
                Object.keys(packageJson.peerDependencies)
                    .forEach(peerDependencyKey => {
                        const peerDependencyValue = packageJson.peerDependencies[peerDependencyKey];
                        if(placeHolderKey === peerDependencyValue) {
                            log.info('PACKAGE FILE', `PeerDependency ${peerDependencyKey} : ${placeHolderValue}`);
                            packageJson.peerDependencies[peerDependencyKey] = placeHolderValue;
                        }
                        else if(peerDependencyValue === '0.0.0-VERSION_PLACEHOLDER') {
                            log.info('PACKAGE FILE', `PeerDependency ${peerDependencyKey} : ${parentPackageJson.version}`);
                            packageJson.peerDependencies[peerDependencyKey] = parentPackageJson.version;
                        }
                    });
            });
    }

    writeFileSync(packageFile, JSON.stringify(packageJson, null, 2));
};

const copyReadme = (moduleDistPath) => {
    log.info('COPY README FILE', 'copy to dist');

    cp(`README.md`, `./../../${moduleDistPath}/README.md`);

};

doAll(copy, cfg.MODULES_PATH);