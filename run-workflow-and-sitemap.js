// run-workflow-and-sitemap.js
// This is a local "fire once" script to run your daemon, regenerate sitemap, and push

const child = require("child_process");

try {
  console.log("Step 1: Run generate-pages-daemon.js");
  child.execSync("node generate-pages-daemon.js", { stdio: "inherit" });

  console.log("Step 2: Generate sitemap from generated pages");
  child.execSync("node generate-sitemap.js", { stdio: "inherit" });

  console.log("Step 3: Commit and push sitemap + output");
  child.execSync("git add output/ sitemap.xml", { stdio: "inherit" });
  child.execSync(
    'git commit -m "Run daemon + update dynamic sitemap" || echo "No changes"',
    { stdio: "inherit" }
  );
  child.execSync("git push origin main", { stdio: "inherit" });

  console.log("✅ ALL DONE. Now check:");
  console.log("https://brightlane.github.io/booking.com/sitemap.xml");
} catch (err) {
  console.error("run-workflow-and-sitemap.js failed:", err.toString());
  process.exit(1);
}
