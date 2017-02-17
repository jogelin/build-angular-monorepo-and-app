# Buid Angular Monorepo and App (@bamaa)

The goal of this repo is to define a good way to build :
* A monorepo containing a list of Javascript/Angular packages
* An Angular app having dependencies to these packages

![dependencies](https://raw.githubusercontent.com/jogelin/build-angular-monorepo-and-app/master/doc/dependencies.jpg)

##### Two main scenarios (for the moment) :
1. **Build both the monorepo and the app locally for development at two different place....BUT....It should be easy to serve the app and modify the libraries of the monorepo without publishing, installing, etc.. JUST CODING !!!**

2. **Build both the monorepo and the app for production using a CI tool**

## Getting started
**Remark** : yarn is needed :
```
npm install yarn -g
```

### Work locally
#### angular-monorepo
1. Install :
```
$ yarn
```
2. Build each **package** :
```
$ yarn run build
```
This build script will do (NOT FINISHED : missing links between libs, etc...,) :
```
$ rimraf dist/
```
```
$ rimraf build/
```
```
$ yarn install
```
```
$ ngc
```
```
$ rollup -c rollup.config.js ${moduleDistPath}/index.js > ${moduleDistPath}/index.umd.js
```
```
$ cp package.json ${moduleDistPath}/package.json
```
3. Link each package
```
$ cp package.json ${moduleDistPath}/package.json
```

#### angular-app
1. Link to libs
```
$ yarn run libs:link
```
2. Run the app
```
$ npm start (would like to use yarn but it check the lib on the registry even if they are links...)
```

### Monorepo :
The goal is to be able to build all packages in a single command : npm run build

## Brainstorm
### Links
#### Link between dependencies inside a monorepo
During development
During the build
#### Link between app to the monorepo dependencies
During development

#### Type of links :
  * npm link : links through the npm cache :
    * +see the real folder
    * +can modify files directly
    * ---can erase file of the other project
    * ---always need to link in lib and app and unlink in lib and app
  * shortcut : system link :
    * +light
    * -doesn't rebuild automatically if app serve
  * copy file in the node_modules
    * +independent
    * -need to watch other project file and copy manually

### Lerna
Lerna is the first tool when we think "monorepo". But after some tests (a lot..), it is doing too much things...I prefer a simple way and add option/plugins to do more.

### Yerna
[Yerna](https://github.com/palantir/yerna) is a lerna like using yarn and it support almost what we want to do but they are bugs and it's unix oriented.

Today, even there are linked, yarn doesn't support libraries that are not found on the registry. A hack is to remove dependencies from the package.json, do the yarn install and recreate the package.json...more info the the Yarn README file

### TODO
#### Steps :

###### 1. Make it work with lib-1 : OK with npm link on the monorepo/dist/lib-1
###### 2. Make it work with lib-2 : NOT OK with npm link on the monorepo/dist/lib-1 !! Should we need to copy the node_modules folder during the build of create a syslink ?
###### 3. Make it work with lib-3
###### 4. Make it work with lib-4
###### 5. Make it work with lib-5

#### Improvments/Constraints :
* For now, list and the order of libs are specified in the scripts/common.js. I should be better to scan packages dynamically and order the build based on the internal dependencies
* AOT compatible
* build and serve locally with links (npm or system)
* build in CI env
* test
* manage inter dependencies
* use common dependency version for all packages (like angular) specified by the parent
* same version fo all lib


#### Useful articles about mono repo :

[New wave modularity with Lerna, monorepos, and npm organizations](http://www.macwright.org/2016/07/08/lerna-npm-organizations-new-wave-modularity.html)
: *Article explaining the problematic and how npm organization works*

[Thoughts about package modularization](https://medium.com/@jonathanewerner/thoughts-about-package-modularization-d9631f7a41f1#.y0csdtrwv)
: *Article explaining the problematic of multiple packages and the lerna library*

[Setting Up a Javascript monorepo](http://staltz.com/setting-up-a-javascript-monorepo.html)
: *Description of 2 tools, lerna and builder, but introduce a simpler bash script*

[Monorepo scaling project](https://kikobeats.com/monorepo/)
: *Description of multiple tools and introduce his own tool : bumped*

[Babel](https://github.com/babel/babel)
: *Example of monorepo usage and explanation*