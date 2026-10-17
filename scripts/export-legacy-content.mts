/**
 * One-off: converts the devotionals/sermons that used to be hard-coded as JSX
 * into HTML so they can be seeded into the content store.
 *
 *   npx tsx scripts/export-legacy-content.mts <devotional-page.tsx> <sermon-page.tsx>
 */
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const [devotionalFile, sermonFile] = process.argv.slice(2);
const outFile = path.join(process.cwd(), 'src/lib/server/seed/legacy-content.json');

async function loadData(file: string, constName: string) {
  const source = await fs.readFile(file, 'utf8');
  const start = source.indexOf(`const ${constName} = [`);
  const end = source.indexOf('export default');
  if (start < 0 || end < 0) throw new Error(`Could not find ${constName} in ${file}`);
  const body = source.slice(start, end);
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'legacy-'));
  const entry = path.join(tmpDir, 'entry.tsx');
  await fs.writeFile(entry, `import React from 'react';\n${body}\nexport default ${constName};\n`);
  const outfile = path.join(tmpDir, 'entry.mjs');
  await build({
    entryPoints: [entry],
    bundle: true,
    format: 'esm',
    platform: 'node',
    jsx: 'transform',
    outfile,
    nodePaths: [path.join(process.cwd(), 'node_modules')],
    logLevel: 'error',
  });
  return (await import(pathToFileURL(outfile).href)).default as Array<Record<string, unknown>>;
}

function toHtml(node: unknown, render: (n: unknown) => string) {
  return render(node)
    // emphasis that used Tailwind classes becomes semantic markup
    .replace(/<span class="[^"]*font-(?:semibold|bold)[^"]*">([\s\S]*?)<\/span>/g, '<strong>$1</strong>')
    .replace(/ class="[^"]*"/g, '')
    .replace(/<div>/g, '<div>')
    .trim();
}

const { renderToStaticMarkup } = await import('react-dom/server');
const render = (n: unknown) => renderToStaticMarkup(n as never);

const devotionals = (await loadData(devotionalFile, 'devotionalData')).map(d => ({
  date: d.date,
  title: d.title,
  body: toHtml(d.content, render),
}));
const sermons = (await loadData(sermonFile, 'sermonData')).map(s => ({
  date: s.date,
  title: s.title,
  body: toHtml(s.content, render),
}));

await fs.mkdir(path.dirname(outFile), { recursive: true });
await fs.writeFile(outFile, JSON.stringify({ devotionals, sermons }, null, 2));
console.log(`Wrote ${devotionals.length} devotionals and ${sermons.length} sermons to ${outFile}`);
