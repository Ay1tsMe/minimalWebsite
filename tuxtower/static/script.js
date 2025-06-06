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
    "Everything I want to do is illegal",
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
    // includeScore: false,
    // ignoreDiacritics: false,
    // shouldSort: true,
    // includeMatches: true,
    // findAllMatches: false,
    // minMatchCharLength: 1,
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

    resultsContainer.innerHTML = results.map(result => {
      const item = result.item;
      const date = dateMap[item.url] || "";
      return `
        <li>
          [<span class="date">${date}</span>]
          <a href="${item.url}">${item.title || item.url}</a>
        </li>
      `;
    }).join("");
  });

  function showAllResults() {
    const items = Array.from(document.querySelectorAll(".searchable"));
    resultsContainer.innerHTML = items.map(item => item.outerHTML).join("");
  }
});
