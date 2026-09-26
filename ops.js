// ops.js：动作与区间校验
const ACTIONS = ["all", "none", "invert", "range"];

function badRange(message) {
  const error = new Error(message);
  error.code = "E_BAD_RANGE";
  return error;
}

export function checkAction(action, range, total) {
  if (ACTIONS.indexOf(action) === -1) {
    throw badRange("不认识的动作：" + action);
  }
  const start = range && range.length > 0 ? Number(range[0]) : 0;
  const end = range && range.length > 1 ? Number(range[1]) : 0;
  if (!Number.isInteger(start) || !Number.isInteger(end)) {
    throw badRange("区间起止必须是整数");
  }
  if (start < 0 || end < 0) {
    throw badRange("区间起止不能为负");
  }
  if (start > end) {
    throw badRange("区间起点大于终点");
  }
  if (end >= total) {
    throw badRange("区间终点超出总数");
  }
  return { start: start, end: end };
}
