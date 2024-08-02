document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".review-container");
  const reviews = document.querySelectorAll(".review-card");
  const numReviews = reviews.length;
  const reviewsPerSlideDesktop = 3;
  const reviewsPerSlideMobile = 1;
  let currentSlide = 0;

  const dotsContainer = document.querySelector(".dots");

  function getSlideCount() {
    return window.innerWidth > 768
      ? reviewsPerSlideDesktop
      : reviewsPerSlideMobile;
  }

  function getCardWidth() {
    return window.innerWidth > 768 ? 500 : 343;
  }

  function getNumSlides() {
    return Math.ceil(numReviews / getSlideCount());
  }

  function createDots() {
    dotsContainer.innerHTML = ""; // Clear existing dots
    const numSlides = getNumSlides();
    for (let i = 0; i < numSlides; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.dataset.slide = i;
      dotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.addEventListener("click", function () {
        currentSlide = index;
        updateSlidePosition();
      });
    });
  }

  // Function to update the slide position
  function updateSlidePosition() {
    const cardWidth = getCardWidth();
    const reviewsPerSlide = getSlideCount();
    container.style.transform = `translateX(-${
      currentSlide * (cardWidth * reviewsPerSlide)
    }px)`;

    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  // Variables to track touch events
  let startX;
  let isDragging = false;

  // Function to handle touch start event
  function onTouchStart(e) {
    startX = e.touches[0].clientX;
    isDragging = true;
    container.style.transition = "none"; // Disable transition for immediate feedback
  }

  // Function to handle touch move event
  function onTouchMove(e) {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;

    // Move the container based on the touch movement
    container.style.transform = `translateX(${
      -currentSlide * (getCardWidth() * getSlideCount()) + diffX
    }px)`;
  }

  // Function to handle touch end event
  function onTouchEnd(e) {
    isDragging = false;
    container.style.transition = "transform 0.5s ease"; // Re-enable transition

    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;

    // Determine the direction of the swipe
    if (diffX > 50) {
      // Swipe right
      currentSlide = Math.max(currentSlide - 1, 0);
    } else if (diffX < -50) {
      // Swipe left
      currentSlide = Math.min(currentSlide + 1, getNumSlides() - 1);
    }

    updateSlidePosition();
  }

  // Add touch event listeners to the container
  container.addEventListener("touchstart", onTouchStart);
  container.addEventListener("touchmove", onTouchMove);
  container.addEventListener("touchend", onTouchEnd);

  // Add a resize event listener to adjust slides on window resize
  window.addEventListener("resize", () => {
    createDots();
    updateSlidePosition();
  });

  // Initialize the slider
  createDots();
  updateSlidePosition();
});
