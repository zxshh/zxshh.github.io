import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourceDir = path.join(root, 'source');
const errors = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function rel(file) {
  return path.relative(root, file).split(path.sep).join('/');
}

function frontMatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : '';
}

function field(yaml, name) {
  const match = yaml.match(new RegExp(`^${name}:\\s*(.+?)\\s*$`, 'm'));
  return match ? match[1].replace(/\s+#.*$/, '').trim() : '';
}

const sourceFiles = walk(sourceDir);
const markdownFiles = sourceFiles.filter((file) => file.endsWith('.md'));
const registryFile = path.join(sourceDir, '_data', 'wiki.yml');
const wikiIds = fs.readFileSync(registryFile, 'utf8')
  .split(/\r?\n/)
  .map((line) => line.match(/^\s*-\s*([\w-]+)\s*$/)?.[1])
  .filter(Boolean);
const wikiSet = new Set(wikiIds);

for (const wikiId of wikiIds) {
  const config = path.join(sourceDir, '_data', 'wiki', `${wikiId}.yml`);
  if (!fs.existsSync(config)) errors.push(`Wiki \"${wikiId}\" is registered but has no data file.`);
}

for (const config of walk(path.join(sourceDir, '_data', 'wiki')).filter((file) => file.endsWith('.yml'))) {
  const id = path.basename(config, '.yml');
  if (!wikiSet.has(id)) errors.push(`Wiki data file \"${rel(config)}\" is not registered in source/_data/wiki.yml.`);
}

for (const file of markdownFiles) {
  const text = fs.readFileSync(file, 'utf8');
  const relative = rel(file);
  const yaml = frontMatter(text);

  if (!yaml && !relative.endsWith('.gitkeep')) errors.push(`${relative} has no YAML front matter.`);
  if (/\[\[|!\[\[/.test(text)) errors.push(`${relative} contains Obsidian Wikilinks; use standard Markdown links in published content.`);
  if (/\]\([^)]*\.md(?:[?#)]|$)/.test(text)) errors.push(`${relative} contains a .md link; use the published site route instead.`);
  if (/img\.remit\.ee|example\.com/.test(text)) errors.push(`${relative} contains a retired external image host or example.com.`);

  const wikiId = field(yaml, 'wiki');
  if (relative.startsWith('source/wiki/')) {
    if (!wikiId) errors.push(`${relative} is a Wiki page without a wiki id.`);
    else if (!wikiSet.has(wikiId)) errors.push(`${relative} references unregistered wiki id \"${wikiId}\".`);
  }

  if (relative.startsWith('source/notes/') && !field(yaml, 'notebook')) {
    errors.push(`${relative} is a Notebook page without a notebook id.`);
  }

  for (const asset of text.matchAll(/!\[[^\]]*\]\((\/assets\/[^)\s]+)\)/g)) {
    const assetPath = path.join(sourceDir, asset[1].replace(/^\//, ''));
    if (!fs.existsSync(assetPath)) errors.push(`${relative} references missing asset ${asset[1]}.`);
  }
}

for (const file of walk(path.join(sourceDir, 'assets'))) {
  if (fs.statSync(file).size > 5 * 1024 * 1024) errors.push(`${rel(file)} exceeds the 5 MiB web asset limit.`);
}

for (const file of [path.join(root, '_config.yml'), path.join(root, '_config.stellar.yml')]) {
  if (/img\.remit\.ee|example\.com/.test(fs.readFileSync(file, 'utf8'))) errors.push(`${rel(file)} contains a retired external image host or example.com.`);
}

if (errors.length) {
  console.error('Content validation failed:\n' + errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`Content validation passed: ${markdownFiles.length} Markdown files, ${wikiIds.length} Wikis.`);
