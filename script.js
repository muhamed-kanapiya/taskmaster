document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".review-container");
  const reviews = document.querySelectorAll(".review-card");
  const numReviews = reviews.length;
  const reviewsPerSlide = 3;
  const numSlides = Math.ceil(numReviews / reviewsPerSlide);
  let currentSlide = 0;

  const dotsContainer = document.querySelector(".dots");

  // Create dots dynamically based on the number of slides
  for (let i = 0; i < numSlides + 1; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.dataset.slide = i;
    dotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll(".dot");

  // Function to update the slide position
  function updateSlidePosition() {
    container.style.transform = `translateX(-${
      currentSlide * (500 * reviewsPerSlide)
    }px)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  // Add event listeners to the dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      currentSlide = index;
      updateSlidePosition();
    });
  });

  // Initialize the slider
  updateSlidePosition();
});
