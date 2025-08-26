const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Express.js Server</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.6;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: white;
          }
          .container {
            background: rgba(255, 255, 255, 0.1);
            padding: 2rem;
            border-radius: 10px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          h1 { margin-top: 0; }
          .endpoint {
            background: rgba(255, 255, 255, 0.1);
            padding: 1rem;
            border-radius: 5px;
            margin: 1rem 0;
          }
          code {
            background: rgba(0, 0, 0, 0.2);
            padding: 0.2rem 0.4rem;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 Express.js Server is Running!</h1>
          <p>Welcome to your Express.js server template with modern best practices.</p>
          
          <h2>Available Endpoints:</h2>
          <div class="endpoint">
            <strong>GET /</strong> - This welcome page
          </div>
          <div class="endpoint">
            <strong>GET /health</strong> - Health check endpoint
          </div>
          <div class="endpoint">
            <strong>GET /api/users</strong> - Sample API endpoint (returns mock data)
          </div>
          
          <h2>Features Included:</h2>
          <ul>
            <li>Security headers with Helmet</li>
            <li>CORS configuration</li>
            <li>Rate limiting</li>
            <li>Request logging</li>
            <li>Compression</li>
            <li>JSON body parsing</li>
            <li>Error handling</li>
            <li>Environment-based configuration</li>
          </ul>
          
          <p>
            <strong>Environment:</strong> <code>${
              process.env.NODE_ENV || "development"
            }</code><br>
            <strong>Port:</strong> <code>${process.env.PORT || 3000}</code><br>
            <strong>Timestamp:</strong> <code>${new Date().toISOString()}</code>
          </p>
        </div>
      </body>
    </html>
  `);
});

module.exports = app;
