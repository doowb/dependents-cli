#!/usr/bin/env node

var argv = require('yargs-parser')(process.argv.slice(2), {
  boolean: ['downloads'],
  default: {
    downloads: true,
    format: 'table'
  },
  alias: {
    downloads: 'd',
    format: 'f'
  }
});
var Table = require('cli-table');
var cli = require('../');

var options = argv;
if (argv._.length) {
  options.repo = argv._[0];
}

cli(options, function(err, dependents) {
  if (err) {
    console.error('error getting dependents for [' + options.repo + ']', err);
    console.error(err.message);
    process.exit(1);
    return;
  }

  var format = (typeof options.format === 'string') ? options.format.toLowerCase() : options.format;
  var formatFn = formatters[format] || formatters.noop;
  console.log(formatFn(dependents));
  process.exit(0);
});

var formatters = {
  table: function(dependents) {
    return createTable(dependents);
  },
  json: function(dependents) {
    return JSON.stringify(dependents, null, 2);
  },
  noop: function(dependents) {
    return dependents;
  }
};

function createTable(dependents) {
  var head = ['module', `${options.repo}\nversion`];
  var colWidths = [40, Math.max(15, options.repo.length + 2)];
  var colAligns = ['left', 'left'];
  if (options.downloads) {
    head.push('downloads in the\nlast 30 days', 'total downloads');
    colWidths.push(20, 20);
    colAligns.push('right', 'right');
  }

  var table = new Table({
    style: {compact: true},
    head: head,
    colWidths: colWidths,
    colAligns: colAligns
  });

  var total = 0;
  var last30 = 0;
  var versions = [];
  for (var i = 0; i < dependents.length; i++) {
    var repo = dependents[i];
    var version = repo[`${options.repo}-version`];
    if (versions.indexOf(version) === -1) {
      versions.push(version);
    }

    var row = [repo.name, version];
    if (options.downloads) {
      total += repo.downloads.total;
      last30 += repo.downloads.last30;
      row.push(repo.downloads.last30.toLocaleString(), repo.downloads.total.toLocaleString());
    }
    table.push(row);
  }

  // empty row to separate summary
  table.push([]);

  // summary row
  var summary = [`${dependents.length} dependents`, `${versions.length} versions`];
  if (options.downloads) {
    summary.push(last30.toLocaleString(), total.toLocaleString());
  }
  table.push(summary);

  return table.toString();
}
