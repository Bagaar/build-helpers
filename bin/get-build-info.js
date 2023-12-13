#!/usr/bin/env node

// eslint-disable-next-line n/no-missing-require
const { default: getBuildInfo } = require("../dist/get-build-info");

const buildInfo = getBuildInfo();
const key = process.argv[2];

if (key) {
  console.log(buildInfo[key]);
} else {
  console.log(JSON.stringify(buildInfo));
}
