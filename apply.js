// apply.js：执行动作，结果按下标升序、无重复、不越界
import { checkAction } from "./ops.js";

export function applyAction(action, current, total, range) {
  const checked = checkAction(action, range, total);
  if (action === "all") {
    const selected = new Array(total);
    for (let index = 0; index < total; index += 1) selected[index] = index;
    return selected;
  }
  if (action === "none") return [];
  if (action === "invert") {
    const before = new Set(current);
    const selected = [];
    for (let index = 0; index < total; index += 1) {
      if (!before.has(index)) selected.push(index);
    }
    return selected;
  }
  const selected = [];
  for (let index = checked.start; index <= checked.end; index += 1) selected.push(index);
  return selected;
}
