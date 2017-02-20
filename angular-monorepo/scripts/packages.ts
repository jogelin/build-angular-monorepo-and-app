/**
 * Created by JGE on 20/02/2017.
 */
import {glob} from 'glob';

export interface Package {
    name: string,
    path: string,
    bin: any,
    dependencies: any[],
    localDependents: any[],
    localDependencies
}

export const packagesPath = (): string => {
    //TODO : get path from config in package.json
    return './packages';
};

// keep list of packages in cache
let _packages: Package[] = [];
export const packages = (path: string = packagesPath()): Package[] => {
    //if list of packages already
    if(_packages.length > 0) {
        return _packages;
    }

    const packagesByName = glob.sync(`${path}/*/package.json`)
        .map(filename => {
            const packageJson = JSON.parse(fs.readFileSync(filename));
            return {
                name: packageJson.name,
                path: path.resolve(path.dirname(filename)),
                bin: packageJson.bin || {},
                scripts: packageJson.scripts || {},
                allDependencies: _.chain(['dependencies', 'devDependencies'])
                    .map(key => packageJson[key])
                    .compact()
                    .map(dependencies => _.keys(dependencies))
                    .flatten()
                    .uniq()
                    .value(),
                localDependents: []
            };
        })
        .keyBy('name')
        .value();

    _.forEach(packagesByName, (pkg, name) => {
        pkg.localDependencies = pkg.allDependencies.filter(dependency => !!packagesByName[dependency]);
        delete pkg.allDependencies;
    });

    _.forEach(packagesByName, (pkg, name) => {
        pkg.localDependencies.forEach(dependencyName => {
            packagesByName[dependencyName].localDependents.push(name);
        })
    });

    _.forEach(packagesByName, pkg => {
        pkg.localDependencies = _.sortBy(pkg.localDependencies);
        pkg.localDependents = _.sortBy(pkg.localDependents);
    });

    return packagesByName;
}