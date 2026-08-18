


document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const backButton = document.getElementById("backButton");
  const hero = document.getElementById("hero");

  // Ensure the back button is hidden initially
  backButton.style.display = "none";

  // Store initial images for each card
  const initialImages = Array.from(cards).map(card => {
    return card.querySelector(".product-image").style.backgroundImage;
  });

  // Define the new image for each card
  const newImages = [
    "url('../aboutuspage/images/130.png')",  // Image for the first card
    "url('../aboutuspage/images/MEL.png')",     // Image for the second card
    "url('../aboutuspage/images/JANREY.png')",  // Image for the third card
    "url('../aboutuspage/images/PIA.png')"      // Image for the fourth card
  ];

  // Initialize an array to track whether each card has been clicked
  const cardClicked = Array(cards.length).fill(false); // Initialize all cards as unclicked

  // Loop through all cards and attach click events
  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      if (cardClicked[index]) return; // Prevent clicking again if the image has already changed

      console.log(`Card ${index + 1} clicked`);

      // Hide other cards and expand the clicked card
      cards.forEach((c, i) => {
        if (c !== card) {
          c.classList.add("hidden"); // Hide other cards
          const productTitle = c.querySelector(".product-title");
          productTitle.style.display = "none"; // Hide the product title of other cards
        } else {
          c.classList.add("expanded"); // Expand the clicked card
          const productImage = card.querySelector(".product-image");
          const productTitle = card.querySelector(".product-title");

          // Set the background image only for the clicked card
          if (productImage.style.backgroundImage === initialImages[index]) {
            productImage.style.backgroundImage = newImages[index]; // Show new image for clicked card
          } else {
            productImage.style.backgroundImage = initialImages[index]; // Reset image for clicked card
          }

          // Hide the product title of the clicked card
          productTitle.style.display = "none";

          // Mark the card as clicked to prevent further interaction
          cardClicked[index] = true;
        }
      });

      // Show the back button
      backButton.style.display = "flex"; // Make it visible
      hero.style.visibility = "hidden"; // Hide hero section
    });
  });

  // Back button functionality
  backButton.addEventListener("click", () => {
    cards.forEach((card, index) => {
      card.classList.remove("hidden", "expanded"); // Reset all cards
      const productImage = card.querySelector(".product-image");
      const productTitle = card.querySelector(".product-title");

      // Reset the background image to its initial state
      productImage.style.backgroundImage = initialImages[index];

      // Reset the product title to be visible again
      productTitle.style.display = "block";

      // Reset the clicked flag so cards can be clicked again
      cardClicked[index] = false;
    });

    // Hide the back button
    backButton.style.display = "none"; // Make it invisible

    // Show the hero section again
    hero.style.visibility = "visible";
  });
});
