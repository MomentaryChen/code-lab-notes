import React, { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../../useTheme.js';

function createCardHandlers(href, navigate) {
  const handleClick = (event) => {
    if (event.target.closest('a')) {
      return;
    }
    if (navigate) {
      navigate(href);
    } else {
      window.location.href = href;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(event);
    }
  };

  return { handleClick, handleKeyDown };
}

function AStarPreview() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let resizeTimer;

    function generate() {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const container = canvas.parentElement;
      const displayWidth = container.clientWidth || 800;
      const displayHeight =
        container.clientHeight || Math.floor((displayWidth * 9) / 16);

      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return;
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const width = displayWidth;
      const height = displayHeight;

      const bgGradient = ctx.createLinearGradient(0, 0, width, height);
      bgGradient.addColorStop(0, '#1a237e');
      bgGradient.addColorStop(1, '#283593');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.font = `bold ${Math.floor(width / 25)}px "Microsoft YaHei", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('A* 路徑搜尋演算法', width / 2, height * 0.12);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = `${Math.floor(width / 45)}px "Microsoft YaHei", sans-serif`;
      ctx.fillText('啟發式最短路徑搜尋', width / 2, height * 0.21);

      const gridSize = 10;
      const gridHeight = height * 0.55;
      const cellSize = gridHeight / gridSize;
      const gridStartX = (width - gridSize * cellSize) / 2;
      const gridStartY = height * 0.28;

      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          const x = gridStartX + col * cellSize;
          const y = gridStartY + row * cellSize;

          ctx.fillStyle =
            (row + col) % 2 === 0
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(255, 255, 255, 0.02)';
          ctx.fillRect(x, y, cellSize, cellSize);

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, cellSize, cellSize);
        }
      }

      const startPos = { row: 1, col: 1 };
      const endPos = { row: 8, col: 8 };
      const walls = [
        { row: 3, col: 3 },
        { row: 3, col: 4 },
        { row: 3, col: 5 },
        { row: 4, col: 5 },
        { row: 5, col: 5 },
        { row: 6, col: 5 },
        { row: 6, col: 4 },
        { row: 6, col: 3 },
      ];
      const path = [
        { row: 1, col: 1 },
        { row: 1, col: 2 },
        { row: 2, col: 2 },
        { row: 2, col: 3 },
        { row: 2, col: 4 },
        { row: 2, col: 5 },
        { row: 2, col: 6 },
        { row: 3, col: 6 },
        { row: 4, col: 6 },
        { row: 5, col: 6 },
        { row: 6, col: 6 },
        { row: 7, col: 6 },
        { row: 7, col: 7 },
        { row: 8, col: 7 },
        { row: 8, col: 8 },
      ];
      const explored = [
        { row: 0, col: 1 },
        { row: 1, col: 0 },
        { row: 0, col: 2 },
        { row: 2, col: 1 },
        { row: 3, col: 2 },
        { row: 4, col: 2 },
        { row: 5, col: 2 },
        { row: 4, col: 3 },
        { row: 4, col: 4 },
        { row: 5, col: 3 },
        { row: 5, col: 4 },
        { row: 7, col: 5 },
        { row: 8, col: 6 },
        { row: 7, col: 8 },
        { row: 9, col: 7 },
      ];

      explored.forEach((cell) => {
        if (
          !walls.some((w) => w.row === cell.row && w.col === cell.col) &&
          !path.some((p) => p.row === cell.row && p.col === cell.col) &&
          (cell.row !== startPos.row || cell.col !== startPos.col) &&
          (cell.row !== endPos.row || cell.col !== endPos.col)
        ) {
          const x = gridStartX + cell.col * cellSize;
          const y = gridStartY + cell.row * cellSize;
          ctx.fillStyle = 'rgba(76, 175, 80, 0.3)';
          ctx.fillRect(x, y, cellSize, cellSize);
        }
      });

      path.forEach((cell, index) => {
        if (index > 0 && index < path.length - 1) {
          const x = gridStartX + cell.col * cellSize;
          const y = gridStartY + cell.row * cellSize;
          ctx.fillStyle = 'rgba(33, 150, 243, 0.6)';
          ctx.fillRect(x, y, cellSize, cellSize);

          if (index < path.length - 1) {
            const next = path[index + 1];
            const nextX = gridStartX + next.col * cellSize + cellSize / 2;
            const nextY = gridStartY + next.row * cellSize + cellSize / 2;
            const currX = x + cellSize / 2;
            const currY = y + cellSize / 2;

            ctx.strokeStyle = 'rgba(33, 150, 243, 0.8)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(currX, currY);
            ctx.lineTo(nextX, nextY);
            ctx.stroke();
          }
        }
      });

      walls.forEach((cell) => {
        const x = gridStartX + cell.col * cellSize;
        const y = gridStartY + cell.row * cellSize;
        ctx.fillStyle = 'rgba(33, 33, 33, 0.8)';
        ctx.fillRect(x, y, cellSize, cellSize);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, cellSize, cellSize);
      });

      const startX = gridStartX + startPos.col * cellSize;
      const startY = gridStartY + startPos.row * cellSize;
      ctx.fillStyle = 'rgba(76, 175, 80, 0.9)';
      ctx.fillRect(startX, startY, cellSize, cellSize);
      ctx.strokeStyle = 'rgba(56, 142, 60, 1)';
      ctx.lineWidth = 2;
      ctx.strokeRect(startX, startY, cellSize, cellSize);
      ctx.fillStyle = 'white';
      ctx.font = `bold ${Math.floor(cellSize * 0.6)}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('S', startX + cellSize / 2, startY + cellSize / 2);

      const endX = gridStartX + endPos.col * cellSize;
      const endY = gridStartY + endPos.row * cellSize;
      ctx.fillStyle = 'rgba(244, 67, 54, 0.9)';
      ctx.fillRect(endX, endY, cellSize, cellSize);
      ctx.strokeStyle = 'rgba(198, 40, 40, 1)';
      ctx.lineWidth = 2;
      ctx.strokeRect(endX, endY, cellSize, cellSize);
      ctx.fillStyle = 'white';
      ctx.fillText('E', endX + cellSize / 2, endY + cellSize / 2);

      const legendY = gridStartY + gridHeight + height * 0.04;
      const legendItems = [
        { color: 'rgba(76, 175, 80, 0.9)', label: '起點', x: width * 0.15 },
        { color: 'rgba(244, 67, 54, 0.9)', label: '終點', x: width * 0.35 },
        { color: 'rgba(33, 150, 243, 0.6)', label: '路徑', x: width * 0.55 },
        { color: 'rgba(76, 175, 80, 0.3)', label: '已探索', x: width * 0.75 },
      ];

      legendItems.forEach((item) => {
        ctx.fillStyle = item.color;
        ctx.fillRect(item.x - 20, legendY - 8, 16, 16);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(item.x - 20, legendY - 8, 16, 16);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = `${Math.floor(width / 60)}px "Microsoft YaHei", sans-serif`;
        ctx.textAlign = 'left';
        ctx.fillText(item.label, item.x + 2, legendY + 4);
      });
    }

    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(generate, 250);
    }

    generate();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return <canvas ref={canvasRef} width={800} height={400} />;
}

