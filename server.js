const express = require("express");
const path = require("path");
const apiApp = require("./api/index");

const app = express();
const PORT = process.env.PORT || 3000;

// Mount API routes
app.use(apiApp);

const fs = require("fs");

// Serve static frontend files (prioritizing public/ for Vercel parity)
const publicDir = path.join(__dirname, "public");
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
}
app.use(express.static(path.join(__dirname)));

// Fallback to index.html for SPA client-side routes
app.get("*", (req, res) => {
  const publicIndex = path.join(publicDir, "index.html");
  if (fs.existsSync(publicIndex)) {
    return res.sendFile(publicIndex);
  }
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  🚀 CTCI Study Platform running locally!`);
  console.log(`  🌐 URL: http://localhost:${PORT}`);
  console.log(`  🔌 API Status: http://localhost:${PORT}/api/status`);
  if (!process.env.MONGODB_URI) {
    console.log(`  ⚠️  MONGODB_URI not set yet. Running in Guest/Local mode.`);
    console.log(`     Add MONGODB_URI to .env or Vercel Environment Variables.`);
  } else {
    console.log(`  📦 MongoDB URI detected: attempting connection...`);
  }
  console.log(`======================================================\n`);
});
