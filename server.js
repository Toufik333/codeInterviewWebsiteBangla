const express = require("express");
const path = require("path");
const apiApp = require("./api/index");

const app = express();
const PORT = process.env.PORT || 3000;

// Mount API routes
app.use(apiApp);

// Serve static frontend files from repository root
app.use(express.static(path.join(__dirname)));

// Fallback to index.html for SPA client-side routes
app.get("*", (req, res) => {
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
