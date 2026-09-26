// app.js：渲染结果
import { checkAction } from "./ops.js";
import { applyAction } from "./apply.js";

export function render(spec) {
  const total = spec.total || 0;
  const action = spec.action || "all";
  const current = spec.current || [];
  const range = spec.range || [0, 0];
  const checked = checkAction(action, range, total);
  const selected = applyAction(action, current, total, range);
  return { selected: selected, count: selected.length, action: action,
           start: checked.start, end: checked.end, total: total };
}