function SortingPreview() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let resizeTimer;

    function generate() {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const container = canvas.parentElement;
      const displayWidth = container.clientWidth || 800;
      const displayHeight =
        container.clientHeight || Math.floor((displayWidth * 9) / 16);

      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return;
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const width = displayWidth;
      const height = displayHeight;

      const bgGradient = ctx.createLinearGradient(0, 0, width, height);
      bgGradient.addColorStop(0, '#667eea');
      bgGradient.addColorStop(1, '#764ba2');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.font = `bold ${Math.floor(width / 25)}px "Microsoft YaHei", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('排序演算法視覺化', width / 2, height * 0.12);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = `${Math.floor(width / 45)}px "Microsoft YaHei", sans-serif`;
      ctx.fillText('5 種常見排序演算法', width / 2, height * 0.21);

      const arraySize = 12;
      const maxValue = 200;
      const array = Array.from({ length: arraySize }, (_, i) =>
        Math.floor(((i + 1) * maxValue) / arraySize),
      );

      const chartArea = {
        x: width * 0.1,
        y: height * 0.3,
        width: width * 0.8,
        height: height * 0.5,
      };

      const barWidth = chartArea.width / arraySize;
      const maxBarHeight = chartArea.height * 0.8;
      const spacing = barWidth * 0.1;
      const actualBarWidth = barWidth - spacing;

      array.forEach((value, index) => {
        const barHeight = (value / maxValue) * maxBarHeight;
        const x = chartArea.x + index * barWidth + spacing / 2;
        const y = chartArea.y + maxBarHeight - barHeight;

        const barGradient = ctx.createLinearGradient(x, y, x, y + barHeight);
        const hue = (index / arraySize) * 60 + 180;
        barGradient.addColorStop(0, `hsl(${hue}, 70%, 60%)`);
        barGradient.addColorStop(1, `hsl(${hue}, 70%, 45%)`);

        ctx.fillStyle = barGradient;
        ctx.fillRect(x, y, actualBarWidth, barHeight);

        if (width > 400) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.font = `bold ${Math.floor(width / 55)}px "Microsoft YaHei", sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText(value.toString(), x + actualBarWidth / 2, y - 5);
        }

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, actualBarWidth, barHeight);
      });

      const algorithms = ['冒泡', '快速', '歸併', '選擇', '插入'];
      const labelY = chartArea.y + maxBarHeight + height * 0.075;
      const labelSpacing = chartArea.width / algorithms.length;

      algorithms.forEach((name, index) => {
        const x = chartArea.x + index * labelSpacing + labelSpacing / 2;

        ctx.fillStyle = `hsl(${180 + index * 15}, 70%, 55%)`;
        ctx.beginPath();
        ctx.arc(x, labelY - height * 0.02, width * 0.015, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = `${Math.floor(width / 55)}px "Microsoft YaHei", sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(name, x, labelY + height * 0.03);
      });

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(chartArea.x, chartArea.y + maxBarHeight);
      ctx.lineTo(chartArea.x + chartArea.width, chartArea.y + maxBarHeight);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(generate, 250);
    }

    generate();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return <canvas ref={canvasRef} width={800} height={400} />;
}

function GreedyPreview() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let resizeTimer;

    function generate() {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const container = canvas.parentElement;
      const displayWidth = container.clientWidth || 800;
      const displayHeight =
        container.clientHeight || Math.floor((displayWidth * 9) / 16);

      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return;
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const width = displayWidth;
      const height = displayHeight;

      const bgGradient = ctx.createLinearGradient(0, 0, width, height);
      bgGradient.addColorStop(0, '#0f172a');
      bgGradient.addColorStop(1, '#1d4ed8');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(248, 250, 252, 0.96)';
      ctx.font = `bold ${Math.floor(width / 25)}px "Microsoft YaHei", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('貪婪演算法：活動選擇', width / 2, height * 0.16);

      ctx.fillStyle = 'rgba(226, 232, 240, 0.9)';
      ctx.font = `${Math.floor(width / 46)}px "Microsoft YaHei", sans-serif`;
      ctx.fillText('每次選擇「最早結束」且不衝突的活動', width / 2, height * 0.25);

      const axisMarginX = width * 0.1;
      const axisY = height * 0.55;
      const axisWidth = width * 0.8;
      const minTime = 0;
      const maxTime = 16;

      ctx.strokeStyle = 'rgba(148, 163, 184, 0.9)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(axisMarginX, axisY);
      ctx.lineTo(axisMarginX + axisWidth, axisY);
      ctx.stroke();

      ctx.font = `${Math.floor(width / 60)}px "Microsoft YaHei", sans-serif`;
      ctx.fillStyle = 'rgba(226, 232, 240, 0.9)';
      ctx.textAlign = 'center';

      for (let t = 0; t <= maxTime; t += 2) {
        const ratio = (t - minTime) / (maxTime - minTime);
        const x = axisMarginX + ratio * axisWidth;

        ctx.beginPath();
        ctx.moveTo(x, axisY - 6);
        ctx.lineTo(x, axisY + 6);
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.8)';
        ctx.stroke();

        ctx.fillText(String(t), x, axisY + height * 0.05);
      }

      const activities = [
        { id: 'A1', start: 1, end: 4, selected: true },
        { id: 'A2', start: 3, end: 5, selected: false },
        { id: 'A3', start: 0, end: 6, selected: false },
        { id: 'A4', start: 5, end: 7, selected: true },
        { id: 'A5', start: 3, end: 9, selected: false },
        { id: 'A6', start: 5, end: 9, selected: false },
        { id: 'A7', start: 6, end: 10, selected: false },
        { id: 'A8', start: 8, end: 11, selected: true },
        { id: 'A9', start: 8, end: 12, selected: false },
        { id: 'A10', start: 2, end: 14, selected: false },
        { id: 'A11', start: 12, end: 16, selected: true },
      ];

      let rowHeight = height * 0.03;
      let rowGap = height * 0.008;
      const firstRowY = axisY - height * 0.16;

      activities.forEach((act, index) => {
        const startRatio = (act.start - minTime) / (maxTime - minTime);
        const endRatio = (act.end - minTime) / (maxTime - minTime);
        const x = axisMarginX + startRatio * axisWidth;
        const w = Math.max((endRatio - startRatio) * axisWidth, width * 0.02);
        const y = firstRowY + index * (rowHeight + rowGap);

        const radius = rowHeight / 2;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + w - radius, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
        ctx.lineTo(x + w, y + rowHeight - radius);
        ctx.quadraticCurveTo(x + w, y + rowHeight, x + w - radius, y + rowHeight);
        ctx.lineTo(x + radius, y + rowHeight);
        ctx.quadraticCurveTo(x, y + rowHeight, x, y + rowHeight - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);

        if (act.selected) {
          const grad = ctx.createLinearGradient(x, y, x + w, y + rowHeight);
          grad.addColorStop(0, '#22c55e');
          grad.addColorStop(1, '#16a34a');
          ctx.fillStyle = grad;
        } else {
          const grad = ctx.createLinearGradient(x, y, x + w, y + rowHeight);
          grad.addColorStop(0, 'rgba(248, 113, 113, 0.7)');
          grad.addColorStop(1, 'rgba(239, 68, 68, 0.9)');
          ctx.fillStyle = grad;
        }
        ctx.fill();

        ctx.strokeStyle = act.selected
          ? 'rgba(34, 197, 94, 0.95)'
          : 'rgba(248, 113, 113, 0.95)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = 'rgba(15, 23, 42, 0.98)';
        ctx.font = `bold ${Math.floor(width / 60)}px "Microsoft YaHei", sans-serif`;
        ctx.textAlign = 'left';
        ctx.fillText(act.id, x + 6, y + rowHeight * 0.7);
      });

      const legendY = height * 0.88;
      const legendXStart = width * 0.18;
      const legendSpacing = width * 0.28;
      const boxSize = height * 0.035;

      if (typeof ctx.roundRect !== 'function') {
        // eslint-disable-next-line no-extend-native
        CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
          const radius = r || 5;
          this.beginPath();
          this.moveTo(x + radius, y);
          this.lineTo(x + w - radius, y);
          this.quadraticCurveTo(x + w, y, x + w, y + radius);
          this.lineTo(x + w, y + h - radius);
          this.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
          this.lineTo(x + radius, y + h);
          this.quadraticCurveTo(x, y + h, x, y + h - radius);
          this.lineTo(x, y + radius);
          this.quadraticCurveTo(x, y, x + radius, y);
          this.closePath();
        };
      }

      function drawLegendItem(x, color1, color2, text) {
        const grad = ctx.createLinearGradient(x, legendY, x + boxSize * 1.6, legendY + boxSize);
        grad.addColorStop(0, color1);
        grad.addColorStop(1, color2);
        ctx.fillStyle = grad;
        ctx.strokeStyle = 'rgba(15, 23, 42, 0.95)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(x, legendY, boxSize * 1.6, boxSize, boxSize / 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = 'rgba(226, 232, 240, 0.96)';
        ctx.font = `${Math.floor(width / 70)}px "Microsoft YaHei", sans-serif`;
        ctx.textAlign = 'left';
        ctx.fillText(text, x + boxSize * 1.8, legendY + boxSize * 0.75);
      }

      drawLegendItem(legendXStart, '#22c55e', '#16a34a', '被貪婪策略選中的活動');
      drawLegendItem(
        legendXStart + legendSpacing,
        'rgba(248, 113, 113, 0.7)',
        'rgba(239, 68, 68, 0.9)',
        '被捨棄的候選活動',
      );
    }

    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(generate, 250);
    }

    generate();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return <canvas ref={canvasRef} width={800} height={400} />;
}

