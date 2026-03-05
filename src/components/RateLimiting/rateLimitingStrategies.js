export const RATE_LIMITING_STRATEGIES = [
  {
    id: 'fixed-window',
    name: '固定視窗限流（Fixed Window）',
    description:
      '在固定長度的時間視窗內，只允許通過最多 N 個請求；超過時其餘請求一律被拒絕，直到進入下一個視窗。',
    allowsBurst: false,
    isSmooth: false,
    typicalUseCases: ['簡單的 API QPS 限制', '登入失敗次數限制', '後端負載較穩定的服務'],
    defaultParameters: {
      windowSizeMs: 1000,
      maxRequests: 5,
    },
    parameters: [
      {
        key: 'windowSizeMs',
        label: '視窗長度（毫秒）',
        description: '每個限流視窗的時間長度，單位為毫秒。',
        minValue: 200,
        maxValue: 5000,
        defaultValue: 1000,
        step: 100,
      },
      {
        key: 'maxRequests',
        label: '每視窗最大請求數',
        description: '在單一時間視窗內允許通過的最大請求數。',
        minValue: 1,
        maxValue: 20,
        defaultValue: 5,
        step: 1,
      },
    ],
  },
  {
    id: 'sliding-window',
    name: '滑動視窗限流（Sliding Window）',
    description:
      '使用滑動視窗（通常以計數或時間加權）平滑計算某段時間內的請求數，減少固定視窗在邊界時的突發行為。',
    allowsBurst: false,
    isSmooth: true,
    typicalUseCases: ['更平滑的 API 流量控制', '需要避免邊界「一次大量通過」的情境'],
    defaultParameters: {
      windowSizeMs: 1000,
      maxRequests: 5,
    },
    parameters: [
      {
        key: 'windowSizeMs',
        label: '視窗長度（毫秒）',
        description: '滑動視窗的時間長度。',
        minValue: 200,
        maxValue: 5000,
        defaultValue: 1000,
        step: 100,
      },
      {
        key: 'maxRequests',
        label: '每視窗最大請求數',
        description: '在滑動視窗時間範圍內允許的最大請求數。',
        minValue: 1,
        maxValue: 20,
        defaultValue: 5,
        step: 1,
      },
    ],
  },
  {
    id: 'token-bucket',
    name: 'Token Bucket',
    description:
      '以固定速率往桶中補充 token，每個請求消耗一個 token；桶容量決定可接受的突發程度，是常見的流量整形與限流策略。',
    allowsBurst: true,
    isSmooth: true,
    typicalUseCases: ['允許短暫突發但長期受控的 API', '網路頻寬或佇列流量整形'],
    defaultParameters: {
      bucketCapacity: 10,
      refillRatePerSec: 5,
    },
    parameters: [
      {
        key: 'bucketCapacity',
        label: '桶容量（最大 token 數）',
        description: '決定最多可累積多少 token（突發可接受程度）。',
        minValue: 1,
        maxValue: 50,
        defaultValue: 10,
        step: 1,
      },
      {
        key: 'refillRatePerSec',
        label: '補充速率（每秒 token 數）',
        description: '每秒往桶中補充多少 token，對應長期平均流量。',
        minValue: 1,
        maxValue: 20,
        defaultValue: 5,
        step: 1,
      },
    ],
  },
  {
    id: 'leaky-bucket',
    name: 'Leaky Bucket',
    description:
      '以固定速率從桶中洩出請求（或資料），新請求先排入桶中，若超過容量則直接被拒絕，適合將尖峰流量整形成較穩定的輸出。',
    allowsBurst: false,
    isSmooth: true,
    typicalUseCases: ['希望輸出速率穩定的佇列處理', '將尖峰請求平滑送往後端服務'],
    defaultParameters: {
      queueCapacity: 10,
      leakRatePerSec: 5,
    },
    parameters: [
      {
        key: 'queueCapacity',
        label: '桶容量（最大排隊數）',
        description: '桶中最多可同時排隊的請求數，超出即立刻被拒絕。',
        minValue: 1,
        maxValue: 50,
        defaultValue: 10,
        step: 1,
      },
      {
        key: 'leakRatePerSec',
        label: '洩出速率（每秒處理數）',
        description: '每秒從桶中排出多少請求，對應穩定輸出速率。',
        minValue: 1,
        maxValue: 20,
        defaultValue: 5,
        step: 1,
      },
    ],
  },
];

