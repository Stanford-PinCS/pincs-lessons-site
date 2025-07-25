/*
AI-generated script to do the following:

npm install
delete env.development if it exists
cp .env.example .env.development 
npx auth secret 
delete the existing local db 
npx prisma db push 

*/

// setup-dev.js
const fs = require("fs");
const { execSync } = require("child_process");

// 1. Install dependencies
console.log("Installing dependencies...");
execSync("npm install", { stdio: "inherit" });

// 2. Copy .env.example to .env.local if not present
if (!fs.existsSync(".env")) {
  console.log("Creating .env from .env.example...");
  fs.copyFileSync(".env.example", ".env");
} else {
  console.log(".env already exists. Skipping.");
}

// 3. Generate auth secret
console.log("Generating auth secret...");
execSync("npx auth secret", { stdio: "inherit" });

// 4. Delete local dev db if exists
const devDbPath = "./prisma/dev.db";
if (fs.existsSync(devDbPath)) {
  console.log("Removing existing dev.db...");
  fs.unlinkSync(devDbPath);
} else {
  console.log("No dev.db found. Skipping delete.");
}

// 5. Push new schema to dev db
console.log("Creating new dev.db with latest schema...");
execSync("npx prisma db push", { stdio: "inherit" });

console.log("\nAll done! You can now run: npm run dev\n");
