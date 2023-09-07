#!/usr/bin/env node

// eslint-disable-next-line n/no-missing-require
const { default: cleanDistFolder } = require("../dist/clean-dist-folder");

cleanDistFolder();
