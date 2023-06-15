// Random Quotes on home page
// Array of quotes
var quotes = [
    "The only thing we have to fear is fear itself... and Mondays.",
    "I have a dream that one day all printers will have infinite ink.",
    "In the end, it's not the years in your life that count, it's the number of unread emails in your inbox.",
    "Ask not what your Wi-Fi can do for you, ask what you can do for your Wi-Fi.",
    "I came, I saw, I followed back.",
    "It is not in the stars to hold our destiny, but in our browser history.",
    "To be or not to be? That is the system requirements question.",
    "Float like a butterfly, sting like a bee, code like a developer who forgot to use version control.",
    "I think, therefore I am... probably overdue for a software update.",
    "The best way to predict the future is to create it... or find someone who can hack it for you.",
    "I chat, therefore I GPT.",
    "The journey of a thousand lines of code begins with a single prompt to ChatGPT.",
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
  