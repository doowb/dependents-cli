#!/usr/bin/env node

var argv = require('yargs-parser')(process.argv.slice(2));
var Table = require('cli-table');
var cli = require('../');

var options = argv;
if (argv._.length) {
  options.repo = argv._[0];
}

if (options.format === true) {
  options.format = 'table';
}

cli(options, function(err, dependents) {
  if (err) {
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
    head: head,
    colWidths: colWidths,
    colAligns: colAligns
  });

  for (var i = 0; i < dependents.length; i++) {
    var repo = dependents[i];
    var row = [repo.name, repo[`${options.repo}-version`]];
    if (options.downloads) {
      row.push(repo.downloads.last30, repo.downloads.total);
    }
    table.push(row);
  }

  return table.toString();
}
