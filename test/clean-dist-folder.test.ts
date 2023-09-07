import fsExtra from "fs-extra";
import recursiveCopy from "recursive-copy";
import { it } from "vitest";
import cleanDistFolder from "../src/clean-dist-folder";

it('cleans the "dist" folder', async (ctx) => {
  const cwd = "./test/test-app-copy";
  const file = (path) => `${cwd}/dist/${path}`;

  await recursiveCopy("./test/test-app", cwd, { dot: true });

  ctx.expect(fsExtra.existsSync(file("assets/foo/bar/baz.less"))).to.be.true;
  ctx.expect(fsExtra.existsSync(file("assets/foo/bar/baz.scss"))).to.be.true;
  ctx.expect(fsExtra.existsSync(file("assets/foo/.gitkeep"))).to.be.true;
  ctx.expect(fsExtra.existsSync(file("assets/chunk.hash.css.map"))).to.be.true;
  ctx.expect(fsExtra.existsSync(file("assets/chunk.hash.js.map"))).to.be.true;
  ctx.expect(fsExtra.existsSync(file("assets/foo.less"))).to.be.true;
  ctx.expect(fsExtra.existsSync(file("assets/foo.scss"))).to.be.true;
  ctx.expect(fsExtra.existsSync(file("assets/test-app.css"))).to.be.true;

  cleanDistFolder({ cwd });

  ctx.expect(fsExtra.existsSync(file("assets/foo/bar/baz.less"))).to.be.false;
  ctx.expect(fsExtra.existsSync(file("assets/foo/bar/baz.scss"))).to.be.false;
  ctx.expect(fsExtra.existsSync(file("assets/foo/.gitkeep"))).to.be.false;
  ctx.expect(fsExtra.existsSync(file("assets/chunk.hash.css.map"))).to.be.false;
  ctx.expect(fsExtra.existsSync(file("assets/chunk.hash.js.map"))).to.be.false;
  ctx.expect(fsExtra.existsSync(file("assets/foo.less"))).to.be.false;
  ctx.expect(fsExtra.existsSync(file("assets/foo.scss"))).to.be.false;
  ctx.expect(fsExtra.existsSync(file("assets/test-app.css"))).to.be.false;

  ctx.expect(fsExtra.existsSync(file("foo.txt"))).to.be.true;
  ctx.expect(fsExtra.existsSync(file("assets/chunk.hash.css"))).to.be.true;
  ctx.expect(fsExtra.existsSync(file("assets/chunk.hash.js"))).to.be.true;
  ctx.expect(fsExtra.existsSync(file("assets/test-app.hash.css"))).to.be.true;

  fsExtra.removeSync(cwd);
});
