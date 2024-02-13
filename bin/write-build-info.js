#!/usr/bin/env node

// eslint-disable-next-line n/no-missing-require
const { default: writeBuildInfo } = require("../dist/write-build-info");

writeBuildInfo();
