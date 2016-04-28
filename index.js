#!/usr/bin/env node

var program = require("commander");
var _ = require("lodash");

function getArchiveName(name) {
    var now = new Date();
    return "\"" + now.toDateString() + ":" + name + "\"";
}

program
  .arguments("<config>")
  .action(function(config) {
    var config = require(config);
    var command = "tarsnap -c";

    if (config.verbose) {
      command += "v";
    }
    command += " ";

    if (_.has(config, "exclude") && _.isArray(config.exclude)) {
      _.forEach(config.exclude, function(exclude) {
        command += "--exclude " + exclude + " ";
      });
    }
    command += "-f " + getArchiveName(config.name) + " ";

    if (_.has(config, "include") && _.isArray(config.include)) {
      _.forEach(config.include, function(include) {
        command += include + " ";
      });
    }
    console.log("backing up to: ", config.name);
    console.log(command);
  })
  .parse(process.argv);

