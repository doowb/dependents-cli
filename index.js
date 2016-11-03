'use strict';

var co = require('co');
var dependents = require('module-dependents');

module.exports = function(options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }
  options = options || {};

  var name = options.repo;
  if (!name) {
    var msg = [
      'Usage:',
      '',
      '  $ dependents <repo-name> [options]',
      ''
    ].join('\n');

    cb(new Error(msg));
    return;
  }

  options.transform = function(pkgName, pkg, npm) {
      return co(function*() {
        var res ={name: pkgName};
        res[`${name}-version`] = pkg.dependencies[name];
        if (options.downloads) {
          res.downloads = {};
          res.downloads.total = yield npm.repo(pkgName).total();
          res.downloads.last30 = yield npm.repo(pkgName).last(30);
        }
        return res;
      });
  };

  co(function*() {
    return yield dependents(name, options);
  })
  .then(function(results) {
    if (options.downloads) {
      results.sort(function(a, b) {
        if (a.downloads.last30 > b.downloads.last30) return -1;
        if (a.downloads.last30 < b.downloads.last30) return 1;
        return 0;
      });
    }
    return cb(null, results);
  }, function(err) {
    cb(err);
  });
};
