import {readFileSync, writeFileSync} from "fs";

const extendsDependencies = (fromDependencies, toDependencies) => {
    console.info('PACKAGE FILE', 'extends dependencies');
    Object.keys(fromDependencies)
        .forEach(fromDepName => {
            const fromDepVersion = fromDependencies[fromDepName];
            Object.keys(toDependencies)
                .forEach(toDepName => {
                    const toDepVersion = toDependencies[toDepName];
                    if (fromDepName === toDepName) {
                        console.info(`Extends Dependency ${toDepName} : ${toDepVersion} -> ${fromDepVersion}`);
                        toDependencies[toDepName] = fromDepVersion;
                    }
                });
        });
};

const extendsPackage = () => {

    console.info('PACKAGE FILE', 'extends');

    const toPackageFile = `./package.json`;
    const toPackageJson = JSON.parse(readFileSync(toPackageFile).toString());

    const rootPackageFile = `./../../package.json`;
    const rootPackageJson = JSON.parse(readFileSync(rootPackageFile).toString());

    //extends properties
    console.info('PACKAGE FILE', 'extends properties');
    if (rootPackageJson.repository) toPackageJson.repository = rootPackageJson.repository;
    if (rootPackageJson.publishConfig) toPackageJson.publishConfig = rootPackageJson.publishConfig;

    //extends devDependencies of the root to peerDependencies
    extendsDependencies(rootPackageJson.devDependencies, toPackageJson.peerDependencies);

    //write new package.json
    writeFileSync(toPackageFile, JSON.stringify(toPackageJson, null, 4));
};

extendsPackage();
