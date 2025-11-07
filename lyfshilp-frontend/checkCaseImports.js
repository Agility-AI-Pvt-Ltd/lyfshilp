// checkCaseImports.js
import fs from "fs";
import path from "path";

const SRC_DIR = path.join(process.cwd(), "src");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// include all major extensions (image/video/media)
const assetExtensions =
  "png|jpg|jpeg|svg|gif|mp4|webm|webp|ico|bmp|tiff|mov|m4v|ogg|wav|mp3|pdf";

const importRegex = /import\s+.*?from\s+['"](.*?)['"]/g;

// ✅ safer regex: built in parts (no unescaped backtick confusion)
const publicPathPattern =
  '["\'](\\/[^"\'`]+?\\.(?:' + assetExtensions + '))["\']';
const publicPathRegex = new RegExp(publicPathPattern, "gi");

function walk(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    try {
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath, fileList);
      } else if (/\.(js|jsx|ts|tsx|html)$/.test(file)) {
        fileList.push(fullPath);
      }
    } catch {
      // ignore permissions or deleted files
    }
  }
  return fileList;
}

function checkCaseMatch(fullPath) {
  const dir = path.dirname(fullPath);
  const base = path.basename(fullPath);
  if (!fs.existsSync(dir)) return false;
  const actualFiles = fs.readdirSync(dir);
  return actualFiles.includes(base);
}

let errors = [];
const files = walk(SRC_DIR).concat(walk(PUBLIC_DIR));

for (const filePath of files) {
  const content = fs.readFileSync(filePath, "utf8");

  // --- Check imports inside src ---
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    if (importPath.startsWith(".") && !importPath.endsWith(".css")) {
      const resolved = path.resolve(path.dirname(filePath), importPath);
      if (!checkCaseMatch(resolved)) {
        errors.push(`❌ Case mismatch or missing file: ${importPath} in ${filePath}`);
      }
    }
  }

  // --- Check public asset references ---
  let matchPublic;
  while ((matchPublic = publicPathRegex.exec(content)) !== null) {
    const relPath = matchPublic[1].replace(/^\//, ""); // remove leading slash
    const fullPublicPath = path.join(PUBLIC_DIR, relPath);
    if (!checkCaseMatch(fullPublicPath)) {
      errors.push(`⚠️ Case mismatch or missing public file: ${relPath} in ${filePath}`);
    }
  }
}

if (errors.length > 0) {
  console.log("\n🚨 Case Sensitivity Issues Found:");
  errors.forEach((e) => console.log(e));
  console.log(`\nTotal: ${errors.length} issues\n`);
  process.exit(1);
} else {
  console.log("✅ No case mismatches found!");
}
