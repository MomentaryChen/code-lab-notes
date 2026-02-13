import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AStarPage() {
  useEffect(() => {
    // --- 以下是從原始 A* HTML 轉為 React 後的腳本邏輯 ---
    const ROWS = 10;
    const COLS = 10;

    const EMPTY = 0;
    const WALL = 1;
    const START = 2;
    const END = 3;
    const PATH = 4;
    const OPEN = 5;
    const CLOSED = 6;
    const CURRENT = 7;

    let grid = [];
    let startNode = { x: 0, y: 0 };
    let endNode = { x: 9, y: 9 };
    let visualizationStep = 0;
    let visualizationData = [];
    let isRunning = false;
    let nodeValues = {};
    let wallsConfig = [];
    let heuristicMode = 'manhattan';
    let currentScenario = 'near';

    function initGrid() {
      grid = [];
      for (let i = 0; i < ROWS; i++) {
        grid[i] = [];
        for (let j = 0; j < COLS; j++) {
          grid[i][j] = EMPTY;
        }
      }

      grid[startNode.y][startNode.x] = START;
      grid[endNode.y][endNode.x] = END;

      if (Array.isArray(wallsConfig)) {
        wallsConfig.forEach(([x, y]) => {
          if (grid[y] && grid[y][x] === EMPTY) {
            grid[y][x] = WALL;
          }
        });
      }

      renderGrid();
    }

    function renderGrid() {
      const gridDiv = document.getElementById('grid');
      if (!gridDiv) return;
      gridDiv.innerHTML = '';

      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          const cell = document.createElement('div');
          cell.className = 'cell';
          cell.id = `cell-${i}-${j}`;

          const icon = document.createElement('div');
          icon.className = 'icon';

          const coords = document.createElement('div');
          coords.className = 'coords';
          coords.textContent = `(${j},${i})`;

          const values = document.createElement('div');
          values.className = 'values';

          const state = grid[i][j];
          const nodeKey = `${j},${i}`;
          const valuesData = nodeValues[nodeKey];

          if (state === START) {
            cell.classList.add('start');
            icon.textContent = '🚩';
          } else if (state === END) {
            cell.classList.add('end');
            icon.textContent = '🎯';
          } else if (state === WALL) {
            cell.classList.add('wall');
            icon.textContent = '⬛';
          } else if (state === PATH) {
            cell.classList.add('path');
            icon.textContent = '⭐';
          } else if (state === OPEN) {
            cell.classList.add('open');
            icon.textContent = '○';
          } else if (state === CLOSED) {
            cell.classList.add('closed');
            icon.textContent = '✕';
          } else if (state === CURRENT) {
            cell.classList.add('current');
            icon.textContent = '📍';
          } else {
            cell.classList.add('empty');
          }

          if (
            valuesData &&
            (state === OPEN ||
              state === CLOSED ||
              state === CURRENT ||
              state === PATH)
          ) {
            values.innerHTML = `
              <div class="f-value">f=${valuesData.f}</div>
              <div class="g-value">g=${valuesData.g}</div>
              <div class="h-value">h=${valuesData.h}</div>
            `;
          }

          cell.appendChild(icon);
          cell.appendChild(coords);
          if (values.innerHTML) {
            cell.appendChild(values);
          }
          gridDiv.appendChild(cell);
        }
      }
    }

    function heuristic(node, goal) {
      if (heuristicMode === 'none') {
        return 0;
      }
      return Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y);
    }

    const scenarios = {
      near: {
        heuristicMode: 'manhattan',
        start: { x: 1, y: 1 },
        end: { x: 3, y: 2 },
        walls: [],
      },
      corridor: {
        heuristicMode: 'manhattan',
        start: { x: 0, y: 5 },
        end: { x: 9, y: 5 },
        walls: (function () {
          const arr = [];
          for (let x = 0; x < COLS; x++) {
            arr.push([x, 4]);
            arr.push([x, 6]);
          }
          return arr;
        })(),
      },
      heuristicGood: {
        heuristicMode: 'manhattan',
        start: { x: 0, y: 0 },
        end: { x: 9, y: 9 },
        walls: [
          [2, 2],
          [2, 3],
          [2, 4],
          [5, 5],
          [5, 6],
          [5, 7],
          [7, 2],
          [7, 3],
          [7, 4],
          [7, 5],
          [3, 7],
          [4, 7],
          [5, 7],
        ],
      },
      heuristicBad: {
        heuristicMode: 'none',
        start: { x: 0, y: 0 },
        end: { x: 9, y: 9 },
        walls: [
          [2, 2],
          [2, 3],
          [2, 4],
          [5, 5],
          [5, 6],
          [5, 7],
          [7, 2],
          [7, 3],
          [7, 4],
          [7, 5],
          [3, 7],
          [4, 7],
          [5, 7],
        ],
      },
    };

    function updateStats(openCount, closedCount, pathLength) {
      const openEl = document.getElementById('openCount');
      const closedEl = document.getElementById('closedCount');
      const pathEl = document.getElementById('pathLength');
      if (openEl) openEl.textContent = openCount;
      if (closedEl) closedEl.textContent = closedCount;
      if (pathEl) pathEl.textContent = pathLength !== null ? pathLength : '-';
    }

    function applyScenario(name) {
      const cfg = scenarios[name];
      if (!cfg) return;

      currentScenario = name;
      heuristicMode = cfg.heuristicMode;
      startNode = { ...cfg.start };
      endNode = { ...cfg.end };
      wallsConfig = cfg.walls.map(([x, y]) => [x, y]);

      nodeValues = {};
      initGrid();
      updateStats(0, 0, null);

      const info = document.getElementById('info');
      if (!info) return;
      if (name === 'near') {
        info.textContent =
          '情境一：起點與終點很近，只會評估附近少量節點。';
      } else if (name === 'corridor') {
        info.textContent = '情境二：狹長走廊，節點評估集中在通道上。';
      } else if (name === 'heuristicGood') {
        info.textContent =
          '情境三（良好啟發）：使用曼哈頓距離，評估區域更貼近起點 → 終點方向。';
      } else if (name === 'heuristicBad') {
        info.textContent =
          '情境三（無啟發）：h=0，相當於 Dijkstra，會評估更多節點向四周擴散。';
      }
    }

    function setScenario(name) {
      isRunning = false;
      visualizationStep = 0;
      visualizationData = [];

      const tabs = document.querySelectorAll('.scenario-tab');
      tabs.forEach((t) => {
        if (t.dataset.scenario === name) {
          t.classList.add('active');
        } else {
          t.classList.remove('active');
        }
      });

      applyScenario(name);
    }

    function aStar() {
      const key = (x, y) => `${x},${y}`;
      const openSet = [
        {
          x: startNode.x,
          y: startNode.y,
          g: 0,
          h: heuristic(startNode, endNode),
          f: heuristic(startNode, endNode),
        },
      ];
      const closedSet = new Set();
      const cameFrom = {};
      const gScore = {};
      const fScore = {};

      gScore[key(startNode.x, startNode.y)] = 0;
      fScore[key(startNode.x, startNode.y)] = heuristic(startNode, endNode);

      const steps = [];

      while (openSet.length > 0) {
        openSet.sort((a, b) => a.f - b.f);
        const current = openSet.shift();
        const currentKey = key(current.x, current.y);

        if (current.x === endNode.x && current.y === endNode.y) {
          const path = [];
          let node = currentKey;
          while (node) {
            const [x, y] = node.split(',').map(Number);
            path.unshift({ x, y });
            node = cameFrom[node];
          }
          const currentValues = {
            f: fScore[currentKey],
            g: gScore[currentKey],
            h: fScore[currentKey] - gScore[currentKey],
          };
          steps.push({
            type: 'current',
            node: { x: current.x, y: current.y, ...currentValues },
            openSet: openSet.map((n) => {
              const nKey = key(n.x, n.y);
              return {
                x: n.x,
                y: n.y,
                f: fScore[nKey],
                g: gScore[nKey],
                h: fScore[nKey] - gScore[nKey],
              };
            }),
            closedSet: Array.from(closedSet).map((k) => {
              const [x, y] = k.split(',').map(Number);
              return {
                x,
                y,
                f: fScore[k],
                g: gScore[k],
                h: fScore[k] - gScore[k],
              };
            }),
          });
          steps.push({
            type: 'path',
            path,
            closedSet: Array.from(closedSet)
              .concat([currentKey])
              .map((k) => {
                const [x, y] = k.split(',').map(Number);
                return { x, y };
              }),
          });
          return steps;
        }

        const currentValues = {
          f: fScore[currentKey],
          g: gScore[currentKey],
          h: fScore[currentKey] - gScore[currentKey],
        };
        steps.push({
          type: 'current',
          node: { x: current.x, y: current.y, ...currentValues },
          openSet: openSet.map((n) => {
            const nKey = key(n.x, n.y);
            return {
              x: n.x,
              y: n.y,
              f: fScore[nKey],
              g: gScore[nKey],
              h: fScore[nKey] - gScore[nKey],
            };
          }),
          closedSet: Array.from(closedSet).map((k) => {
            const [x, y] = k.split(',').map(Number);
            return {
              x,
              y,
              f: fScore[k],
              g: gScore[k],
              h: fScore[k] - gScore[k],
            };
          }),
        });

        closedSet.add(currentKey);

        const neighbors = [
          { x: current.x, y: current.y - 1 },
          { x: current.x, y: current.y + 1 },
          { x: current.x - 1, y: current.y },
          { x: current.x + 1, y: current.y },
        ];

        for (const neighbor of neighbors) {
          const nKey = key(neighbor.x, neighbor.y);
          if (
            neighbor.x < 0 ||
            neighbor.x >= COLS ||
            neighbor.y < 0 ||
            neighbor.y >= ROWS
          ) {
            continue;
          }
          if (grid[neighbor.y][neighbor.x] === WALL) {
            continue;
          }
          if (closedSet.has(nKey)) {
            continue;
          }

          const tentativeG = gScore[currentKey] + 1;

          if (!gScore[nKey] || tentativeG < gScore[nKey]) {
            cameFrom[nKey] = currentKey;
            gScore[nKey] = tentativeG;
            fScore[nKey] = tentativeG + heuristic(neighbor, endNode);

            if (
              !openSet.find(
                (n) => n.x === neighbor.x && n.y === neighbor.y,
              )
            ) {
              openSet.push({
                x: neighbor.x,
                y: neighbor.y,
                g: tentativeG,
                h: heuristic(neighbor, endNode),
                f: fScore[nKey],
              });
            }
          }
        }
      }

      return steps;
    }

    function animateVisualization() {
      if (visualizationStep >= visualizationData.length) {
        isRunning = false;
        return;
      }

      const step = visualizationData[visualizationStep];

      if (step.type === 'current') {
        for (let i = 0; i < ROWS; i++) {
          for (let j = 0; j < COLS; j++) {
            if (grid[i][j] === CURRENT) {
              grid[i][j] = CLOSED;
            }
          }
        }

        if (step.node.f !== undefined) {
          const nodeKey = `${step.node.x},${step.node.y}`;
          nodeValues[nodeKey] = {
            f: step.node.f,
            g: step.node.g,
            h: step.node.h,
          };
        }

        step.openSet.forEach((n) => {
          if (grid[n.y][n.x] === EMPTY) {
            grid[n.y][n.x] = OPEN;
          }
          if (n.f !== undefined) {
            const nodeKey = `${n.x},${n.y}`;
            nodeValues[nodeKey] = {
              f: n.f,
              g: n.g,
              h: n.h,
            };
          }
        });

        step.closedSet.forEach((n) => {
          if (grid[n.y][n.x] !== START && grid[n.y][n.x] !== END) {
            grid[n.y][n.x] = CLOSED;
          }
          if (n.f !== undefined) {
            const nodeKey = `${n.x},${n.y}`;
            nodeValues[nodeKey] = {
              f: n.f,
              g: n.g,
              h: n.h,
            };
          }
        });

        if (
          grid[step.node.y][step.node.x] !== START &&
          grid[step.node.y][step.node.x] !== END
        ) {
          grid[step.node.y][step.node.x] = CURRENT;
        }

        renderGrid();
        const info = document.getElementById('info');
        if (info) {
          info.textContent = `步驟 ${visualizationStep + 1}/${
            visualizationData.length
          }: 正在探索節點 (${step.node.x}, ${step.node.y}) f=${
            step.node.f || '?'
          } g=${step.node.g || '?'} h=${step.node.h || '?'}`;
        }
        updateStats(step.openSet.length, step.closedSet.length + 1, null);

        visualizationStep++;
        setTimeout(animateVisualization, 300);
      } else if (step.type === 'path') {
        const closedCount = step.closedSet ? step.closedSet.length : 0;
        step.path.forEach((node, index) => {
          if (
            grid[node.y][node.x] !== START &&
            grid[node.y][node.x] !== END
          ) {
            setTimeout(() => {
              grid[node.y][node.x] = PATH;
              renderGrid();
              if (index === step.path.length - 1) {
                updateStats(0, closedCount, step.path.length - 1);
                const info = document.getElementById('info');
                if (info) {
                  info.textContent = `✅ 找到路徑！路徑長度：${
                    step.path.length - 1
                  } 步`;
                }
                isRunning = false;
              }
            }, index * 100);
          }
        });
      }
    }

    function startVisualization() {
      if (isRunning) return;
      isRunning = true;
      visualizationStep = 0;
      nodeValues = {};
      visualizationData = aStar();

      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          if (
            grid[i][j] !== START &&
            grid[i][j] !== END &&
            grid[i][j] !== WALL
          ) {
            grid[i][j] = EMPTY;
          }
        }
      }

      animateVisualization();
    }

    function stepByStep() {
      if (visualizationData.length === 0) {
        nodeValues = {};
        visualizationData = aStar();
        for (let i = 0; i < ROWS; i++) {
          for (let j = 0; j < COLS; j++) {
            if (
              grid[i][j] !== START &&
              grid[i][j] !== END &&
              grid[i][j] !== WALL
            ) {
              grid[i][j] = EMPTY;
            }
          }
        }
      }

      if (visualizationStep >= visualizationData.length) return;

      const step = visualizationData[visualizationStep];

      if (step.type === 'current') {
        for (let i = 0; i < ROWS; i++) {
          for (let j = 0; j < COLS; j++) {
            if (grid[i][j] === CURRENT) {
              grid[i][j] = CLOSED;
            }
          }
        }

        if (step.node.f !== undefined) {
          const nodeKey = `${step.node.x},${step.node.y}`;
          nodeValues[nodeKey] = {
            f: step.node.f,
            g: step.node.g,
            h: step.node.h,
          };
        }

        step.openSet.forEach((n) => {
          if (grid[n.y][n.x] === EMPTY) {
            grid[n.y][n.x] = OPEN;
          }
          if (n.f !== undefined) {
            const nodeKey = `${n.x},${n.y}`;
            nodeValues[nodeKey] = {
              f: n.f,
              g: n.g,
              h: n.h,
            };
          }
        });

        step.closedSet.forEach((n) => {
          if (grid[n.y][n.x] !== START && grid[n.y][n.x] !== END) {
            grid[n.y][n.x] = CLOSED;
          }
          if (n.f !== undefined) {
            const nodeKey = `${n.x},${n.y}`;
            nodeValues[nodeKey] = {
              f: n.f,
              g: n.g,
              h: n.h,
            };
          }
        });

        if (
          grid[step.node.y][step.node.x] !== START &&
          grid[step.node.y][step.node.x] !== END
        ) {
          grid[step.node.y][step.node.x] = CURRENT;
        }

        renderGrid();
        updateStats(step.openSet.length, step.closedSet.length + 1, null);
        const info = document.getElementById('info');
        if (info) {
          info.textContent = `步驟 ${visualizationStep + 1}/${
            visualizationData.length
          }: 正在探索節點 (${step.node.x}, ${step.node.y}) f=${
            step.node.f || '?'
          } g=${step.node.g || '?'} h=${step.node.h || '?'}`;
        }

        visualizationStep++;
      } else if (step.type === 'path') {
        step.path.forEach((node) => {
          if (
            grid[node.y][node.x] !== START &&
            grid[node.y][node.x] !== END
          ) {
            grid[node.y][node.x] = PATH;
          }
        });
        renderGrid();
        const closedCount = step.closedSet ? step.closedSet.length : 0;
        updateStats(0, closedCount, step.path.length - 1);
        const info = document.getElementById('info');
        if (info) {
          info.textContent = `✅ 找到路徑！路徑長度：${
            step.path.length - 1
          } 步`;
        }
        visualizationStep = visualizationData.length;
      }
    }

    function resetGrid() {
      isRunning = false;
      visualizationStep = 0;
      visualizationData = [];
      nodeValues = {};
      applyScenario(currentScenario || 'near');
      const info = document.getElementById('info');
      if (info) info.textContent = '';
      updateStats(0, 0, null);
    }

    // 初始化預設情境
    applyScenario('near');

    // 綁定按鈕事件
    const startBtn = document.querySelector(
      'button[data-action="start-visualization"]',
    );
    const resetBtn = document.querySelector(
      'button[data-action="reset-grid"]',
    );
    const stepBtn = document.querySelector(
      'button[data-action="step-visualization"]',
    );

    if (startBtn) startBtn.addEventListener('click', startVisualization);
    if (resetBtn) resetBtn.addEventListener('click', resetGrid);
    if (stepBtn) stepBtn.addEventListener('click', stepByStep);

    const scenarioButtons = document.querySelectorAll(
      '.scenario-tab[data-scenario]',
    );
    scenarioButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const scenario = btn.dataset.scenario;
        setScenario(scenario);
      });
    });

    // 浮動返回／回頂按鈕
    const floatButtons = document.querySelectorAll('.float-btn');
    const topBtn = document.getElementById('top-btn');
    const backBtn = document.getElementById('back-btn');

    function toggleFloatButtons() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      floatButtons.forEach((btn) => {
        if (scrollTop > 300) {
          btn.classList.add('show');
        } else {
          btn.classList.remove('show');
        }
      });
    }

    if (topBtn) {
      topBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (document.referrer && document.referrer !== window.location.href) {
          window.history.back();
        } else {
          window.location.href = '/algorithm';
        }
      });
    }

    window.addEventListener('scroll', toggleFloatButtons);
    toggleFloatButtons();

    return () => {
      if (startBtn) startBtn.removeEventListener('click', startVisualization);
      if (resetBtn) resetBtn.removeEventListener('click', resetGrid);
      if (stepBtn) stepBtn.removeEventListener('click', stepByStep);
      scenarioButtons.forEach((btn) => {
        btn.replaceWith(btn.cloneNode(true));
      });
      if (topBtn)
        topBtn.replaceWith(topBtn.cloneNode(true));
      if (backBtn)
        backBtn.replaceWith(backBtn.cloneNode(true));
      window.removeEventListener('scroll', toggleFloatButtons);
    };
  }, []);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", sans-serif;
          line-height: 1.6;
          color: #333;
          background: radial-gradient(circle at top left, #1d283a, #020617 55%);
          padding: 20px;
          min-height: 100vh;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          padding: 40px;
        }
        h1 {
          color: #667eea;
          text-align: center;
          margin-bottom: 8px;
          font-size: 2.4em;
          letter-spacing: 0.02em;
        }
        .subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 30px;
          font-size: 1.1em;
        }
        .back-link {
          display: inline-block;
          margin-bottom: 20px;
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }
        .back-link:hover {
          color: #764ba2;
        }
        h2 {
          color: #764ba2;
          margin-top: 40px;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 3px solid #667eea;
          font-size: 1.8em;
        }
        h3 {
          color: #555;
          margin-top: 25px;
          margin-bottom: 15px;
          font-size: 1.4em;
        }
        .section {
          margin-bottom: 30px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
          border-left: 5px solid #667eea;
        }
        .formula {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          margin: 15px 0;
          text-align: center;
          font-size: 1.3em;
          font-weight: bold;
          color: #667eea;
          border: 2px solid #667eea;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .formula code {
          font-size: 1.2em;
          color: #764ba2;
        }
        .step {
          background: white;
          padding: 15px;
          margin: 10px 0;
          border-radius: 8px;
          border-left: 4px solid #764ba2;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .step-number {
          display: inline-block;
          background: #667eea;
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          text-align: center;
          line-height: 30px;
          font-weight: bold;
          margin-right: 10px;
        }
        code {
          background: #f4f4f4;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Consolas', 'Monaco', monospace;
          color: #e83e8c;
        }
        pre {
          background: #2d2d2d;
          color: #f8f8f2;
          padding: 20px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 15px 0;
        }
        pre code {
          background: transparent;
          color: #f8f8f2;
          padding: 0;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(10, 70px);
          gap: 3px;
          margin: 20px auto;
          justify-content: center;
          padding: 25px;
          background: #e8e8e8;
          border-radius: 10px;
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.1);
        }
        .cell {
          width: 70px;
          height: 70px;
          border: 2px solid #666;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.85em;
          transition: all 0.3s;
          position: relative;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          border-radius: 4px;
          padding: 2px;
        }
        .cell .icon {
          font-size: 1.3em;
          line-height: 1;
          margin-bottom: 2px;
        }
        .cell .coords {
          font-size: 0.55em;
          opacity: 0.8;
          margin-top: 1px;
          font-weight: normal;
        }
        .cell .values {
          font-size: 0.5em;
          margin-top: 2px;
          line-height: 1.2;
          text-align: center;
        }
        .cell .values .f-value {
          font-weight: bold;
        }
        .cell .values .g-value {
          color: #1976d2;
        }
        .cell .values .h-value {
          color: #d32f2f;
        }
        .cell.start {
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
          color: white;
          border-color: #2e7d32;
          box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
        }
        .cell.end {
          background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
          color: white;
          border-color: #c62828;
          box-shadow: 0 0 10px rgba(244, 67, 54, 0.5);
        }
        .cell.wall {
          background: linear-gradient(135deg, #424242 0%, #212121 100%);
          color: white;
          border-color: #000;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
        }
        .cell.path {
          background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
          color: white;
          border-color: #1565C0;
          box-shadow: 0 0 8px rgba(33, 150, 243, 0.6);
        }
        .cell.open {
          background: linear-gradient(135deg, #C8E6C9 0%, #A5D6A7 100%);
          border-color: #81C784;
          color: #2e7d32;
        }
        .cell.closed {
          background: linear-gradient(135deg, #FFCDD2 0%, #EF9A9A 100%);
          border-color: #E57373;
          color: #c62828;
        }
        .cell.current {
          background: linear-gradient(135deg, #FFD700 0%, #FFC107 100%);
          border-color: #FFA000;
          color: #F57C00;
          animation: pulse 1s infinite;
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
          z-index: 10;
        }
        .cell.empty {
          background: #FAFAFA;
          border-color: #BDBDBD;
          color: #757575;
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
          }
          50% {
            transform: scale(1.15);
            box-shadow: 0 0 25px rgba(255, 215, 0, 1);
          }
        }
        .legend {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin: 25px 0;
          justify-content: center;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 2px solid #e0e0e0;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          background: white;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          font-weight: 500;
        }
        .legend-color {
          width: 40px;
          height: 40px;
          border: 2px solid #666;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3em;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .highlight {
          background: #fff3cd;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: bold;
        }
        .tip {
          background: #d1ecf1;
          border-left: 4px solid #0c5460;
          padding: 15px;
          margin: 15px 0;
          border-radius: 4px;
        }
        .warning {
          background: #fff3cd;
          border-left: 4px solid #856404;
          padding: 15px;
          margin: 15px 0;
          border-radius: 4px;
        }
        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        .comparison-table th,
        .comparison-table td {
          padding: 12px;
          text-align: left;
          border: 1px solid #ddd;
        }
        .comparison-table th {
          background: #667eea;
          color: white;
        }
        .comparison-table tr:nth-child(even) {
          background: #f8f9fa;
        }
        .button-group {
          text-align: center;
          margin: 20px 0;
        }
        .scenario-tabs {
          display: flex;
          justify-content: center;
          margin: 10px auto 20px;
          gap: 8px;
          flex-wrap: wrap;
        }
        .scenario-tab {
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid #667eea;
          color: #667eea;
          background: #fff;
          font-size: 0.9em;
          cursor: pointer;
          transition: all 0.2s;
          user-select: none;
        }
        .scenario-tab:hover {
          background: #eef2ff;
        }
        .scenario-tab.active {
          background: #667eea;
          color: #fff;
          box-shadow: 0 2px 6px rgba(102, 126, 234, 0.6);
        }
        button {
          background: #667eea;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1em;
          margin: 5px;
          transition: background 0.3s;
        }
        button:hover {
          background: #764ba2;
        }
        button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        .float-button {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .float-btn {
          min-width: 120px;
          height: 50px;
          border-radius: 25px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 16px;
          font-weight: 600;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          padding: 0 20px;
        }
        .float-btn.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .float-btn.back-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .float-btn.top-btn {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        }
        .float-btn:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.7), 0 0 0 2px rgba(255, 255, 255, 0.2);
        }
        .float-btn:active {
          transform: translateY(-1px) scale(0.98);
        }
        .float-btn-icon {
          font-size: 18px;
          font-weight: bold;
        }
        .float-btn-text {
          font-size: 14px;
          letter-spacing: 0.5px;
        }
        @media (max-width: 768px) {
          .container {
            padding: 20px;
          }
          h1 {
            font-size: 2em;
          }
          .grid-container {
            grid-template-columns: repeat(5, 60px);
          }
          .cell {
            width: 60px;
            height: 60px;
          }
          .float-button {
            bottom: 20px;
            right: 20px;
          }
          .float-btn {
            min-width: 100px;
            height: 44px;
            font-size: 14px;
            padding: 0 16px;
          }
          .float-btn-icon {
            font-size: 16px;
          }
          .float-btn-text {
            font-size: 12px;
          }
        }
      `}</style>

      <div className="container">
        <Link to="/algorithm" className="back-link">
          ← 返回首頁
        </Link>

        <h1>🚀 A* 算法完整詳解</h1>
        <p className="subtitle">從原理到實作，深入理解最短路徑搜尋演算法</p>

        {/* 以下內容直接對應原 HTML 結構 */}
        <div className="section">
          <h2>1. 什麼是 A* 算法？</h2>
          <p>
            A*（A-Star）算法是一種在圖形中尋找從起點到終點的最短路徑的啟發式搜尋演算法。它結合了
            <strong>Dijkstra 演算法</strong>
            （保證找到最短路徑）和<strong>貪心最佳優先搜尋</strong>
            （使用啟發式函數加速搜尋）的優點。
          </p>
          <div className="tip">
            <strong>💡 核心思想：</strong>
            A* 算法透過評估函數 f(n) = g(n) + h(n) 來決定下一步要探索哪個節點，其中
            g(n) 是從起點到目前節點的實際代價，h(n) 是從目前節點到終點的估計代價（啟發式函數）。
          </div>
        </div>

        {/* 2. 核心公式 */}
        <div className="section">
          <h2>2. 核心公式</h2>
          <div className="formula">
            f(n) = g(n) + h(n)
          </div>

          <h3>2.1 各參數含義</h3>
          <ul style={{ marginLeft: 20, lineHeight: 2 }}>
            <li>
              <span className="highlight">f(n)</span>：節點 n 的總評估值（越小越好）
            </li>
            <li>
              <span className="highlight">g(n)</span>：從起點到節點 n 的<strong>實際代價</strong>
            </li>
            <li>
              <span className="highlight">h(n)</span>：從節點 n 到終點的<strong>估計代價</strong>（啟發式函數）
            </li>
          </ul>

          <div className="warning">
            <strong>⚠️ 重要約束：</strong>
            啟發式函數 h(n) 必須是<strong>可接受的（admissible）</strong>
            ，也就是它永遠不能高估到達終點的實際代價，這樣才能保證 A* 算法找到最優解。
          </div>
        </div>

        {/* 3. 演算法詳細步驟（精簡版，對應原 HTML 結構） */}
        <div className="section">
          <h2>3. 演算法詳細步驟</h2>

          <div className="step">
            <span className="step-number">1</span>
            <strong>初始化：</strong>
            <ul style={{ marginLeft: 40, marginTop: 10 }}>
              <li>
                建立 <code>openSet</code>（待探索節點）與 <code>closedSet</code>（已探索節點）
              </li>
              <li>將起點加入 openSet，設定 g(起點) = 0, f(起點) = h(起點)</li>
              <li>為每個節點準備「父節點」欄位，用來之後回溯路徑</li>
            </ul>
          </div>

          <div className="step">
            <span className="step-number">2</span>
            <strong>主迴圈：重複直到找到終點或 openSet 為空</strong>
          </div>

          <div className="step">
            <span className="step-number">2.1</span>
            <strong>選擇目前節點：</strong>
            <ul style={{ marginLeft: 40, marginTop: 10 }}>
              <li>從 openSet 中選出 f(n) 最小的節點作為目前節點</li>
              <li>若 f 相同，通常選擇 h 較小、距離終點較近的節點</li>
            </ul>
          </div>

          <div className="step">
            <span className="step-number">2.2</span>
            <strong>是否到達終點：</strong>
            <ul style={{ marginLeft: 40, marginTop: 10 }}>
              <li>若目前節點就是終點，藉由父節點指標<strong>回溯整條路徑</strong></li>
            </ul>
          </div>

          <div className="step">
            <span className="step-number">2.3</span>
            <strong>移動目前節點到 closedSet：</strong>
            <ul style={{ marginLeft: 40, marginTop: 10 }}>
              <li>從 openSet 移除目前節點，加入 closedSet</li>
            </ul>
          </div>

          <div className="step">
            <span className="step-number">2.4</span>
            <strong>探索鄰居節點：</strong>
            <ul style={{ marginLeft: 40, marginTop: 10 }}>
              <li>略過牆壁與已在 closedSet 中的節點</li>
              <li>
                對每個鄰居計算暫時 g 值：<code>tentative_g = g(目前節點) + 移動代價</code>
              </li>
              <li>若鄰居不在 openSet，加入 openSet</li>
              <li>
                若 tentative_g 小於原本的 g(鄰居)，代表找到更佳路徑，需更新 g / f 與父節點
              </li>
            </ul>
          </div>

          <div className="step">
            <span className="step-number">3</span>
            <strong>結束條件：</strong>
            <ul style={{ marginLeft: 40, marginTop: 10 }}>
              <li>若 openSet 為空仍未到終點 → 無路徑存在</li>
              <li>若成功回溯終點 → 取得最短路徑</li>
            </ul>
          </div>
        </div>

        {/* 3.5 g / h / f 詳細解說（對應原 3.5 小節，略為精簡） */}
        <div className="section">
          <h2>3.5 節點評估與計算詳解</h2>
          <p>
            這一節針對 g(n)、h(n)、f(n) 三個數值做更細緻的說明，幫助你讀懂視覺化中的標示。
          </p>

          <div className="step">
            <h3 style={{ color: '#667eea', marginBottom: 10 }}>
              1. g(n)：實際代價（已走過路徑）
            </h3>
            <ul style={{ marginLeft: 20, lineHeight: 2 }}>
              <li>定義：從起點走到節點 n 的實際路徑長度</li>
              <li>計算：起點 g = 0；其他節點為「父節點 g + 移動代價」</li>
              <li>在格子地圖中，通常每一步移動的代價為 1</li>
            </ul>
          </div>

          <div className="step">
            <h3 style={{ color: '#667eea', marginBottom: 10 }}>
              2. h(n)：啟發式估計（剩餘距離）
            </h3>
            <ul style={{ marginLeft: 20, lineHeight: 2 }}>
              <li>定義：從節點 n 到終點的「估計」距離</li>
              <li>常用：曼哈頓距離 <code>h(n) = |x₁ - x₂| + |y₁ - y₂|</code></li>
              <li>必須「不高估」實際距離，才能保證最優解</li>
            </ul>
          </div>

          <div className="step">
            <h3 style={{ color: '#667eea', marginBottom: 10 }}>
              3. f(n)：總評估值（優先順序）
            </h3>
            <ul style={{ marginLeft: 20, lineHeight: 2 }}>
              <li>定義：f(n) = g(n) + h(n)</li>
              <li>意義：預估「從起點經由 n 到終點」的總成本</li>
              <li>演算法每次都選擇 f 最小的節點優先擴展</li>
            </ul>
          </div>
        </div>

        {/* 5. 常用啟發式函數 */}
        <div className="section">
          <h2>5. 常用啟發式函數</h2>

          <h3>5.1 曼哈頓距離（Manhattan Distance）</h3>
          <p>適用於只能上下左右移動的方格地圖：</p>
          <div className="formula">
            h(n) = |x₁ - x₂| + |y₁ - y₂|
          </div>
          <pre>
            <code>
              {`function manhattanDistance(node, goal) {
  return Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y);
}`}
            </code>
          </pre>

          <h3>5.2 歐幾里得距離（Euclidean Distance）</h3>
          <p>適用於可以斜向移動的地圖：</p>
          <div className="formula">
            h(n) = √[(x₁ - x₂)² + (y₁ - y₂)²]
          </div>
          <pre>
            <code>
              {`function euclideanDistance(node, goal) {
  const dx = node.x - goal.x;
  const dy = node.y - goal.y;
  return Math.sqrt(dx * dx + dy * dy);
}`}
            </code>
          </pre>

          <h3>5.3 切比雪夫距離（Chebyshev Distance）</h3>
          <p>適用於允許 8 方向（含對角線）移動的地圖：</p>
          <div className="formula">
            h(n) = max(|x₁ - x₂|, |y₁ - y₂|)
          </div>
          <pre>
            <code>
              {`function chebyshevDistance(node, goal) {
  return Math.max(
    Math.abs(node.x - goal.x),
    Math.abs(node.y - goal.y),
  );
}`}
            </code>
          </pre>
        </div>

        {/* 6. 偽程式碼 */}
        <div className="section">
          <h2>6. 完整偽程式碼</h2>
          <pre>
            <code>
              {`function AStar(start, goal):
  openSet = [start]
  closedSet = []
  gScore = { start: 0 }
  fScore = { start: heuristic(start, goal) }
  cameFrom = {}

  while openSet is not empty:
    current = node in openSet with lowest fScore

    if current == goal:
      return reconstructPath(cameFrom, current)

    openSet.remove(current)
    closedSet.add(current)

    for each neighbor of current:
      if neighbor in closedSet: continue
      if neighbor is obstacle: continue

      tentative_gScore = gScore[current] + distance(current, neighbor)

      if neighbor not in openSet:
        openSet.add(neighbor)
      else if tentative_gScore >= gScore[neighbor]:
        continue

      cameFrom[neighbor] = current
      gScore[neighbor] = tentative_gScore
      fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, goal)

  return null`}
            </code>
          </pre>
        </div>

        {/* 7. 複雜度 */}
        <div className="section">
          <h2>7. 演算法複雜度</h2>
          <table className="comparison-table">
            <tbody>
              <tr>
                <th>複雜度類型</th>
                <th>數值</th>
                <th>說明</th>
              </tr>
              <tr>
                <td>
                  <strong>時間複雜度</strong>
                </td>
                <td>O(b^d)</td>
                <td>b 為分支因子、d 為解的深度，最壞情況可能需要探索大量節點。</td>
              </tr>
              <tr>
                <td>
                  <strong>空間複雜度</strong>
                </td>
                <td>O(b^d)</td>
                <td>需要儲存 open / closed 兩個集合中的所有節點。</td>
              </tr>
              <tr>
                <td>
                  <strong>最優性</strong>
                </td>
                <td>✓ 保證</td>
                <td>啟發式函數可接受時，保證找到最短路徑。</td>
              </tr>
              <tr>
                <td>
                  <strong>完備性</strong>
                </td>
                <td>✓ 保證</td>
                <td>若存在可行路徑，一定能找到。</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 8. 與其他演算法比較（摘要版） */}
        <div className="section">
          <h2>8. 與其他演算法比較</h2>
          <table className="comparison-table">
            <tbody>
              <tr>
                <th>演算法</th>
                <th>優點</th>
                <th>缺點</th>
                <th>適用情境</th>
              </tr>
              <tr>
                <td>
                  <strong>A*</strong>
                </td>
                <td>最優解、效率高、可利用啟發式資訊減少搜尋空間。</td>
                <td>需設計良好的啟發式函數。</td>
                <td>路徑規劃、遊戲 AI、機器人導航。</td>
              </tr>
              <tr>
                <td>
                  <strong>Dijkstra</strong>
                </td>
                <td>保證最短路徑、不需啟發式。</td>
                <td>通常會探索更多節點，效率較低。</td>
                <td>單源最短路徑、圖論問題。</td>
              </tr>
              <tr>
                <td>
                  <strong>BFS</strong>
                </td>
                <td>實作簡單、邊權為 1 時保證最短路徑。</td>
                <td>不支援權重、搜尋範圍大。</td>
                <td>無權圖最短路徑、迷宮搜尋。</td>
              </tr>
              <tr>
                <td>
                  <strong>貪心最佳優先</strong>
                </td>
                <td>速度快、實作簡單。</td>
                <td>不保證最優解。</td>
                <td>只需近似解的情境。</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 9. 實際應用情境 */}
        <div className="section">
          <h2>9. 實際應用情境</h2>
          <ul style={{ marginLeft: 20, lineHeight: 2 }}>
            <li>🎮 遊戲開發：NPC 尋路、單位移動。</li>
            <li>🗺️ 地圖導覽：GPS 路徑規劃、路線最佳化。</li>
            <li>🤖 機器人導航：室內外路徑規劃。</li>
            <li>📦 物流最佳化：倉儲揀貨路徑、配送路線。</li>
            <li>🌐 網路路由：封包轉送路徑選擇。</li>
            <li>🧩 拼圖與搜索問題：例如 8-puzzle、滑塊遊戲。</li>
          </ul>
        </div>

        {/* 10. 優化技巧（摘要） */}
        <div className="section">
          <h2>10. 優化技巧</h2>
          <h3>10.1 使用優先佇列</h3>
          <p>用二元堆實作 openSet，可在 O(log N) 內取得 f 最小的節點。</p>

          <h3>10.2 雙向搜尋</h3>
          <p>同時從起點與終點開始搜尋，當兩邊相遇時停止，可有效減少搜尋空間。</p>

          <h3>10.3 IDA*（Iterative Deepening A*）</h3>
          <p>結合迭代加深與 A*，記憶體需求較小，適合窄記憶體環境。</p>

          <h3>10.4 Jump Point Search (JPS)</h3>
          <p>針對規則網格的優化技巧，可跳過冗餘節點，大幅加速尋路。</p>
        </div>

        <div className="section">
          <h2>4. 視覺化示範</h2>
          <p>下面是一個 10x10 的網格地圖，點擊按鈕即可查看 A* 算法的執行過程：</p>

          <div className="tip" style={{ marginBottom: 20 }}>
            <strong>📖 如何閱讀網格：</strong>
            <ul
              style={{
                marginLeft: 20,
                marginTop: 10,
                lineHeight: 1.8,
              }}
            >
              <li>
                每個格子會顯示<strong>圖示</strong>、<strong>座標 (x, y)</strong>
                ，以及在需要時顯示 <strong>f/g/h 值</strong>
              </li>
              <li>
                座標格式：<code>(x, y)</code>，x 是欄位索引（由左到右），y
                是列索引（由上到下）
              </li>
              <li>不同顏色與圖示代表不同的節點狀態</li>
              <li>
                演算法會逐步探索節點，綠色代表待探索，粉色代表已探索，黃色代表目前正在處理的節點
              </li>
            </ul>
          </div>

          <div className="legend">
            <div className="legend-item">
              <div className="legend-color start">🚩</div>
              <span>
                <strong>起點 (Start)</strong>
              </span>
            </div>
            <div className="legend-item">
              <div className="legend-color end">🎯</div>
              <span>
                <strong>終點 (End)</strong>
              </span>
            </div>
            <div className="legend-item">
              <div className="legend-color wall">⬛</div>
              <span>
                <strong>障礙物 (Wall)</strong>
              </span>
            </div>
            <div className="legend-item">
              <div className="legend-color path">⭐</div>
              <span>
                <strong>最終路徑 (Path)</strong>
              </span>
            </div>
            <div className="legend-item">
              <div className="legend-color open">○</div>
              <span>
                <strong>開放列表 (Open Set)</strong> - 待探索
              </span>
            </div>
            <div className="legend-item">
              <div className="legend-color closed">✕</div>
              <span>
                <strong>關閉列表 (Closed Set)</strong> - 已探索
              </span>
            </div>
            <div className="legend-item">
              <div className="legend-color current">📍</div>
              <span>
                <strong>目前節點 (Current)</strong> - 正在處理
              </span>
            </div>
          </div>

          <div className="scenario-tabs">
            <div
              className="scenario-tab active"
              data-scenario="near"
            >
              情境一：近距離目標
            </div>
            <div className="scenario-tab" data-scenario="corridor">
              情境二：狹長走廊
            </div>
            <div
              className="scenario-tab"
              data-scenario="heuristicGood"
            >
              情境三：良好啟發 (Manhattan)
            </div>
            <div
              className="scenario-tab"
              data-scenario="heuristicBad"
            >
              情境三：無啟發 (h=0)
            </div>
          </div>

          <div className="button-group">
            <button data-action="start-visualization">開始示範</button>
            <button data-action="reset-grid">重置</button>
            <button data-action="step-visualization">單步執行</button>
          </div>

          <div id="grid" className="grid-container" />
          <div
            id="info"
            style={{
              textAlign: 'center',
              marginTop: 25,
              padding: 15,
              background: '#e3f2fd',
              borderRadius: 8,
              fontSize: '1.1em',
              color: '#1976d2',
              fontWeight: 500,
              border: '2px solid #90caf9',
            }}
          />
          <div
            id="stats"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 15,
              marginTop: 20,
            }}
          >
            <div
              style={{
                padding: 15,
                background: '#f5f5f5',
                borderRadius: 8,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '0.9em',
                  color: '#666',
                  marginBottom: 5,
                }}
              >
                開放列表節點數
              </div>
              <div
                id="openCount"
                style={{
                  fontSize: '1.5em',
                  fontWeight: 'bold',
                  color: '#4CAF50',
                }}
              >
                0
              </div>
            </div>
            <div
              style={{
                padding: 15,
                background: '#f5f5f5',
                borderRadius: 8,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '0.9em',
                  color: '#666',
                  marginBottom: 5,
                }}
              >
                關閉列表節點數
              </div>
              <div
                id="closedCount"
                style={{
                  fontSize: '1.5em',
                  fontWeight: 'bold',
                  color: '#f44336',
                }}
              >
                0
              </div>
            </div>
            <div
              style={{
                padding: 15,
                background: '#f5f5f5',
                borderRadius: 8,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '0.9em',
                  color: '#666',
                  marginBottom: 5,
                }}
              >
                路徑長度
              </div>
              <div
                id="pathLength"
                style={{
                  fontSize: '1.5em',
                  fontWeight: 'bold',
                  color: '#2196F3',
                }}
              >
                -
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="float-button">
        <button
          className="float-btn back-btn"
          id="back-btn"
          title="返回上一頁"
        >
          <span className="float-btn-icon">←</span>
          <span className="float-btn-text">返回</span>
        </button>
        <button
          className="float-btn top-btn"
          id="top-btn"
          title="回到頂部"
        >
          <span className="float-btn-icon">↑</span>
          <span className="float-btn-text">頂部</span>
        </button>
      </div>
    </>
  );
}

