'use strict'

const pkg = require('./package.json');

module.exports = {
  get name() { return pkg.name },
  package: pkg,
};
