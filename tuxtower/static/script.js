// Random Quotes on home page
// Array of quotes
var quotes = [
    "Hello World!",
    "sudo systemctl stop tuxtower",
    "sudo systemctl start tuxtower",
    "sudo systemctl restart tuxtower",
    "iPods are cool, iPhones are cringe",
    "Hyprland is based",
    "Wayland is the future",
    "Sign my guestbook below... Please",
    "If your keyboard isn't split... what are you doing?",
    "Church of Emacs",
    "https://tuxtower.net",
    "I use arch btw",
    "I debloated my workstation",
    "I am way too dumb to use ubuntu",
    "I got rid of my mattress, it's bloat",
    "Look's like Arch Linux broke once again",
    "Imagine using VS Code",
    "May your heart be your guiding key",
    "Donald still doesn't heal me",
    "Sora for Smash",
    "Looks like my summer vacation... is over",
    "🌴",
    "🖥",
    "💾",
    "/home/tuxtower/.config"
  ];
  
// Function to get a random quote
function getRandomQuote() {
    var randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// Function to get a random integer between min (inclusive) and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to change the image source to a random image
function changeRandomImage() {
  const totalImages = 6;
  const randomImageNumber = getRandomInt(1, totalImages);
  const randomImagePath = `images/gifs/destinyisland${randomImageNumber}.gifv`;

  const imgElement = document.getElementById('randomImage');
  if (imgElement) {
    imgElement.src = randomImagePath;
  } else {
    console.error('Image element not found');
  }
}

function play() {
  var audio = document.getElementById("audio");
  audio.volume = 0.7;
  audio.loop = true;
  audio.play();
}

// Update the quote on page load
window.addEventListener("load", function() {
  var quoteElement = document.getElementById("quote");
  quoteElement.textContent = getRandomQuote();

  changeRandomImage();
});

// Search bar for blog
document.addEventListener("DOMContentLoaded", async function () {
  const input = document.getElementById("search-input");
  const resultsContainer = document.getElementById("search-results");

  // Cache original list if search bar is empty
  const originalItems = Array.from(resultsContainer.children).map(el => el.cloneNode(true));

  const dateMap = {};
    originalItems.forEach(el => {
    const url = el.dataset.url;
    const date = el.dataset.date;
    if (url && date) {
      dateMap[url] = date;
    }
  });

  const response = await fetch("/search_index.en.json");
  const list = await response.json();

  // Remove unwanted search entries
  const filteredList = list.filter(item => {
    const path = item.path;
    return !(path === "/" || path === "/blog/");
  });

  const fuseOptions = {
    // isCaseSensitive: false,
    includeScore: true,
    // ignoreDiacritics: false,
    // shouldSort: true,
    includeMatches: true,
    // findAllMatches: false,
    minMatchCharLength: 1,
    // location: 0,
    threshold: 0.3,
    // distance: 100,
    // useExtendedSearch: false,
    ignoreLocation: true,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: [
      "title",
      "body"
    ]
  };

  const fuse = new Fuse(filteredList, fuseOptions);

  input.addEventListener("input", function () {
    const query = input.value.trim();

    if (query.length < 1) {
      resultsContainer.innerHTML = "";
      originalItems.forEach(item => resultsContainer.appendChild(item.cloneNode(true)));
      return;
    }

    const results = fuse.search(query);
    console.log(results);

    resultsContainer.innerHTML = results.map(res => {
      const { item, matches } = res;
      const date = dateMap[item.url] || "";

      /* ---------- build bullet lines ---------- */
      const snippets = new Map();

      ['title', 'body'].forEach(key => {
        if (snippets.size >= MAX_SNIPPETS) return;
        const snip = buildSnippetLiteral(item[key] || '', query);
        if (snip) snippets.set(canon(snip), snip);
      });

      for (const m of matches) {
        if (snippets.size >= MAX_SNIPPETS) break;
        const snip = buildSnippet(m, query);
        snippets.set(canon(snip), snip);       // duplicates automatically overwritten
      }

      const bulletHTML = [...snippets.values()].map((s, i, arr) => {
        const branch = i === arr.length - 1 ? '└──' : '├──';
        return `<li>${branch} ${s}</li>`;
      }).join("");

      return `
        <li class="tree-root">
          [<span class="date">${date}</span>]
          <a href="${item.url}">${item.title}</a>
          <ul class="tree">${bulletHTML}</ul>
        </li>
      `;
    }).join("");
  });

  function showAllResults() {
    const items = Array.from(document.querySelectorAll(".searchable"));
    resultsContainer.innerHTML = items.map(item => item.outerHTML).join("");
  }
});

// Highlight search-result helper
function highlight(fuseSearchResult, highlightClassName = 'highlight') {
  const set = (obj, path, value) => {
    const parts = path.split('.');
    for (let i = 0; i < parts.length - 1; i++) obj = obj[parts[i]];
    obj[parts[parts.length - 1]] = value;
  };

  const generateHighlightedText = (text, regions = []) => {
    let out = '';
    let from = 0;

    regions.forEach(r => {
      const [start, end] = r;
      out += [
        text.slice(from, start),
        `<span class="${highlightClassName}">`,
        text.slice(start, end + 1),
        '</span>'
      ].join('');
      from = end + 1;
    });

    return out + text.slice(from);
  };

  return fuseSearchResult
    .filter(({ matches }) => matches && matches.length)
    .map(({ item, matches }) => {
      const copy = { ...item };                 // shallow copy so we don’t mutate original
      matches.forEach(m =>
        set(copy, m.key, generateHighlightedText(m.value, m.indices))
      );
      return copy;
    });
}

// search text snippet helper
const MAX_SNIPPETS  = 3;   // at most 3 bullets per post
const CONTEXT_CHARS = 45;  // characters to show on each side of the hit

function escapeRegExp(str) {           // for building a safe RegExp
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildSnippet(match, query) {
  const text = match.value;              // this is the string Fuse inspected
  const [start, end] = match.indices[0]; // first hit in that string

  const leftIdx  = Math.max(0, start - CONTEXT_CHARS);
  const rightIdx = Math.min(text.length, end + CONTEXT_CHARS + 1);
  let snippet    = text.slice(leftIdx, rightIdx);

  // collapse all whitespace (newline, tab, etc.) into single spaces
  snippet = snippet.replace(/\s+/g, ' ').trim();

  // make sure the term is highlighted
  const re = new RegExp(escapeRegExp(query), 'gi');
  return snippet.replace(re, '<mark>$&</mark>');
}

function buildSnippetLiteral(fullText, query) {
  const regex = new RegExp(escapeRegExp(query), 'i');   // first literal hit
  const match = regex.exec(fullText);
  if (!match) return null;                              // no literal text → skip

  const hitStart = match.index;
  const hitEnd   = hitStart + match[0].length - 1;

  const leftIdx  = Math.max(0, hitStart - CONTEXT_CHARS);
  const rightIdx = Math.min(fullText.length, hitEnd + CONTEXT_CHARS + 1);
  let snippet    = fullText.slice(leftIdx, rightIdx);

  // collapse whitespace
  snippet = snippet.replace(/\s+/g, ' ').trim();

  // highlight *all* instances inside the slice
  const hiRegex = new RegExp(escapeRegExp(query), 'gi');
  return snippet.replace(hiRegex, '<mark>$&</mark>');
}

function canon(text) {
  return text
    .replace(/<[^>]+>/g, '')   // remove <mark> etc.
    .replace(/\s+/g, ' ')      // collapse whitespace
    .trim()
    .toLowerCase();
}
