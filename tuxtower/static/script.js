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
    "/home/tuxtower/.config"
  ];
  
  // Function to get a random quote
  function getRandomQuote() {
    var randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
  
  // Update the quote on page load
  window.addEventListener("load", function() {
    var quoteElement = document.getElementById("quote");
    quoteElement.textContent = '"' + getRandomQuote() + '"';
  });