function SidePanel() {
  return (
    <aside className="side-panel">
      <div className="side-title">所有演算法列表</div>
      <ul className="side-list">
        <li>
          <div className="side-bullet" />
          <div>
            <Link to="/algorithm/astar">A* 路徑搜尋演算法</Link>
            <div>啟發式最短路徑搜尋，適用於網格、地圖等場景。</div>
          </div>
        </li>
        <li>
          <div className="side-bullet" />
          <div>
            <Link to="/algorithm/sorting">排序演算法視覺化</Link>
            <div>冒泡、快速、歸併、選擇、插入等常見排序的比較與動畫演示。</div>
          </div>
        </li>
        <li>
          <div className="side-bullet" />
          <div>
            <Link to="/algorithm/greedy">貪婪演算法與經典問題</Link>
            <div>以活動選擇、找零等範例說明「當前最佳」策略何時能得到全域最佳解。</div>
          </div>
        </li>
      </ul>
      <div className="side-footer">
        從右側面板可快速切換到不同演算法說明頁，方便教學與練習。
      </div>
    </aside>
  );
}

export default function AlgorithmLab() {
  const { theme, setTheme } = useTheme();

  const navigate = useNavigate();

  const aStarHandlers = createCardHandlers('/algorithm/astar', navigate);
  const sortingHandlers = createCardHandlers('/algorithm/sorting', navigate);
  const greedyHandlers = createCardHandlers('/algorithm/greedy', navigate);

  return (
    <div className="page">
      <header>
        <div className="title-group">
          <Link className="back-link" to="/">← 回首頁</Link>
          <h1>Code Lab Notes · 演算法視覺化實驗室</h1>
          <p className="subtitle">
            透過互動式網頁與圖像，直觀理解 A* 等路徑搜尋演算法的運作方式。下方可前往各個演算法說明頁面。
          </p>
        </div>
        <div className="theme-toggle" role="group" aria-label="色彩主題切換">
          <button
            type="button"
            className={`theme-button ${theme === 'dark' ? 'active' : ''}`}
            data-theme="dark"
            aria-pressed={theme === 'dark'}
            onClick={() => setTheme('dark')}
          >
            暗色
          </button>
          <button
            type="button"
            className={`theme-button ${theme === 'light' ? 'active' : ''}`}
            data-theme="light"
            aria-pressed={theme === 'light'}
            onClick={() => setTheme('light')}
          >
            亮色
          </button>
        </div>
      </header>

      <main>
        <div className="algorithms-grid">
          <h2 className="section-title">演算法列表</h2>
          <section
            className="card"
            data-href="src/astar-algorithm-explanation.html"
            tabIndex={0}
            role="link"
            onClick={aStarHandlers.handleClick}
            onKeyDown={aStarHandlers.handleKeyDown}
          >
            <div className="card-header">
              <div>
                <div className="card-title">A*（A-star）路徑搜尋演算法</div>
                <div className="chip-row">
                  <div className="chip">Pathfinding</div>
                  <div className="chip">Heuristic Search</div>
                  <div className="chip">Grid Visualization</div>
                </div>
              </div>
            </div>

            <div className="preview">
              <Link to="/algorithm/astar" aria-label="前往 A* 演算法說明頁">
                <AStarPreview />
              </Link>
            </div>

            <div className="card-footer">
              <p className="description">
                透過網格地圖、起點與終點、障礙物與已探索節點的視覺化標記，觀察 A* 如何在考量實際距離與啟發式估計的情況下，
                漸進式逼近最短路徑。
              </p>
            </div>

            <div className="card-footer">
              <Link className="primary-action" to="/algorithm/astar">
                <span className="icon">▶</span>
                <span>開始體驗 A* 說明</span>
              </Link>
              <div className="secondary-links">
                <Link to="/algorithm/astar">演算法詳解</Link>
              </div>
            </div>
          </section>

          <section
            className="card"
            data-href="src/sorting-algorithms.html"
            tabIndex={0}
            role="link"
            onClick={sortingHandlers.handleClick}
            onKeyDown={sortingHandlers.handleKeyDown}
          >
            <div className="card-header">
              <div>
                <div className="card-title">排序演算法視覺化</div>
                <div className="chip-row">
                  <div className="chip">Sorting</div>
                  <div className="chip">Interactive Demo</div>
                  <div className="chip">Visualization</div>
                </div>
              </div>
            </div>

            <div className="preview">
              <Link
                to="/algorithm/sorting"
                aria-label="前往排序演算法說明頁"
              >
                <SortingPreview />
              </Link>
            </div>

            <div className="card-footer">
              <p className="description">
                包含冒泡排序、快速排序、歸併排序、選擇排序、插入排序等五種常見排序演算法的互動式視覺化演示，
                每個演算法都包含詳細說明、時間複雜度分析和程式碼實作。
              </p>
            </div>

            <div className="card-footer">
              <Link className="primary-action" to="/algorithm/sorting">
                <span className="icon">▶</span>
                <span>開始體驗排序演算法</span>
              </Link>
              <div className="secondary-links">
                <Link to="/algorithm/sorting#comparison-section">
                  演算法比較
                </Link>
              </div>
            </div>
          </section>

          <section
            className="card"
            data-href="src/greedy-algorithms.html"
            tabIndex={0}
            role="link"
            onClick={greedyHandlers.handleClick}
            onKeyDown={greedyHandlers.handleKeyDown}
          >
            <div className="card-header">
              <div>
                <div className="card-title">貪婪演算法與經典範例</div>
                <div className="chip-row">
                  <div className="chip">Greedy</div>
                  <div className="chip">Optimization</div>
                  <div className="chip">Interval Scheduling</div>
                </div>
              </div>
            </div>

            <div className="preview">
              <Link
                to="/algorithm/greedy"
                aria-label="前往貪婪演算法說明頁"
              >
                <GreedyPreview />
              </Link>
            </div>

            <div className="card-footer">
              <p className="description">
                透過活動選擇、找零等經典問題，觀察「每一步做出當前最佳選擇」的貪婪策略如何快速構造近似或最優解，
                並比較與動態規劃等方法在思維上的差異。
              </p>
            </div>

            <div className="card-footer">
              <Link className="primary-action" to="/algorithm/greedy">
                <span className="icon">▶</span>
                <span>開始體驗貪婪演算法</span>
              </Link>
              <div className="secondary-links">
                <Link to="/algorithm/greedy">演算法詳解</Link>
              </div>
            </div>
          </section>
        </div>

        <SidePanel />
      </main>
    </div>
  );
}

