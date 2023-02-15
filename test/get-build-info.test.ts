import { it } from "vitest";
import { getBuildInfo } from "../src";

it("gets the build info", (ctx) => {
  const buildInfo = getBuildInfo({ cwd: "./test/test-app" });

  ctx.expect(buildInfo.date.length).to.be.greaterThan(0);
  ctx.expect(buildInfo.version).to.equal("1.0.0");
  ctx.expect(buildInfo.versionWithHash.length).to.equal(13);
  ctx.expect(buildInfo.versionWithHash.startsWith("1.0.0+")).to.be.true;
});
