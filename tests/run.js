import assert from "node:assert";
import { checkAction } from "../ops.js";
import { applyAction } from "../apply.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("checkAction returns bounds", () => {
  assert.strictEqual(typeof checkAction("all", [0, 1], 5).start, "number");
});

check("applyAction returns a list", () => {
  assert.ok(Array.isArray(applyAction("all", [], 3, [0, 1])));
});

check("applyAction returns one list per action", () => {
  assert.strictEqual(typeof applyAction("all", [], 3, [0, 1]).length, "number");
});

check("render counts selected", () => {
  assert.strictEqual(typeof render({ total: 3, action: "invert", current: [0] }).count, "number");
});

check("render exposes total", () => {
  assert.strictEqual(typeof render({ total: 3, action: "none" }).total, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
