
import {readFileSync} from 'fs';
/** TYPES **/

export interface Config {
    packagesPath: string;
}

/** DEFAULT CONFIG **/

const _defaultConfig: Config = {
    packagesPath: './packages'
};

/** LOAD CONFIG **/

//cache of loaded config
let _config: Config = null;
export const config = (): Config => {

    //if config already loaded, return it
    if (_config != null) {
        return _config;
    }

    //load configs
    Object.keys(_defaultConfig)
        .forEach(key => _config[key] = getConfig(key));
};

//get config from package.json or default value
//cache of package.json loaded config
const getConfig = (key: string): string => {
    const packageJson = JSON.parse(readFileSync('./package.json').toString());
    const monorepoConfig = (packageJson.monorepoConfig) ? packageJson.monorepoConfig as Config : null;
    return (monorepoConfig[key]) ? monorepoConfig[key] : _defaultConfig[key];
};

console.log(config());