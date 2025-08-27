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
            .card {
                position: relative;
                width: 190px;
                height: 254px;
                background-color: #000;
                display: flex;
                flex-direction: column;
                justify-content: end;
                padding: 12px;
                gap: 12px;
                border-radius: 8px;
                cursor: pointer;
            }

            .card::before {
                content: '';
                position: absolute;
                inset: 0;
                left: -5px;
                margin: auto;
                width: 200px;
                height: 264px;
                border-radius: 10px;
                background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100% );
                z-index: -10;
                pointer-events: none;
                transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }

            .card::after {
                content: "";
                z-index: -1;
                position: absolute;
                inset: 0;
                background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100% );
                transform: translate3d(0, 0, 0) scale(0.95);
                filter: blur(20px);
            }

            .heading {
                font-size: 20px;
                text-transform: capitalize;
                font-weight: 700;
            }

            .card p:not(.heading) {
                 font-size: 14px;
            }

            .card p:last-child {
                color: #e81cff;
                font-weight: 600;
            }

            .card:hover::after {
                 filter: blur(30px);
            }

            .card:hover::before {
                transform: rotate(-90deg) scaleX(1.34) scaleY(0.77);
            }

        </style>
      </head>
      <body>
        <div class="container">
            <h1>🚀 Express.js Server is Running!</h1>
            <p>This is the only route available: <strong>GET /</strong></p>
            <p>This is a simple web server.</p>
            <p>Welcome.</p>
        </div>
        <div class="card">
            <p class="heading">
                Server is Running
            </p>
            <p>
                Powered By
            </p>
            <p> Ashish </p>
        </div>
      </body>
    </html>
  `);
});

module.exports = app;
