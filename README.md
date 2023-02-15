# @bagaar/build-helpers

[![CI](https://github.com/bagaar/build-helpers/workflows/CI/badge.svg)](https://github.com/bagaar/build-helpers/actions?query=workflow%3ACI)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Build helpers for Bagaar apps.

## Usage

1. Include the build info in the app:

```js
// config/environment.js

const { getBuildInfo } = require("@bagaar/build-helpers");

module.exports = function () {
  const ENV = {
    buildInfo: getBuildInfo(),
  };

  return ENV;
};
```

2. Pass along the build version to Bugsnag:

```js
// app/routes/application.js

import Bugsnag from "@bugsnag/js";
import Route from "@ember/routing/route";
import config from "ember-project-boilerplate/config/environment";

export default class ApplicationRoute extends Route {
  beforeModel() {
    this.setupBugsnag();
  }

  setupBugsnag() {
    Bugsnag.start({
      appVersion: config.buildInfo.version,
    });
  }
}
```

3. Build the app:

```bash
pnpm build
```

4. Upload the source maps to Bugsnag:

```bash
pnpm upload-source-maps
```

5. Clean the "dist" folder:

```bash
pnpm clean-dist-folder
```

6. Finally, upload the "dist" folder to the server.
