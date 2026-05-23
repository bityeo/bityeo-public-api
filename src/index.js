/**
 * Bityeo Exchange - Advanced Serverless Public API Engine
 * Microservice architecture optimized for Cloudflare Workers Edge Network.
 *
 * @author Bityeo Engineering Team
 * @license MIT
 */

// Centralized high-fidelity mock data storage simulating live exchange state
const DATABASE = {
  system: {
    status: "operational",
    version: "1.0.4",
    engine_latency_ms: 1.2
  },
  base_currency: "USDT",
  tickers: {
    "BTC/USDT": { last: "92450.00", high_24h: "93100.00", low_24h: "91200.00", volume_24h: "1420.55", change_24h: "+2.45%" },
    "ETH/USDT": { last: "3480.25", high_24h: "3520.00", low_24h: "3410.50", volume_24h: "8940.12", change_24h: "-0.15%" },
    "SOL/USDT": { last: "185.40", high_24h: "188.10", low_24h: "174.00", volume_24h: "24500.80", change_24h: "+5.12%" },
    "TON/USDT": { last: "7.25", high_24h: "7.45", low_24h: "6.95", volume_24h: "115000.00", change_24h: "+1.89%" }
  },
  orderbooks: {
    "BTC/USDT": {
      bids: [["92448.50", "0.452"], ["92445.00", "1.205"], ["92440.10", "3.890"]],
      asks: [["92451.50", "0.112"], ["92455.00", "0.850"], ["92462.30", "2.140"]]
    }
  }
};

// Strict enterprise-level HTTP Response Headers configuration
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Requested-With",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block"
};

/**
 * Main JSON Response Utility Wrapper
 */
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      ...corsHeaders
    }
  });
}

export default {
  async fetch(request, env, ctx) {
    // Edge case interception: Handle CORS preflight routing
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Intercept invalid request methods
    if (request.method !== "GET" && request.method !== "HEAD") {
      return jsonResponse({ error: `Method ${request.method} Not Allowed` }, 451);
    }

    try {
      const url = new URL(request.url);
      const pathname = url.pathname;

      // Route 1: Root Info Router
      if (pathname === "/") {
        return jsonResponse({
          message: "Welcome to Bityeo Public API. Direct endpoint documentation can be found in the official repository.",
          docs: "https://github.com/bityeo/bityeo-public-api",
          endpoints: ["/v1/status", "/v1/tickers", "/v1/orderbook?pair=BTC/USDT"]
        });
      }

      // Route 2: System Health and Operational Status
      if (pathname === "/v1/status") {
        return jsonResponse({
          ...DATABASE.system,
          server_timestamp: Date.now()
        });
      }

      // Route 3: Live Market Tickers Aggregator
      if (pathname === "/v1/tickers") {
        return jsonResponse({
          timestamp: Date.now(),
          base_currency: DATABASE.base_currency,
          data: DATABASE.tickers
        });
      }

      // Route 4: Advanced Orderbook Depth Engine
      if (pathname === "/v1/orderbook") {
        const pair = url.searchParams.get("pair") || "BTC/USDT";
        const orderbook = DATABASE.orderbooks[pair];

        if (!orderbook) {
          return jsonResponse({ error: `Trading pair '${pair}' is unsupported or invalid.` }, 400);
        }

        return jsonResponse({
          pair,
          timestamp: Date.now(),
          ...orderbook
        });
      }

      // Route 5: Catch-all Fallback Router (404 Not Found)
      return jsonResponse({ error: "Endpoint not found. Check documentation for valid resource paths." }, 404);

    } catch (criticalError) {
      // Global Exception Handler to maintain 100% microservice uptime
      return jsonResponse({ 
        error: "Internal Server Error Intercepted", 
        details: criticalError.message 
      }, 500);
    }
  }
};
