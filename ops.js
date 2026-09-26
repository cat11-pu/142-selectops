// ops.js：动作与区间校验
const ACTIONS = ["all", "none", "invert", "range"];

function badRange() {
  const error = new Error("E_BAD_RANGE");
  error.code = "E_BAD_RANGE";
  return error;
}

export function checkAction(action, range, total) {
  if (ACTIONS.indexOf(action) === -1) throw badRange();
  const start = range[0];
  const end = range[1];
  if (!Number.isInteger(start) || !Number.isInteger(end) ||
      start < 0 || end < start || end >= total) {
    throw badRange();
  }
  return { start: start, end: end };
}
