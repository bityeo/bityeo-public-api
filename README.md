# Bityeo Advanced Public Market Data API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform: Cloudflare Workers](https://img.shields.io/badge/Platform-Cloudflare--Workers-orange.svg)](https://workers.cloudflare.com/)

Official repository hosting the open-source architecture for the **Bityeo Crypto Trading Infrastructure**. This serverless module acts as the core routing interface handling high-throughput, low-latency market requests across Cloudflare's global edge network.

## 🔗 Ecosystem Anchors
* **Core Trading Web Platform:** [https://bityeo.com](https://bityeo.com)
* **API Network Cluster:** `https://api.bityeo.com`

---

## 🏛️ System Endpoints

### 1. System Infrastructure Status
Checks global edge operational health metrics.
* **Path:** `/v1/status`
* **Method:** `GET`

### 2. High-Fidelity Market Tickers
Fetches absolute real-time metrics, high/low indices, and rolling 24-hour transaction volumes.
* **Path:** `/v1/tickers`
* **Method:** `GET`

### 3. Orderbook Fluid Market Depth
Retrieves immediate order depths segmented into global limit order bids and asks.
* **Path:** `/v1/orderbook`
* **Query Parameters:** `pair` (e.g., `BTC/USDT`, `ETH/USDT`)
* **Method:** `GET`

---

## 💻 Sample Data Schematics

### Orderbook Engine Payload Example (`GET /v1/orderbook?pair=BTC/USDT`)
```json
{
  "pair": "BTC/USDT",
  "timestamp": 1716491200000,
  "bids": [
    ["92448.50", "0.452"],
    ["92445.00", "1.205"]
  ],
  "asks": [
    ["92451.50", "0.112"],
    ["92455.00", "0.850"]
  ]
}