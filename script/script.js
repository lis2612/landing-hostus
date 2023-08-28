const cards = document.getElementsByClassName("quality__card");

const toggleActiveCard = function (el) {
  if (el.classList.contains("quality__card_active")) el.classList.remove("quality__card_active");
  else el.classList.add("quality__card_active");
};

for (let i = 0; i < cards.length; i++) {
  let timerId = setTimeout(function tick() {
    toggleActiveCard(cards[i]);
    setTimeout(() => toggleActiveCard(cards[i]), 2000);
    timerId = setTimeout(tick, 2000 * cards.length);
  }, i*2000 );
}



// ---------------- SLIDER ---------------------
// Get elements from page
const slides = document.getElementsByClassName("slide");
const slider = document.querySelector(".slider");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

// Get slider dimensions
const sliderRect = {
  left: 0,
  right: slider.offsetWidth,
  top: 0,
  bottom: slider.offsetHeight,
  width: slider.offsetWidth,
  height: slider.offsetHeight,
  centerX: slider.offsetWidth / 2,
  centerY: slider.offsetHeight / 2,
};

// Get active slide element
const activeSlide = document.getElementsByClassName("slide_active")[0];

// Get active slide dimensions
const activeRect = {
  left: activeSlide.offsetLeft,
  right: activeSlide.offsetLeft + activeSlide.offsetWidth,
  top: activeSlide.offsetTop,
  bottom: activeSlide.offsetTop + activeSlide.clientHeight,
  width: activeSlide.offsetWidth,
  height: activeSlide.offsetHeight,
  centerX: activeSlide.offsetLeft + activeSlide.offsetWidth / 2,
  centerY: activeSlide.offsetTop + activeSlide.offsetHeight / 2,
};

// Clear setted styles function
function clearStyles(el) {
  el.style.translate = "";
  el.style.height = "";
  el.style.width = "";
  el.style.scale = "";
  el.style.left = "";
  el.style.top = "";
}

// Get active slide index in slides array
function findActiveSlideIndex(elCollection) {
  for (let i = 0; i < elCollection.length; i++) {
    if (elCollection[i].classList.contains("slide_active")) return i;
  }
}

// Shake slides function
function shakeElements(elCollection) {
  // Get array of element sizes
  const sizesArr = scale(elCollection);
  // console.clear();
  let i = 0;
  for (el of elCollection) {
    // If element is not active calculate position
    if (!el.classList.contains("slide_active")) {
      let left = Math.random() * sliderRect.width;
      if (i < elCollection.length / 2) {
        left = left - sliderRect.width / 2;
      } else {
        left = left + sliderRect.width / 2;

      }

      if (left >= sliderRect.right - sizesArr[i]) left = sliderRect.right - sizesArr[i];
      if (left <= sliderRect.left + sizesArr[i]) left = sliderRect.left + sizesArr[i];


      let top = Math.random() * sliderRect.height;
      if (top >= sliderRect.bottom - sizesArr[i]) top = sliderRect.height - sizesArr[i];

      if (
        left <= activeRect.right &&
        left + sizesArr[i] >= activeRect.left &&
        top <= activeRect.bottom &&
        top + sizesArr[i] >= activeRect.top
      ) {
        if (i < elCollection.length / 2) {
          left = activeRect.left -sizesArr[i];
        } else {
          left = activeRect.right;
        }

        // if (activeRect.left - left + sizesArr[i] < activeRect.right - left) {
        //   left = left + activeRect.right - left;
        // } else {
        //   left = left - activeRect.left - left + sizesArr[i];
        // }

        if (activeRect.bottom - top > top + sizesArr[i] - activeRect.top) {
          top = top + activeRect.bottom - top;
        } else {
          top = top - top + sizesArr[i] - activeRect.top;
        }
      }

      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
    } else {
      // If element is active clear inline styles and do nothing
      clearStyles(el);
    }
    i++;
  }
}

// Scaling slides function
// The further the slide is from the active one, the smaller it is.
function scale(elCollection) {
  let activeSlideIndx = findActiveSlideIndex(elCollection);
  // Multiplier for each next element's size. The size is calculated relative to the size of the active element
  let scale=0.5;
  let elSizes = [];
  for (let i = 0; i < elCollection.length; i++) {
    elSizes[i] = 1;
  }
  for (let i = 1; i < elCollection.length; i++) {
    if (activeSlideIndx + i < elCollection.length) {
      elCollection[activeSlideIndx + i].style.height = `${activeRect.height * (scale)}px`;
      elCollection[activeSlideIndx + i].style.width = `${activeRect.width * (scale)}px`;
      elSizes[activeSlideIndx + i] = activeRect.height * (scale - i / 10);
    }

    if (activeSlideIndx - i >= 0) {
      elCollection[activeSlideIndx - i].style.height = `${activeRect.height * (scale)}px`;
      elCollection[activeSlideIndx - i].style.width = `${activeRect.width * (scale)}px`;
      elSizes[activeSlideIndx - i] = activeRect.height * (scale - i / 10);
    }
  }
  return elSizes;
}

// Set next slide to active
function nextSlide(elCollection) {
  let centeredElementIdx = findActiveSlideIndex(elCollection);
  elCollection[centeredElementIdx].classList.remove("slide_active");
  centeredElementIdx++;
  if (centeredElementIdx == elCollection.length) centeredElementIdx = 0;
  elCollection[centeredElementIdx].classList.add("slide_active");
  shakeElements(slides);
}

// Set previous slide to active
function prevSlide(elCollection) {
  let centeredElementIdx = findActiveSlideIndex(elCollection);
  elCollection[centeredElementIdx].classList.remove("slide_active");
  centeredElementIdx--;
  if (centeredElementIdx < 0) centeredElementIdx = elCollection.length - 1;
  elCollection[centeredElementIdx].classList.add("slide_active");
  shakeElements(slides);
}

// Set clicked slide to active
function clickSlide(el, elCollection) {
  let activeSlideIndx = findActiveSlideIndex(elCollection);
  elCollection[activeSlideIndx].classList.remove("slide_active");
  el.classList.add("slide_active");
  shakeElements(elCollection);
}

shakeElements(slides);

// Listener for button and slides
// nextButton.addEventListener("click", () => nextSlide(slides));
// prevButton.addEventListener("click", () => prevSlide(slides));

let repeatSlidesTimer=setInterval(() => {
  nextSlide(slides)
}, 5000);


for (el of slides) {
  el.addEventListener("click", (e) => {
    clickSlide(e.currentTarget, slides)
    clearInterval(repeatSlidesTimer)
    setTimeout(() => {
      repeatSlidesTimer = setInterval(() => {
        nextSlide(slides);
      }, 2000);
    }, 5000);
  });
}



//TODO: fix overhidden elements
// TODO: clear code
