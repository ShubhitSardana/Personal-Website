'use strict';


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Add event listener for the Escape key to close the modal
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    if (modalContainer.classList.contains("active")) {
      publicationsModalFunc(); // Close the modal
    }
  }
});


// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// publications variables
const publicationsItem = document.querySelectorAll("[data-publications-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const publicationsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < publicationsItem.length; i++) {

  publicationsItem[i].addEventListener("click", function () {
    modalTitle.innerHTML = this.querySelector("[data-publications-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-publications-text]").innerHTML;

    publicationsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", publicationsModalFunc);
overlay.addEventListener("click", publicationsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
// 
// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) { // Use 'j' here
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

// --- THEME SWITCHING LOGIC ---
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Function to set the theme
function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateIcon(theme); // Call function to update the icon
}

// Function to update the toggle button icon
function updateIcon(theme) {
    const icon = themeToggle.querySelector('ion-icon');
    if (theme === 'light') {
        icon.setAttribute('name', 'sunny-outline'); // Sun icon for light mode
    } else {
        icon.setAttribute('name', 'moon-outline');  // Moon icon for dark mode
    }
}

// Check for saved theme in localStorage
// const savedTheme = localStorage.getItem('theme');
// Check for system preference
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Set initial theme
// if (savedTheme) {
//   setTheme(savedTheme);
// } 
if (prefersDarkMode) {
  setTheme('light'); // Use dark mode if system prefers it
} else {
  setTheme('dark'); // Default to dark
}


// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});


// --- END THEME SWITCHING LOGIC ---

console.log("Navigation Links:", navigationLinks);
console.log("Pages:", pages);
