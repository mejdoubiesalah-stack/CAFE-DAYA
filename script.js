const feedbackForm = document.querySelector("#feedbackForm");
const whatsappReviewButton = document.querySelector("#whatsappReviewButton");
const whatsappNumber = "212768452761";
const menuLinks = document.querySelectorAll(".menu-jump a");
const menuCategories = document.querySelectorAll(".menu-category");

function showMenuCategory(categoryId) {
  const selectedId = document.getElementById(categoryId)?.classList.contains("menu-category")
    ? categoryId
    : "breakfast";

  menuCategories.forEach((category) => {
    category.classList.toggle("active", category.id === selectedId);
  });

  menuLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${selectedId}`);
  });
}

menuLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const categoryId = link.getAttribute("href").replace("#", "");
    showMenuCategory(categoryId);
    history.replaceState(null, "", `#${categoryId}`);
  });
});

showMenuCategory(location.hash.replace("#", "") || "breakfast");

whatsappReviewButton.addEventListener("click", () => {
  if (!feedbackForm.reportValidity()) {
    return;
  }

  const data = new FormData(feedbackForm);
  const message = [
    "Cafe Daya review or complaint",
    `Contact: ${data.get("Contact")}`,
    `Review about: ${data.get("Review about")}`,
    `Message: ${data.get("Message")}`
  ].join("\n");

  window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
});
