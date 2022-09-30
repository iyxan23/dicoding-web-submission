// Hover effect on surakarta imgs
const surakartaImgs = document.querySelectorAll("#surakarta-images > figure");

for (const img of surakartaImgs) {
    img.onmouseover = () => {
        img.querySelector("figcaption").style.opacity = 100;
    }

    img.onmouseleave = () => {
        img.querySelector("figcaption").style.opacity = 0;
    }
}

// sticky navbar
const bg = document.querySelector("#keraton-bg");
const nav = document.querySelector("body > header > nav");

onscroll = () => {
    if (window.scrollY > bg.offsetHeight) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
}

// carousel auto scroll
const carouselIntervalDelay = 10000;
const carouselCards = document.querySelector("#surakarta-images");
var carouselInterval;

onload = () => {
    carouselInterval = setInterval(carouselRight, carouselIntervalDelay);
}

var cardPositions = Array.from(
            document.querySelectorAll("#surakarta-images > figure").values()
        ).map((i) => i.offsetLeft);

var currentCardIndex = 0;

document.onresize = () => {
    cardPositions = Array.from(document.querySelectorAll("#carousel > #carousel-cards > .carousel-card").values()).map((i) => i.offsetLeft);
}

carouselCards.onscroll = () => {
    currentCardIndex = cardPositions.indexOf(
        cardPositions.reduce(
            (prev, curr) => Math.abs(curr - carouselCards.scrollLeft) < Math.abs(prev - carouselCards.scrollLeft) ? curr : prev)
    );
};

function carouselLeft() {
    if (currentCardIndex != 0) {
        currentCardIndex -= 1;
        carouselCards.scrollTo(cardPositions[currentCardIndex], 0);
    }
}

function carouselRight() {
    if (currentCardIndex < cardPositions.length) {
        currentCardIndex += 1;
        carouselCards.scrollTo(cardPositions[currentCardIndex], 0);
    }
}

var autoScrolling = true;
var interactionTimeout;
function notifyAutoScroll() {
    if (autoScrolling) {
        autoScrolling = false; // disable the autoscroll
        clearInterval(carouselInterval);

        if (interactionTimeout) {
            clearTimeout(interactionTimeout);
            interactionTimeout = null;
        }

        // wait for 10s if there hasn't been any user interaction
        interactionTimeout = setTimeout(() => {
            // we can start again
            autoScrolling = true;
            carouselInterval = setInterval(carouselRight, carouselIntervalDelay);
        }, 10000);
    }
}