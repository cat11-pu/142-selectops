// apply.js：执行动作，结果按下标升序、不重复、不越界
import { checkAction } from "./ops.js";

export function applyAction(action, current, total, range) {
  const checked = checkAction(action, range, total);
  const selected = [];
  if (action === "all") {
    for (let index = 0; index < total; index += 1) selected.push(index);
  } else if (action === "none") {
    // 全不选：空选择
  } else if (action === "invert") {
    const picked = new Set(current);
    for (let index = 0; index < total; index += 1) {
      if (!picked.has(index)) selected.push(index);
    }
  } else if (action === "range") {
    for (let index = checked.start; index <= checked.end; index += 1) {
      selected.push(index);
    }
  }
  return selected;
}
