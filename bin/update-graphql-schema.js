#!/usr/bin/env node

// eslint-disable-next-line n/no-missing-require
const {
  default: updateGraphqlSchema,
} = require("../dist/update-graphql-schema");

updateGraphqlSchema();
