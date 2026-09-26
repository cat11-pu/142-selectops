// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let action = spec.action || "all";
  parts.log.textContent = "条目 " + (spec.total || 0) + " 个，动作 " + action + "。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { action: action }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    for (let spot = 0; spot < (spec.total || 0); spot += 1) {
      const card = document.createElement("div");
      card.className = "card" + (view.selected.indexOf(spot) !== -1 ? " on" : "");
      const head = document.createElement("h3");
      head.textContent = "第 " + spot + " 个";
      card.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip" + (view.selected.indexOf(spot) !== -1 ? " ok" : "");
      mark.textContent = view.selected.indexOf(spot) !== -1 ? "已选" : "未选";
      card.appendChild(mark);
      parts.stage.appendChild(card);
    }
    parts.legend.textContent = "选中 " + view.count + " 个";
    parts.log.textContent = "动作 " + action;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "执行动作";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const cycleButton = document.createElement("button");
  cycleButton.textContent = "换下一个动作";
  cycleButton.addEventListener("click", function () {
    const list = ["all", "none", "invert", "range"];
    action = list[(list.indexOf(action) + 1) % list.length];
    draw();
  });
  parts.controls.appendChild(cycleButton);

  const label = document.createElement("label");
  label.textContent = "区间起点与终点";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "1-3";
  box.addEventListener("input", function () {
    const pieces = box.value.split("-");
    try {
      const view = render(Object.assign({}, spec, { action: "range", range: [Number(pieces[0]), Number(pieces[1])] }));
      parts.out.textContent = "选中 " + view.count + " 个：" + JSON.stringify(view.selected);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看选中个数";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { action: action }));
    parts.out.textContent = "选中 " + view.count + " 个";
  });
  parts.controls.appendChild(readButton);

  draw();
}
