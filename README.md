# dependents-cli [![NPM version](https://img.shields.io/npm/v/dependents-cli.svg?style=flat)](https://www.npmjs.com/package/dependents-cli) [![NPM downloads](https://img.shields.io/npm/dm/dependents-cli.svg?style=flat)](https://npmjs.org/package/dependents-cli)

> CLI for listing an npm module's dependent projects and their download stats.

You might also be interested in [module-dependents](https://github.com/doowb/module-dependents).

## Install

Install globally with [npm](https://www.npmjs.com/)

```sh
$ npm install --global dependents-cli
```

## Usage

Once installed globally, there will be a `dependents` command that can be run from the command line.

To see all the dependents for a module, specify the module name after the `dependents` command like this:

```sh
$ dependents base
```

This will output a JavaScript array containing each dependent as an object with `name` and dependency version properties. The dependency version property key will be the specified module name with `-version` after it. So `base-version` for the command specified above.

Example output from running `$ dependents base`:

![image](https://cloud.githubusercontent.com/assets/995160/17226161/01775114-54d6-11e6-9c41-313a2b6eaf74.png)

## Formatting

Use the `--format` option to format the results as a table (this is the default).

Run the following command to the dependents formatted as a table:

```sh
$ dependents base --format
```

![image](https://cloud.githubusercontent.com/assets/995160/17226161/01775114-54d6-11e6-9c41-313a2b6eaf74.png)

You can also include the download counts when using formatting:

```sh
$ dependents base --downloads --format
```

![image](https://cloud.githubusercontent.com/assets/995160/17226185/235b8b88-54d6-11e6-93f8-4b6e686e932d.png)

If you need to use the results as a JSON object, use the `--format` command with `json` after it:

```sh
$ dependents base --format json
```

```json
[
  { "name": "base-app", "base-version": "^0.11.1" },
  { "name": "base-reporter", "base-version": "^0.11.0" },
  { "name": "benchmarked", "base-version": "^0.8.1" },
  { "name": "boilerplate", "base-version": "^0.11.1" },
  { "name": "expand-files", "base-version": "^0.11.1" },
  { "name": "expand-target", "base-version": "^0.11.1" },
  { "name": "npm-api", "base-version": "^0.8.1" },
  { "name": "saffronapp", "base-version": "file:packages/base" },
  { "name": "scaffold", "base-version": "^0.11.1" },
  { "name": "templates", "base-version": "^0.11.1" },
  { "name": "verbiage", "base-version": "^0.8.1" },
  { "name": "vinyl-collection", "base-version": "^0.11.0" },
  { "name": "vinyl-item", "base-version": "^0.8.1" }
]
```

This can be output to a json file using the `bash` `>` character:

```sh
$ dependents base --format json > base-dependents.json
```

Use this with the `--downloads` option to be able to use the json data and do your own sorting and filtering if necessary.

```sh
$ dependents base --format json --downloads > base-dependents.json
```

### Downloads

To include the download counts of each of the dependents, use the `--downloads` option. This will add a `downloads` object to each dependent with the `total` and `last30` (last 30 days) download counts:

```sh
$ dependents base --downloads --format json
```

```json
[
  { "name": "templates", "base-version": "^0.11.1", "downloads": { "total": 124383, "last30": 14517 } },
  { "name": "benchmarked", "base-version": "^0.8.1", "downloads": { "total": 528830, "last30": 5301 } },
  { "name": "vinyl-item", "base-version": "^0.8.1", "downloads": { "total": 6045, "last30": 5019 } },
  { "name": "expand-target", "base-version": "^0.11.1", "downloads": { "total": 4341, "last30": 577 } },
  { "name": "scaffold", "base-version": "^0.11.1", "downloads": { "total": 4212, "last30": 532 } },
  { "name": "boilerplate", "base-version": "^0.11.1", "downloads": { "total": 8845, "last30": 478 } },
  { "name": "base-app", "base-version": "^0.11.1", "downloads": { "total": 1091, "last30": 471 } },
  { "name": "expand-files", "base-version": "^0.11.1", "downloads": { "total": 7235, "last30": 399 } },
  { "name": "npm-api", "base-version": "^0.8.1", "downloads": { "total": 629, "last30": 52 } },
  { "name": "base-reporter", "base-version": "^0.11.0", "downloads": { "total": 103, "last30": 16 } },
  { "name": "vinyl-collection", "base-version": "^0.11.0", "downloads": { "total": 101, "last30": 15 } },
  { "name": "verbiage", "base-version": "^0.8.1", "downloads": { "total": 77, "last30": 7 } },
  { "name": "saffronapp", "base-version": "file:packages/base", "downloads": { "total": 112, "last30": 5 } }
]
```

When using the `--downloads` option, the list is sorted by the `downloads.last30` property so the most used dependents will be found at the top.

## About

### Related projects

* [download-stats](https://www.npmjs.com/package/download-stats): Get and calculate npm download stats for npm modules. | [homepage](https://github.com/doowb/download-stats "Get and calculate npm download stats for npm modules.")
* [module-dependents](https://www.npmjs.com/package/module-dependents): Retrieve list of dependents for an npm module. | [homepage](https://github.com/doowb/module-dependents "Retrieve list of dependents for an npm module.")
* [npm-api-dependents](https://www.npmjs.com/package/npm-api-dependents): npm-api plugin for getting module dependents. | [homepage](https://github.com/doowb/npm-api-dependents "npm-api plugin for getting module dependents.")
* [npm-api](https://www.npmjs.com/package/npm-api): Base class for retrieving data from the npm registry. | [homepage](https://github.com/doowb/npm-api "Base class for retrieving data from the npm registry.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Building docs

_(This document was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme) (a [verb](https://github.com/verbose/verb) generator), please don't edit the readme directly. Any changes to the readme must be made in [.verb.md](.verb.md).)_

To generate the readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-generate-readme && verb
```

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Brian Woodward**

* [github/doowb](https://github.com/doowb)
* [twitter/doowb](http://twitter.com/doowb)

### License

Copyright © 2016, [Brian Woodward](https://github.com/doowb).
Released under the [MIT license](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.2.0, on November 03, 2016._