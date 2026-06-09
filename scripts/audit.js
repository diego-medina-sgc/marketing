#!/usr/bin/env node
/* The Georgian Network — repository integrity checks */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const jsFiles = ['data.js', 'store.js', 'sync.js', 'marketing.js', 'app.js', 'admin.js'];
let failures = 0;
function fail(msg) { console.error('✖ ' + msg); failures++; }
function pass(msg) { console.log('✓ ' + msg); }

for (const f of jsFiles) {
  const r = spawnSync(process.execPath, ['--check', path.join(root, f)], { encoding: 'utf8' });
  if (r.status !== 0) fail(`${f} syntax failed\n${r.stderr || r.stdout}`);
  else pass(`${f} syntax ok`);
}

let ts = null;
try { ts = require(path.join(root, "uploads/st.-george's-marketing-assistant (1)/node_modules/typescript")); } catch (e) {}
if (ts) {
  for (const f of jsFiles) {
    const file = path.join(root, f);
    const src = fs.readFileSync(file, 'utf8');
    const sf = ts.createSourceFile(f, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
    function propName(n) {
      if (!n.name || ts.isComputedPropertyName(n.name)) return null;
      return (ts.isIdentifier(n.name) || ts.isStringLiteral(n.name) || ts.isNumericLiteral(n.name)) ? String(n.name.text) : null;
    }
    function walk(n) {
      if (ts.isObjectLiteralExpression(n)) {
        const seen = new Map();
        for (const p of n.properties) {
          const k = propName(p); if (!k) continue;
          if (seen.has(k)) {
            const pos = sf.getLineAndCharacterOfPosition(p.getStart(sf));
            fail(`${f}:${pos.line + 1} duplicate object key '${k}'`);
          } else seen.set(k, p.getStart(sf));
        }
      }
      ts.forEachChild(n, walk);
    }
    walk(sf);
  }
  if (!failures) pass('duplicate object key scan ok');
} else {
  console.warn('⚠ TypeScript parser not available; skipped duplicate-key AST scan. Run npm install in the uploaded assistant package to enable it.');
}

const dataText = fs.readFileSync(path.join(root, 'data.js'), 'utf8');
for (const token of ['window.TGN', 'I18N', 'NEWS', 'BIRTHDAYS', 'VACANCIES']) {
  if (!dataText.includes(token)) fail(`data.js missing ${token}`);
}

const allText = jsFiles.concat(['index.html']).map(f => fs.readFileSync(path.join(root, f), 'utf8')).join('\n');
const placeholderMatches = allText.match(/href=["']#|url:\s*["']#/g) || [];
if (placeholderMatches.length) console.warn(`⚠ Found ${placeholderMatches.length} placeholder link(s). See audit report/final response.`);
else pass('no placeholder links found');

process.exit(failures ? 1 : 0);
