import fs from 'fs';
import path from 'path';

const OUT_DIR = `sw_images`;
const SWAPI = `https://swapi.dev/api/`;
const FANDOM_API = `https://starwars.fandom.com/api.php`;

fs.mkdirSync(OUT_DIR, { recursive: true });

const CATEGORIES = {
  people: `characters`,
  planets: `planets`,
  starships: `starships`,
  vehicles: `vehicles`,
  species: `species`
};

function sanitize(str) {
  return str.replace(/[<>:/\\|?*\x00-\x1F]/g, `_`);
}

function extractId(url) {
  const m = url.match(/\/([0-9]+)\/$/);
  return m ? m[1] : null;
}

async function fetchAll(endpoint) {
  let url = `${SWAPI}${endpoint}/`;
  const list = [];

  while (url) {
    const res = await fetch(url);
    const json = await res.json();
    list.push(...json.results);
    url = json.next;
  }

  return list;
}

async function fandomSearch(name) {
  const q = encodeURIComponent(name);
  const url = `${FANDOM_API}?action=query&list=search&srsearch=${q}&format=json`;

  const res = await fetch(url, {
    headers: {
       'User-Agent': `Mozilla/5.0` 
      }
  });

const data = await res.json();
return data.query.search[0]?.title ?? null;
}

async function fandomGetImage(title) {
  const t = encodeURIComponent(title);
  const url = `${FANDOM_API}?action=query&prop=pageimages&piprop=original&titles=${t}&format=json`;

  const res = await fetch(url, {
    headers: {
      'User-Agent': `Mozilla/5.0`
    }
  });

  const data = await res.json();
  const pages = data.query.pages;
  const page = pages[Object.keys(pages)[0]];

  return page.original?.source ?? null;
}

async function downloadImage(url, filepath) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': `Mozilla/5.0` }
    });

if (!res.ok) return false;

const type = res.headers.get(`content-type`);
if (!type || !type.includes(`image`)) return false;

const buf = Buffer.from(await res.arrayBuffer());
fs.writeFileSync(filepath, buf);
return true;
  } catch {
  return false;
}
}

async function main() {
  for (const swapiKey in CATEGORIES) {
    const folder = CATEGORIES[swapiKey];
    const dir = path.join(OUT_DIR, folder);
    fs.mkdirSync(dir, { recursive: true });

    console.log(`\n=== ${swapiKey.toUpperCase()} ===`);

    const items = await fetchAll(swapiKey);

    for (const item of items) {
      const id = extractId(item.url);
      const name = item.name ?? item.title;
      const safe = sanitize(name);
      const filepath = path.join(dir, `${id}-${safe}.png`);

      // Уже скачано
      if (fs.existsSync(filepath)) {
        console.log(`Пропуск: ${id}-${safe}`);
        continue;
      }

      console.log(`Поиск: ${name}`);

      const title = await fandomSearch(name);
      if (!title) {
        console.log(`Не найдено на Wookieepedia: ${name}`);
        continue;
      }

      const imgUrl = await fandomGetImage(title);
      if (!imgUrl) {
        console.log(`Нет изображения: ${name}`);
        continue;
      }

      const ok = await downloadImage(imgUrl, filepath);
      console.log(ok ? `Скачано: ${filepath}` : `Ошибка загрузки`);
    }
  }

  console.log(`\nГотово! Все возможные картинки скачаны.`);
}

main();
