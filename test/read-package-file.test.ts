import { it } from "vitest";
import readPackageFile from "../src/read-package-file";

it("reads the package file", (ctx) => {
  const packageFile = readPackageFile({ cwd: "./test/test-app/app" });

  ctx.expect(packageFile.name).to.equal("test-app");
});
