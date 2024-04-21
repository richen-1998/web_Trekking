document.addEventListener("DOMContentLoaded", function () {
  const dropBtns = document.querySelectorAll(".dropbtn");
  const dropdownContents = document.querySelectorAll(".dropdown-content");
  const tabContents = document.querySelectorAll(".tabcontent");

  function closeAllDropdownsAndTabs() {
    dropdownContents.forEach((content) => {
      content.classList.remove("show");
    });
    tabContents.forEach((content) => {
      content.style.display = "none";
    });
  }

  // Event listener for clicking on dropdown buttons
  dropBtns.forEach((btn, index) => {
    btn.addEventListener("click", function (event) {
      // Check if this dropdown content is currently visible
      const isOpen = dropdownContents[index].classList.contains("show");

      // Close all dropdowns and tab contents
      closeAllDropdownsAndTabs();

      // Toggle the visibility of the respective dropdown content
      if (!isOpen) {
        dropdownContents[index].classList.add("show");

        // Display the respective tab content
        const tabLinkId = dropdownContents[index]
          .querySelector(".tablinks")
          .getAttribute("onclick")
          .split("'")[1];
        openContent(null, tabLinkId); // Show the default tab content
      }
    });
  });

  // Event listener for clicking on tab links
  document.querySelectorAll(".tablinks").forEach((tabLink) => {
    tabLink.addEventListener("click", function (event) {
      event.preventDefault();
      const contentID = this.getAttribute("onclick").split("'")[1];
      openContent(event, contentID); // Show the clicked tab content
    });
  });

  // Function to open specific tab content
  function openContent(event, contentID) {
    // Hide all tab contents
    tabContents.forEach((content) => {
      content.style.display = "none";
    });

    // Show the selected tab content
    const selectedTabContent = document.getElementById(contentID);
    if (selectedTabContent) {
      selectedTabContent.style.display = "block";
    }
  }

  // Event listener to close all dropdowns and tab contents when clicking outside
  document.addEventListener("click", function (event) {
    const targetElement = event.target;

    if (
      !targetElement.matches(".dropbtn") &&
      !targetElement.matches(".dropdown-content") &&
      !targetElement.matches(".tablinks") &&
      !targetElement.matches(".tabcontent") &&
      !targetElement.matches(".tabcontent p")
    ) {
      let isSupOrChildOfSup = false;
      let currentElement = targetElement;
      while (currentElement !== null && currentElement.tagName !== "BODY") {
        if (currentElement.tagName === "SUP") {
          isSupOrChildOfSup = true;
          break;
        }
        currentElement = currentElement.parentElement;
      }

      if (!isSupOrChildOfSup) {
        closeAllDropdownsAndTabs();
      }
    }
  });
});

/***********************Text-animation**************************/
const words = document.querySelectorAll(".word");
let currentIndex = 0;

// Show the first word initially
words[currentIndex].style.opacity = "1";

function showNextWord() {
  const currentWord = words[currentIndex];
  const nextIndex = (currentIndex + 1) % words.length;
  const nextWord = words[nextIndex];

  // Move current word upward and fade out
  currentWord.style.transform = "translate(-50%, -100%)";
  currentWord.style.opacity = "0";

  setTimeout(() => {
    // Reset position for next word
    currentWord.style.transform = "translate(-50%, -50%)";
    // Show next word
    nextWord.style.opacity = "1";
  }, 500); // Adjust this delay as needed

  // Update currentIndex
  currentIndex = nextIndex;

  // Schedule next word after some time (e.g., 2000ms = 2 seconds)
  setTimeout(() => {
    // Call showNextWord to continue the animation loop
    showNextWord();
  }, 3000); // Adjust this interval as needed
}

// Start the animation loop
showNextWord();

/********slideshow******/

//function for the slideshow of best-seller

document.addEventListener("DOMContentLoaded", function () {
  const imagesContainer = document.getElementById("image-container");
  const imageBoxes = document.querySelectorAll(".slide");
  const leftButton = document.getElementById("leftButton");
  const rightButton = document.getElementById("rightButton");

  let currentIndex = 0; // Index of the leftmost visible imageBox

  // Initialize the slideshow
  showCurrentImages();

  // Handle click on the right button
  rightButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % imageBoxes.length;
    showCurrentImages();
  });

  // Handle click on the left button
  leftButton.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + imageBoxes.length) % imageBoxes.length;
    showCurrentImages();
  });

  // Function to display the current set of imageBoxes
  function showCurrentImages() {
    imageBoxes.forEach((box, index) => {
      let displayIndex = (currentIndex + index) % imageBoxes.length;
      box.style.display = index < 6 || index === 6 ? "flex" : "none";
      box.style.order = (index - currentIndex + 7) % 7; // Set order to maintain proper display order
    });
  }
});
