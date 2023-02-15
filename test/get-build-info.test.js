import { it } from "vitest";
import getBuildInfo from "../lib/get-build-info.js";

it("gets the build info", (ctx) => {
  const buildInfo = getBuildInfo({ cwd: "./test/test-app" });

  ctx.expect(buildInfo.date.length).to.be.greaterThan(0);
  ctx.expect(buildInfo.version.length).to.equal(13);
  ctx.expect(buildInfo.version.startsWith('1.0.0+')).to.be.true;
});
