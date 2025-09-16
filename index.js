const themeToggle = document.getElementById("theme");
const body = document.body;

// Load saved theme
if (localStorage.getItem("dark") === "true") {
  body.classList.add("dark");
  themeToggle.checked = true;
}

themeToggle.addEventListener("change", () => {
  body.classList.toggle("dark", themeToggle.checked);
  localStorage.setItem("dark", themeToggle.checked);
});
