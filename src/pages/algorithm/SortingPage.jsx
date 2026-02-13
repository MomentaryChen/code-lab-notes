import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SortingPage() {
  useEffect(() => {
    function generateRandomArray(size = 10, min = 10, max = 200) {
      return Array.from({ length: size }, () =>
        Math.floor(Math.random() * (max - min + 1)) + min,
      );
    }

    function renderArray(displayId, arr, highlights = {}) {
      const display = document.getElementById(displayId);
      if (!display) return;
      display.innerHTML = '';
      const maxHeight = Math.max(...arr);

      arr.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(value / maxHeight) * 100}%`;
        bar.textContent = value;

        if (highlights.comparing && highlights.comparing.includes(index)) {
          bar.classList.add('comparing');
        }
        if (highlights.swapping && highlights.swapping.includes(index)) {
          bar.classList.add('swapping');
        }
        if (highlights.sorted && highlights.sorted.includes(index)) {
          bar.classList.add('sorted');
        }

        display.appendChild(bar);
      });
    }

    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // Bubble sort
    let bubbleArray = [];
    let bubbleSorting = false;

    function initBubbleSort() {
      bubbleArray = generateRandomArray(12);
      renderArray('bubble-display', bubbleArray);
      const info = document.getElementById('bubble-info');
      if (info) {
        info.innerHTML =
          '<p>陣列已生成，點擊「開始排序」觀看動畫演示。</p>';
      }
    }

    async function startBubbleSort() {
      if (bubbleSorting) return;
      bubbleSorting = true;
      const info = document.getElementById('bubble-info');
      const arr = [...bubbleArray];
      const n = arr.length;
      let comparisons = 0;
      let swaps = 0;

      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          comparisons++;
          renderArray('bubble-display', arr, {
            comparing: [j, j + 1],
            sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
          });
          if (info) {
            info.innerHTML = `<p>比較次數: ${comparisons} | 交換次數: ${swaps} | 比較元素: ${arr[j]} 和 ${arr[j + 1]}</p>`;
          }
          await delay(300);

          if (arr[j] > arr[j + 1]) {
            swaps++;
            renderArray('bubble-display', arr, {
              swapping: [j, j + 1],
              sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
            });
            await delay(200);
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }
        }
      }

      renderArray('bubble-display', arr, {
        sorted: arr.map((_, i) => i),
      });
      if (info) {
        info.innerHTML = `<p><strong>排序完成！</strong> 總比較次數: ${comparisons} | 總交換次數: ${swaps}</p>`;
      }
      bubbleSorting = false;
    }

    function resetBubbleSort() {
      bubbleSorting = false;
      initBubbleSort();
    }

    // Quick sort
    let quickArray = [];
    let quickSorting = false;

    function initQuickSort() {
      quickArray = generateRandomArray(12);
      renderArray('quick-display', quickArray);
      const info = document.getElementById('quick-info');
      if (info) {
        info.innerHTML =
          '<p>陣列已生成，點擊「開始排序」觀看動畫演示。</p>';
      }
    }

    async function quickSortVisual(arr, left, right, displayId, infoId) {
      if (left >= right) return;

      const pivot = arr[right];
      let i = left - 1;

      for (let j = left; j < right; j++) {
        renderArray(displayId, arr, {
          comparing: [j, right],
          swapping: i >= left ? [i] : [],
        });
        const info = document.getElementById(infoId);
        if (info) {
          info.innerHTML = `<p>選擇基準: ${pivot} | 比較元素: ${arr[j]} 與基準</p>`;
        }
        await delay(400);

        if (arr[j] < pivot) {
          i++;
          if (i !== j) {
            renderArray(displayId, arr, { swapping: [i, j] });
            await delay(300);
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
        }
      }

      [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
      renderArray(displayId, arr, { swapping: [i + 1, right] });
      await delay(300);

      await quickSortVisual(arr, left, i, displayId, infoId);
      await quickSortVisual(arr, i + 2, right, displayId, infoId);
    }

    async function startQuickSort() {
      if (quickSorting) return;
      quickSorting = true;
      const arr = [...quickArray];
      await quickSortVisual(
        arr,
        0,
        arr.length - 1,
        'quick-display',
        'quick-info',
      );
      renderArray('quick-display', arr, {
        sorted: arr.map((_, i) => i),
      });
      const info = document.getElementById('quick-info');
      if (info) {
        info.innerHTML = '<p><strong>排序完成！</strong></p>';
      }
      quickSorting = false;
    }

    function resetQuickSort() {
      quickSorting = false;
      initQuickSort();
    }

    // Merge sort
    let mergeArray = [];
    let mergeSorting = false;

    function initMergeSort() {
      mergeArray = generateRandomArray(12);
      renderArray('merge-display', mergeArray);
      const info = document.getElementById('merge-info');
      if (info) {
        info.innerHTML =
          '<p>陣列已生成，點擊「開始排序」觀看動畫演示。</p>';
      }
    }

    async function mergeSortVisual(
      arr,
      left,
      right,
      displayId,
      infoId,
    ) {
      if (left >= right) return;

      const mid = Math.floor((left + right) / 2);
      await mergeSortVisual(arr, left, mid, displayId, infoId);
      await mergeSortVisual(arr, mid + 1, right, displayId, infoId);

      const leftArr = arr.slice(left, mid + 1);
      const rightArr = arr.slice(mid + 1, right + 1);

      let i = 0;
      let j = 0;
      let k = left;

      while (i < leftArr.length && j < rightArr.length) {
        renderArray(displayId, arr, {
          comparing: [left + i, mid + 1 + j],
        });
        const info = document.getElementById(infoId);
        if (info) {
          info.innerHTML = `<p>合併階段 | 比較: ${leftArr[i]} 和 ${rightArr[j]}</p>`;
        }
        await delay(400);

        if (leftArr[i] <= rightArr[j]) {
          arr[k++] = leftArr[i++];
        } else {
          arr[k++] = rightArr[j++];
        }
        renderArray(displayId, arr);
        await delay(200);
      }

      while (i < leftArr.length) {
        arr[k++] = leftArr[i++];
        renderArray(displayId, arr);
        await delay(200);
      }

      while (j < rightArr.length) {
        arr[k++] = rightArr[j++];
        renderArray(displayId, arr);
        await delay(200);
      }
    }

    async function startMergeSort() {
      if (mergeSorting) return;
      mergeSorting = true;
      const arr = [...mergeArray];
      await mergeSortVisual(
        arr,
        0,
        arr.length - 1,
        'merge-display',
        'merge-info',
        mergeArray,
      );
      renderArray('merge-display', arr, {
        sorted: arr.map((_, i) => i),
      });
      const info = document.getElementById('merge-info');
      if (info) {
        info.innerHTML = '<p><strong>排序完成！</strong></p>';
      }
      mergeSorting = false;
    }

    function resetMergeSort() {
      mergeSorting = false;
      initMergeSort();
    }

    // Selection sort
    let selectionArray = [];
    let selectionSorting = false;

    function initSelectionSort() {
      selectionArray = generateRandomArray(12);
      renderArray('selection-display', selectionArray);
      const info = document.getElementById('selection-info');
      if (info) {
        info.innerHTML =
          '<p>陣列已生成，點擊「開始排序」觀看動畫演示。</p>';
      }
    }

    async function startSelectionSort() {
      if (selectionSorting) return;
      selectionSorting = true;
      const arr = [...selectionArray];
      const n = arr.length;
      const info = document.getElementById('selection-info');
      let comparisons = 0;
      let swaps = 0;

      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;

        for (let j = i + 1; j < n; j++) {
          comparisons++;
          renderArray('selection-display', arr, {
            comparing: [j, minIdx],
            sorted: Array.from({ length: i }, (_, k) => k),
          });
          if (info) {
            info.innerHTML = `<p>比較次數: ${comparisons} | 交換次數: ${swaps} | 尋找最小值</p>`;
          }
          await delay(300);

          if (arr[j] < arr[minIdx]) {
            minIdx = j;
          }
        }

        if (minIdx !== i) {
          swaps++;
          renderArray('selection-display', arr, {
            swapping: [i, minIdx],
            sorted: Array.from({ length: i }, (_, k) => k),
          });
          await delay(300);
          [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
      }

      renderArray('selection-display', arr, {
        sorted: arr.map((_, i) => i),
      });
      if (info) {
        info.innerHTML = `<p><strong>排序完成！</strong> 總比較次數: ${comparisons} | 總交換次數: ${swaps}</p>`;
      }
      selectionSorting = false;
    }

    function resetSelectionSort() {
      selectionSorting = false;
      initSelectionSort();
    }

    // Insertion sort
    let insertionArray = [];
    let insertionSorting = false;

    function initInsertionSort() {
      insertionArray = generateRandomArray(12);
      renderArray('insertion-display', insertionArray);
      const info = document.getElementById('insertion-info');
      if (info) {
        info.innerHTML =
          '<p>陣列已生成，點擊「開始排序」觀看動畫演示。</p>';
      }
    }

    async function startInsertionSort() {
      if (insertionSorting) return;
      insertionSorting = true;
      const arr = [...insertionArray];
      const info = document.getElementById('insertion-info');
      let comparisons = 0;
      let shifts = 0;

      for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;

        renderArray('insertion-display', arr, {
          comparing: [i],
          sorted: Array.from({ length: i }, (_, k) => k),
        });
        if (info) {
          info.innerHTML = `<p>插入元素: ${key} | 比較次數: ${comparisons} | 移動次數: ${shifts}</p>`;
        }
        await delay(400);

        while (j >= 0 && arr[j] > key) {
          comparisons++;
          renderArray('insertion-display', arr, {
            comparing: [j, j + 1],
            sorted: Array.from({ length: i }, (_, k) => k),
          });
          await delay(300);

          arr[j + 1] = arr[j];
          shifts++;
          j--;
          renderArray('insertion-display', arr);
          await delay(200);
        }

        arr[j + 1] = key;
        renderArray('insertion-display', arr, {
          sorted: Array.from({ length: i + 1 }, (_, k) => k),
        });
        await delay(300);
      }

      renderArray('insertion-display', arr, {
        sorted: arr.map((_, i) => i),
      });
      if (info) {
        info.innerHTML = `<p><strong>排序完成！</strong> 總比較次數: ${comparisons} | 總移動次數: ${shifts}</p>`;
      }
      insertionSorting = false;
    }

    function resetInsertionSort() {
      insertionSorting = false;
      initInsertionSort();
    }

    // 初始化所有排序
    initBubbleSort();
    initQuickSort();
    initMergeSort();
    initSelectionSort();
    initInsertionSort();

    // 綁定按鈕
    const bubbleInitBtn = document.querySelector(
      'button[data-action="bubble-init"]',
    );
    const bubbleStartBtn = document.querySelector(
      'button[data-action="bubble-start"]',
    );
    const bubbleResetBtn = document.querySelector(
      'button[data-action="bubble-reset"]',
    );

    const quickInitBtn = document.querySelector(
      'button[data-action="quick-init"]',
    );
    const quickStartBtn = document.querySelector(
      'button[data-action="quick-start"]',
    );
    const quickResetBtn = document.querySelector(
      'button[data-action="quick-reset"]',
    );

    const mergeInitBtn = document.querySelector(
      'button[data-action="merge-init"]',
    );
    const mergeStartBtn = document.querySelector(
      'button[data-action="merge-start"]',
    );
    const mergeResetBtn = document.querySelector(
      'button[data-action="merge-reset"]',
    );

    const selInitBtn = document.querySelector(
      'button[data-action="selection-init"]',
    );
    const selStartBtn = document.querySelector(
      'button[data-action="selection-start"]',
    );
    const selResetBtn = document.querySelector(
      'button[data-action="selection-reset"]',
    );

    const insInitBtn = document.querySelector(
      'button[data-action="insertion-init"]',
    );
    const insStartBtn = document.querySelector(
      'button[data-action="insertion-start"]',
    );
    const insResetBtn = document.querySelector(
      'button[data-action="insertion-reset"]',
    );

    if (bubbleInitBtn)
      bubbleInitBtn.addEventListener('click', initBubbleSort);
    if (bubbleStartBtn)
      bubbleStartBtn.addEventListener('click', startBubbleSort);
    if (bubbleResetBtn)
      bubbleResetBtn.addEventListener('click', resetBubbleSort);

    if (quickInitBtn)
      quickInitBtn.addEventListener('click', initQuickSort);
    if (quickStartBtn)
      quickStartBtn.addEventListener('click', startQuickSort);
    if (quickResetBtn)
      quickResetBtn.addEventListener('click', resetQuickSort);

    if (mergeInitBtn)
      mergeInitBtn.addEventListener('click', initMergeSort);
    if (mergeStartBtn)
      mergeStartBtn.addEventListener('click', startMergeSort);
    if (mergeResetBtn)
      mergeResetBtn.addEventListener('click', resetMergeSort);

    if (selInitBtn)
      selInitBtn.addEventListener('click', initSelectionSort);
    if (selStartBtn)
      selStartBtn.addEventListener('click', startSelectionSort);
    if (selResetBtn)
      selResetBtn.addEventListener('click', resetSelectionSort);

    if (insInitBtn)
      insInitBtn.addEventListener('click', initInsertionSort);
    if (insStartBtn)
      insStartBtn.addEventListener('click', startInsertionSort);
    if (insResetBtn)
      insResetBtn.addEventListener('click', resetInsertionSort);

    // 浮動按鈕
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
      if (bubbleInitBtn)
        bubbleInitBtn.removeEventListener('click', initBubbleSort);
      if (bubbleStartBtn)
        bubbleStartBtn.removeEventListener('click', startBubbleSort);
      if (bubbleResetBtn)
        bubbleResetBtn.removeEventListener('click', resetBubbleSort);

      if (quickInitBtn)
        quickInitBtn.removeEventListener('click', initQuickSort);
      if (quickStartBtn)
        quickStartBtn.removeEventListener('click', startQuickSort);
      if (quickResetBtn)
        quickResetBtn.removeEventListener('click', resetQuickSort);

      if (mergeInitBtn)
        mergeInitBtn.removeEventListener('click', initMergeSort);
      if (mergeStartBtn)
        mergeStartBtn.removeEventListener('click', startMergeSort);
      if (mergeResetBtn)
        mergeResetBtn.removeEventListener('click', resetMergeSort);

      if (selInitBtn)
        selInitBtn.removeEventListener('click', initSelectionSort);
      if (selStartBtn)
        selStartBtn.removeEventListener('click', startSelectionSort);
      if (selResetBtn)
        selResetBtn.removeEventListener('click', resetSelectionSort);

      if (insInitBtn)
        insInitBtn.removeEventListener('click', initInsertionSort);
      if (insStartBtn)
        insStartBtn.removeEventListener('click', startInsertionSort);
      if (insResetBtn)
        insResetBtn.removeEventListener('click', resetInsertionSort);

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
        :root {
          --primary: #667eea;
          --secondary: #764ba2;
          --accent: #f093fb;
          --bg-light: #f8f9fa;
          --text-dark: #333;
          --text-light: #666;
          --border: #e0e0e0;
          --success: #22c55e;
          --warning: #f59e0b;
          --danger: #ef4444;
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", sans-serif;
          line-height: 1.6;
          color: var(--text-dark);
          background: radial-gradient(circle at top left, #1d283a, #020617 55%);
          padding: 20px;
          min-height: 100vh;
        }
        .container {
          max-width: 1400px;
          margin: 0 auto;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          padding: 40px;
          box-sizing: border-box;
        }
        .header {
          text-align: center;
          margin-bottom: 32px;
        }
        h1 {
          color: var(--primary);
          margin-bottom: 8px;
          font-size: 2.4em;
          letter-spacing: 0.02em;
        }
        .subtitle {
          color: var(--text-light);
          font-size: 1.1em;
        }
        .back-link {
          display: inline-block;
          margin-bottom: 20px;
          color: var(--primary);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }
        .back-link:hover {
          color: var(--secondary);
        }
        .algorithm-section {
          margin-bottom: 50px;
          padding: 30px;
          background: var(--bg-light);
          border-radius: 12px;
          border-left: 5px solid var(--primary);
        }
        h2 {
          color: var(--secondary);
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 3px solid var(--primary);
          font-size: 1.8em;
        }
        h3 {
          color: var(--text-dark);
          margin-top: 25px;
          margin-bottom: 15px;
          font-size: 1.4em;
        }
        .complexity-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .complexity-table th,
        .complexity-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid var(--border);
        }
        .complexity-table th {
          background: var(--primary);
          color: white;
          font-weight: 600;
        }
        .complexity-table tr:hover {
          background: #f0f0f0;
        }
        .visualization-container {
          margin: 24px 0;
          padding: 0;
          width: 100%;
          max-width: 100%;
          background: linear-gradient(180deg, rgba(102, 126, 234, 0.06) 0%, rgba(118, 75, 162, 0.04) 100%);
          border-radius: 12px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          overflow: hidden;
          box-sizing: border-box;
        }
        .visualization-container .demo-header {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 20px;
          background: white;
          border-bottom: 1px solid var(--border);
          box-sizing: border-box;
        }
        .visualization-container .demo-header h3 {
          margin: 0;
          font-size: 1.1em;
        }
        .visualization-container .controls {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
          margin: 0;
        }
        button {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s;
        }
        .btn-primary {
          background: var(--primary);
          color: white;
        }
        .btn-primary:hover {
          background: var(--secondary);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        .btn-secondary {
          background: #6c757d;
          color: white;
        }
        .btn-secondary:hover {
          background: #5a6268;
        }
        .btn-success {
          background: var(--success);
          color: white;
        }
        .btn-danger {
          background: var(--danger);
          color: white;
        }
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .array-display {
          display: flex;
          align-items: flex-end;
          gap: 6px;
          width: 100%;
          height: 280px;
          padding: 20px;
          background: linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          margin: 0;
          box-sizing: border-box;
        }
        .array-display .bar {
          flex: 1;
          min-width: 0;
          background: linear-gradient(180deg, var(--primary), var(--secondary));
          border-radius: 6px 6px 0 0;
          transition: transform 0.25s ease, background 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
          padding-bottom: 4px;
          box-shadow: 0 -2px 12px rgba(102, 126, 234, 0.35);
          box-sizing: border-box;
        }
        .bar.comparing {
          background: linear-gradient(180deg, #fbbf24, #f59e0b);
          box-shadow: 0 -4px 20px rgba(245, 158, 11, 0.5);
          transform: scaleY(1.08);
        }
        .bar.sorted {
          background: linear-gradient(180deg, #34d399, #22c55e);
          box-shadow: 0 -2px 12px rgba(34, 197, 94, 0.4);
        }
        .bar.swapping {
          background: linear-gradient(180deg, #f87171, #ef4444);
          box-shadow: 0 -4px 20px rgba(239, 68, 68, 0.5);
          animation: barPulse 0.4s ease;
        }
        @keyframes barPulse {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.12); }
        }
        .info-panel {
          background: white;
          padding: 16px 20px;
          border-radius: 0 0 12px 12px;
          margin: 0;
          border-left: 4px solid var(--primary);
        }
        .info-panel p {
          margin: 8px 0;
          color: var(--text-dark);
        }
        .code-block {
          background: #2d2d2d;
          color: #f8f8f2;
          padding: 20px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 20px 0;
          font-family: 'Consolas', 'Monaco', monospace;
          font-size: 14px;
          line-height: 1.5;
        }
        .code-block .keyword {
          color: #c678dd;
        }
        .code-block .function {
          color: #61afef;
        }
        .code-block .string {
          color: #98c379;
        }
        .code-block .comment {
          color: #5c6370;
          font-style: italic;
        }
        .step-list {
          list-style: none;
          padding-left: 0;
        }
        .step-list li {
          padding: 12px;
          margin: 8px 0;
          background: white;
          border-radius: 6px;
          border-left: 4px solid var(--primary);
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .step-list li::before {
          content: "→ ";
          color: var(--primary);
          font-weight: bold;
          margin-right: 8px;
        }
        .comparison-section {
          margin-top: 40px;
          padding: 30px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
          border-radius: 12px;
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
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
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
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
        }
        .float-btn.top-btn {
          background: linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%);
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
          .visualization-container .demo-header {
            padding: 12px 16px;
          }
          .controls {
            flex-direction: row;
            width: 100%;
            justify-content: flex-start;
          }
          button {
            flex: 1;
            min-width: 0;
          }
          .array-display {
            height: 220px;
            padding: 12px;
            gap: 4px;
          }
          .array-display .bar {
            font-size: 10px;
          }
          .bar {
            font-size: 10px;
            padding-bottom: 4px;
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
        <Link to="/algorithm/lab" className="back-link">
          ← 回演算法列表
        </Link>

        <div className="header">
          <h1>排序演算法視覺化</h1>
          <p className="subtitle">透過互動式演示理解各種排序演算法的運作原理</p>
        </div>

        {/* 冒泡排序 */}
        <div className="algorithm-section">
          <h2>1. 冒泡排序 (Bubble Sort)</h2>

          <h3>演算法原理</h3>
          <p>
            冒泡排序是一種簡單的排序演算法，它重複地遍歷要排序的數列，一次比較兩個元素，如果它們的順序錯誤就把它們交換過來。遍歷數列的工作是重複地進行直到沒有再需要交換，也就是說該數列已經排序完成。
          </p>

          <h3>時間複雜度</h3>
          <table className="complexity-table">
            <tbody>
              <tr>
                <th>情況</th>
                <th>時間複雜度</th>
              </tr>
              <tr>
                <td>最佳情況</td>
                <td>O(n)</td>
              </tr>
              <tr>
                <td>平均情況</td>
                <td>O(n²)</td>
              </tr>
              <tr>
                <td>最壞情況</td>
                <td>O(n²)</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>空間複雜度：</strong>O(1)
          </p>

          <h3>步驟說明</h3>
          <ol className="step-list">
            <li>比較相鄰的元素。如果第一個比第二個大，就交換它們兩個。</li>
            <li>
              對每一對相鄰元素做同樣的工作，從開始第一對到結尾的最後一對。這步做完後，最後的元素會是最大的數。
            </li>
            <li>針對所有的元素重複以上的步驟，除了最後一個。</li>
            <li>
              持續每次對越來越少的元素重複上面的步驟，直到沒有任何一對數字需要比較。
            </li>
          </ol>

          <div className="visualization-container">
            <div className="demo-header">
              <h3>互動演示</h3>
              <div className="controls">
                <button className="btn-primary" data-action="bubble-init">生成新陣列</button>
                <button className="btn-success" data-action="bubble-start">開始排序</button>
                <button className="btn-secondary" data-action="bubble-reset">重置</button>
              </div>
            </div>
            <div id="bubble-display" className="array-display" />
            <div id="bubble-info" className="info-panel">
              <p>點擊「生成新陣列」開始，然後點擊「開始排序」觀看動畫演示。</p>
            </div>
          </div>
        </div>

        {/* 2. 快速排序 */}
        <div className="algorithm-section">
          <h2>2. 快速排序 (Quick Sort)</h2>

          <h3>演算法原理</h3>
          <p>
            快速排序是一種典型的分治演算法。從數列中選出一個元素作為「基準」（pivot），
            將比基準小的元素移到左邊，比基準大的移到右邊，形成「左子列 + 基準 + 右子列」，
            然後對左右子列各自遞迴地執行同樣過程。
          </p>

          <h3>時間複雜度</h3>
          <table className="complexity-table">
            <tbody>
              <tr>
                <th>情況</th>
                <th>時間複雜度</th>
              </tr>
              <tr>
                <td>最佳情況</td>
                <td>O(n log n)</td>
              </tr>
              <tr>
                <td>平均情況</td>
                <td>O(n log n)</td>
              </tr>
              <tr>
                <td>最壞情況</td>
                <td>O(n²)</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>空間複雜度：</strong>O(log n)
          </p>

          <h3>步驟說明</h3>
          <ol className="step-list">
            <li>選擇一個基準元素（常見做法是取最右邊的元素）。</li>
            <li>將數列重新排列，使得比基準小的元素都放在左邊，比基準大的元素放在右邊。</li>
            <li>遞迴地對基準左邊與右邊的子數列重複上述步驟。</li>
          </ol>

          <div className="visualization-container">
            <div className="demo-header">
              <h3>互動演示</h3>
              <div className="controls">
                <button className="btn-primary" data-action="quick-init">生成新陣列</button>
                <button className="btn-success" data-action="quick-start">開始排序</button>
                <button className="btn-secondary" data-action="quick-reset">重置</button>
              </div>
            </div>
            <div id="quick-display" className="array-display" />
            <div id="quick-info" className="info-panel">
              <p>點擊「生成新陣列」開始，然後點擊「開始排序」觀看動畫演示。</p>
            </div>
          </div>

          <h3>程式碼實作</h3>
          <div className="code-block">
            <span className="keyword">function</span>{' '}
            <span className="function">quickSort</span>(arr, left = 0, right =
            {' '}
            {`arr.length - 1`}) {'{'}
            <br />
            &nbsp;&nbsp;
            <span className="keyword">if</span> (left &lt; right) {'{'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="keyword">let</span> pivotIndex ={' '}
            <span className="function">partition</span>(arr, left, right);
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="function">quickSort</span>(arr, left, pivotIndex -
            1);
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="function">quickSort</span>(arr, pivotIndex + 1,
            right);
            <br />
            &nbsp;&nbsp;{'}'}
            <br />
            &nbsp;&nbsp;
            <span className="keyword">return</span> arr;
            <br />
            {'}'}
            <br />
            <br />
            <span className="keyword">function</span>{' '}
            <span className="function">partition</span>(arr, left, right)
            {' {'}
            <br />
            &nbsp;&nbsp;
            <span className="keyword">let</span> pivot = arr[right];
            <br />
            &nbsp;&nbsp;
            <span className="keyword">let</span> i = left - 1;
            <br />
            &nbsp;&nbsp;
            <span className="keyword">for</span> (
            <span className="keyword">let</span> j = left; j &lt; right; j++)
            {' {'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="keyword">if</span> (arr[j] &lt; pivot) {'{'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i++;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[arr[i], arr[j]] = [arr[j],
            arr[i]];
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{'}'}
            <br />
            &nbsp;&nbsp;{'}'}
            <br />
            &nbsp;&nbsp;[arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
            <br />
            &nbsp;&nbsp;
            <span className="keyword">return</span> i + 1;
            <br />
            {'}'}
          </div>
        </div>

        {/* 3. 歸併排序 */}
        <div className="algorithm-section">
          <h2>3. 歸併排序 (Merge Sort)</h2>

          <h3>演算法原理</h3>
          <p>
            歸併排序採用分治法，先將數列不斷對半拆分，直到每個子數列長度為 1，
            再將兩兩有序的子數列「合併」成更大的有序數列，最終得到完全排序好的結果。
          </p>

          <h3>時間複雜度</h3>
          <table className="complexity-table">
            <tbody>
              <tr>
                <th>情況</th>
                <th>時間複雜度</th>
              </tr>
              <tr>
                <td>最佳情況</td>
                <td>O(n log n)</td>
              </tr>
              <tr>
                <td>平均情況</td>
                <td>O(n log n)</td>
              </tr>
              <tr>
                <td>最壞情況</td>
                <td>O(n log n)</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>空間複雜度：</strong>O(n)
          </p>

          <h3>步驟說明</h3>
          <ol className="step-list">
            <li>將數列不斷對半拆分，直到每個子數列只剩一個元素。</li>
            <li>自底向上，將兩個已排序的子數列合併成一個新的有序數列。</li>
            <li>重複合併步驟，直到只剩下一個完整有序數列。</li>
          </ol>

          <div className="visualization-container">
            <div className="demo-header">
              <h3>互動演示</h3>
              <div className="controls">
                <button className="btn-primary" data-action="merge-init">生成新陣列</button>
                <button className="btn-success" data-action="merge-start">開始排序</button>
                <button className="btn-secondary" data-action="merge-reset">重置</button>
              </div>
            </div>
            <div id="merge-display" className="array-display" />
            <div id="merge-info" className="info-panel">
              <p>點擊「生成新陣列」開始，然後點擊「開始排序」觀看動畫演示。</p>
            </div>
          </div>

          <h3>程式碼實作</h3>
          <div className="code-block">
            <span className="keyword">function</span>{' '}
            <span className="function">mergeSort</span>(arr) {'{'}
            <br />
            &nbsp;&nbsp;
            <span className="keyword">if</span> (arr.length &lt;= 1) {'{'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="keyword">return</span> arr;
            <br />
            &nbsp;&nbsp;{'}'}
            <br />
            &nbsp;&nbsp;
            <span className="keyword">let</span> mid = Math.floor(arr.length / 2);
            <br />
            &nbsp;&nbsp;
            <span className="keyword">let</span> left ={' '}
            <span className="function">mergeSort</span>(arr.slice(0, mid));
            <br />
            &nbsp;&nbsp;
            <span className="keyword">let</span> right ={' '}
            <span className="function">mergeSort</span>(arr.slice(mid));
            <br />
            &nbsp;&nbsp;
            <span className="keyword">return</span>{' '}
            <span className="function">merge</span>(left, right);
            <br />
            {'}'}
            <br />
            <br />
            <span className="keyword">function</span>{' '}
            <span className="function">merge</span>(left, right) {'{'}
            <br />
            &nbsp;&nbsp;
            <span className="keyword">let</span> result = [];
            <br />
            &nbsp;&nbsp;
            <span className="keyword">let</span> i = 0, j = 0;
            <br />
            &nbsp;&nbsp;
            <span className="keyword">while</span> (i &lt; left.length &amp;&amp; j &lt;
            right.length) {'{'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="keyword">if</span> (left[i] &lt;= right[j]) {'{'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result.push(left[i++]);
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{'}'}{' '}
            <span className="keyword">else</span> {'{'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result.push(right[j++]);
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{'}'}
            <br />
            &nbsp;&nbsp;{'}'}
            <br />
            &nbsp;&nbsp;
            <span className="keyword">return</span> result
            {`.concat(left.slice(i)).concat(right.slice(j));`}
            <br />
            {'}'}
          </div>
        </div>

        {/* 4. 選擇排序 */}
        <div className="algorithm-section">
          <h2>4. 選擇排序 (Selection Sort)</h2>

          <h3>演算法原理</h3>
          <p>
            每一輪在未排序區間中找出最小值（或最大值），然後與當前位置元素交換，
            逐步擴大已排序區間，直到整個數列有序。
          </p>

          <h3>時間複雜度</h3>
          <table className="complexity-table">
            <tbody>
              <tr>
                <th>情況</th>
                <th>時間複雜度</th>
              </tr>
              <tr>
                <td>最佳情況</td>
                <td>O(n²)</td>
              </tr>
              <tr>
                <td>平均情況</td>
                <td>O(n²)</td>
              </tr>
              <tr>
                <td>最壞情況</td>
                <td>O(n²)</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>空間複雜度：</strong>O(1)
          </p>

          <h3>步驟說明</h3>
          <ol className="step-list">
            <li>從未排序區間中找出最小元素索引。</li>
            <li>將該最小元素與當前起始位置元素交換。</li>
            <li>縮小未排序區間，重複上述步驟直到結束。</li>
          </ol>

          <div className="visualization-container">
            <div className="demo-header">
              <h3>互動演示</h3>
              <div className="controls">
                <button className="btn-primary" data-action="selection-init">生成新陣列</button>
                <button className="btn-success" data-action="selection-start">開始排序</button>
                <button className="btn-secondary" data-action="selection-reset">重置</button>
              </div>
            </div>
            <div id="selection-display" className="array-display" />
            <div id="selection-info" className="info-panel">
              <p>點擊「生成新陣列」開始，然後點擊「開始排序」觀看動畫演示。</p>
            </div>
          </div>

          <h3>程式碼實作</h3>
          <div className="code-block">
            <span className="keyword">function</span>{' '}
            <span className="function">selectionSort</span>(arr) {'{'}
            <br />
            &nbsp;&nbsp;
            <span className="keyword">let</span> n = arr.length;
            <br />
            &nbsp;&nbsp;
            <span className="keyword">for</span> (
            <span className="keyword">let</span> i = 0; i &lt; n - 1; i++) {'{'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="keyword">let</span> minIdx = i;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="keyword">for</span> (
            <span className="keyword">let</span> j = i + 1; j &lt; n; j++) {'{'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="keyword">if</span> (arr[j] &lt; arr[minIdx]) {'{'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minIdx = j;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'}'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{'}'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="keyword">if</span> (minIdx !== i) {'{'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[arr[i], arr[minIdx]] = [
            arr[minIdx],
            arr[i]];
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{'}'}
            <br />
            &nbsp;&nbsp;{'}'}
            <br />
            &nbsp;&nbsp;
            <span className="keyword">return</span> arr;
            <br />
            {'}'}
          </div>
        </div>

        {/* 5. 插入排序 */}
        <div className="algorithm-section">
          <h2>5. 插入排序 (Insertion Sort)</h2>

          <h3>演算法原理</h3>
          <p>
            插入排序會維持前半部為「已排序區間」，每次從未排序區間拿出一個元素，
            從右往左在已排序區間中找到正確的位置插入，並將較大的元素往右移動。
          </p>

          <h3>時間複雜度</h3>
          <table className="complexity-table">
            <tbody>
              <tr>
                <th>情況</th>
                <th>時間複雜度</th>
              </tr>
              <tr>
                <td>最佳情況</td>
                <td>O(n)</td>
              </tr>
              <tr>
                <td>平均情況</td>
                <td>O(n²)</td>
              </tr>
              <tr>
                <td>最壞情況</td>
                <td>O(n²)</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>空間複雜度：</strong>O(1)
          </p>

          <h3>步驟說明</h3>
          <ol className="step-list">
            <li>第一個元素視為已排序。</li>
            <li>從第二個元素開始，將當前元素視為 key。</li>
            <li>在已排序區間中，從右往左尋找第一個小於等於 key 的位置。</li>
            <li>將途中較大的元素通通右移一格，最後將 key 放入正確位置。</li>
          </ol>

          <div className="visualization-container">
            <div className="demo-header">
              <h3>互動演示</h3>
              <div className="controls">
                <button className="btn-primary" data-action="insertion-init">生成新陣列</button>
                <button className="btn-success" data-action="insertion-start">開始排序</button>
                <button className="btn-secondary" data-action="insertion-reset">重置</button>
              </div>
            </div>
            <div id="insertion-display" className="array-display" />
            <div id="insertion-info" className="info-panel">
              <p>點擊「生成新陣列」開始，然後點擊「開始排序」觀看動畫演示。</p>
            </div>
          </div>

          <h3>程式碼實作</h3>
          <div className="code-block">
            <span className="keyword">function</span>{' '}
            <span className="function">insertionSort</span>(arr) {'{'}
            <br />
            &nbsp;&nbsp;
            <span className="keyword">for</span> (
            <span className="keyword">let</span> i = 1; i &lt; arr.length; i++)
            {' {'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="keyword">let</span> key = arr[i];
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="keyword">let</span> j = i - 1;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="keyword">while</span> (j &gt;= 0 &amp;&amp; arr[j] &gt;
            key) {'{'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[j + 1] = arr[j];
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;j--;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{'}'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;arr[j + 1] = key;
            <br />
            &nbsp;&nbsp;{'}'}
            <br />
            &nbsp;&nbsp;
            <span className="keyword">return</span> arr;
            <br />
            {'}'}
          </div>
        </div>

        {/* 演算法比較總結 */}
        <div className="comparison-section" id="comparison-section">
          <h2>演算法比較總結</h2>
          <table className="complexity-table">
            <tbody>
              <tr>
                <th>演算法</th>
                <th>最佳情況</th>
                <th>平均情況</th>
                <th>最壞情況</th>
                <th>空間複雜度</th>
                <th>穩定性</th>
              </tr>
              <tr>
                <td>冒泡排序</td>
                <td>O(n)</td>
                <td>O(n²)</td>
                <td>O(n²)</td>
                <td>O(1)</td>
                <td>穩定</td>
              </tr>
              <tr>
                <td>快速排序</td>
                <td>O(n log n)</td>
                <td>O(n log n)</td>
                <td>O(n²)</td>
                <td>O(log n)</td>
                <td>不穩定</td>
              </tr>
              <tr>
                <td>歸併排序</td>
                <td>O(n log n)</td>
                <td>O(n log n)</td>
                <td>O(n log n)</td>
                <td>O(n)</td>
                <td>穩定</td>
              </tr>
              <tr>
                <td>選擇排序</td>
                <td>O(n²)</td>
                <td>O(n²)</td>
                <td>O(n²)</td>
                <td>O(1)</td>
                <td>不穩定</td>
              </tr>
              <tr>
                <td>插入排序</td>
                <td>O(n)</td>
                <td>O(n²)</td>
                <td>O(n²)</td>
                <td>O(1)</td>
                <td>穩定</td>
              </tr>
            </tbody>
          </table>

          <h3>選擇建議</h3>
          <ul className="step-list">
            <li>
              <strong>小數據量（&lt; 50 元素）：</strong>插入排序或選擇排序，實作簡單即可。
            </li>
            <li>
              <strong>中等數據量（50–1000 元素）：</strong>快速排序或歸併排序，時間複雜度較優。
            </li>
            <li>
              <strong>大數據量：</strong>優先考慮歸併排序或經良好優化的快速排序。
            </li>
            <li>
              <strong>需要穩定性：</strong>選擇冒泡、插入或歸併排序。
            </li>
            <li>
              <strong>空間受限：</strong>冒泡、選擇與插入排序皆為 O(1) 額外空間。
            </li>
          </ul>
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

