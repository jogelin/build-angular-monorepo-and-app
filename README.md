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
2. Bootstrap **package** :
```
$ yarn bootstrap
```
3. Build **package** :
```
$ yarn build
```
4. Post Build copy package.json in dist

#### angular-app
1. Link to libs
```
$ yarn run link:internal
```
2. Run the app
```
$ npm start (would like to use yarn but it check the lib on the registry even if they are links...)
```

### Monorepo :
The goal is to be able to build all packages in a single command : npm run build

## Tools

### OAO
[OAO](https://github.com/guigrpa/oao) is a lerna like using yarn and it support almost what we want to do. A packaging phase is missing

Today, even there are linked, yarn doesn't support libraries that are not found on the registry. A hack is to remove dependencies from the package.json, do the yarn install and recreate the package.json...

## TODO/Constraints :
* AOT compatible
* links between app and monorepo
* avoiding scripts with hardcoded libs names
* having one tsconfig per lib...but with ngc on lib-3, they are strange duplications
* be able to publish
* remove dependency to ng2-translate in the angular-app

## Useful articles about mono repo :

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
