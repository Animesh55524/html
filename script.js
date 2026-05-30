// ================= HERO SLIDER =================
let heroIndex = 0;

const heroSlides = document.getElementById("heroSlides");
const heroThumbs = document.querySelectorAll(".hero-thumb");

function updateHeroSlider() {

  if (!heroSlides || heroThumbs.length === 0) return;

  heroSlides.style.transform = `translateX(-${heroIndex * 100}%)`;

  heroThumbs.forEach(thumb => {
    thumb.classList.remove("active");
  });

  heroThumbs[heroIndex].classList.add("active");
}

function nextHeroSlide() {
  heroIndex = (heroIndex + 1) % heroThumbs.length;
  updateHeroSlider();
}

function prevHeroSlide() {
  heroIndex = (heroIndex - 1 + heroThumbs.length) % heroThumbs.length;
  updateHeroSlider();
}

function goHeroSlide(index) {
  heroIndex = index;
  updateHeroSlider();
}

const hero = document.querySelector(".hero");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

if (hero && leftArrow && rightArrow) {

  hero.addEventListener("mousemove", (e) => {

    const width = hero.offsetWidth;
    const x = e.clientX;

    // LEFT
    if (x < width * 0.2) {
      leftArrow.style.opacity = "1";
    } else {
      leftArrow.style.opacity = "0";
    }

    // RIGHT
    if (x > width * 0.8) {
      rightArrow.style.opacity = "1";
    } else {
      rightArrow.style.opacity = "0";
    }

  });

}


// ================= ROOM SLIDERS =================
document.querySelectorAll(".slider").forEach(slider => {

  const images = slider.querySelectorAll("img");
  const prevBtn = slider.querySelector(".prev");
  const nextBtn = slider.querySelector(".next");

  if (images.length === 0) return;

  let index = 0;

  // CREATE DOTS
  const dotsContainer = document.createElement("div");
  dotsContainer.classList.add("dots");

  images.forEach((img, i) => {

    const dot = document.createElement("span");

    if (i === 0) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", (e) => {

      e.stopPropagation();
      changeSlide(i);

    });

    dotsContainer.appendChild(dot);

  });

  slider.appendChild(dotsContainer);

  const dots = dotsContainer.querySelectorAll("span");

  // CHANGE SLIDE FUNCTION
  function changeSlide(i) {

    images[index].classList.remove("active");
    dots[index].classList.remove("active");

    index = i;

    images[index].classList.add("active");
    dots[index].classList.add("active");

  }

  // NEXT BUTTON
  if (nextBtn) {

    nextBtn.addEventListener("click", (e) => {

      e.stopPropagation();

      changeSlide((index + 1) % images.length);

    });

  }

  // PREVIOUS BUTTON
  if (prevBtn) {

    prevBtn.addEventListener("click", (e) => {

      e.stopPropagation();

      changeSlide((index - 1 + images.length) % images.length);

    });

  }

  // IMAGE ZOOM
  slider.addEventListener("click", (e) => {

    if (e.target.tagName === "IMG") {
      slider.classList.toggle("zoom");
    }

  });

});


// ================= CARD 3D EFFECT =================
document.querySelectorAll(".card").forEach(card => {

  const slider = card.querySelector(".slider");

  if (!slider) return;

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 15;
    const rotateY = (x - centerX) / 15;

    slider.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;

  });

  card.addEventListener("mouseleave", () => {

    slider.style.transform = `
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;

  });

});


// ================= SLIDER HOVER EFFECT =================
document.querySelectorAll(".slider").forEach(slider => {

  slider.addEventListener("mouseenter", () => {
    slider.classList.add("active");
  });

  slider.addEventListener("mouseleave", () => {
    slider.classList.remove("active");
  });

});


// ================= GALLERY LIGHTBOX =================
const galleryImages = document.querySelectorAll(".gallery img");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.getElementById("close");
const nextBtnLightbox = document.getElementById("next");
const prevBtnLightbox = document.getElementById("prev");

let currentIndex = 0;
let zoomed = false;


// OPEN LIGHTBOX
galleryImages.forEach((img, index) => {

  img.addEventListener("click", () => {

    currentIndex = index;

    showImage();

    lightbox.style.display = "flex";

  });

});


// NEXT IMAGE
if (nextBtnLightbox) {

  nextBtnLightbox.onclick = (e) => {

    e.stopPropagation();

    currentIndex = (currentIndex + 1) % galleryImages.length;

    showImage();

  };

}


// PREVIOUS IMAGE
if (prevBtnLightbox) {

  prevBtnLightbox.onclick = (e) => {

    e.stopPropagation();

    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;

    showImage();

  };

}


// CLOSE LIGHTBOX
if (closeBtn) {

  closeBtn.onclick = () => {

    lightbox.style.display = "none";

    zoomed = false;

    lightboxImg.style.transform = "scale(1)";
    lightboxImg.style.transformOrigin = "center";

  };

}


// CLOSE WHEN CLICKING OUTSIDE IMAGE
if (lightbox) {

  lightbox.onclick = (e) => {

    if (e.target !== lightboxImg) {

      lightbox.style.display = "none";

      zoomed = false;

      lightboxImg.style.transform = "scale(1)";
      lightboxImg.style.transformOrigin = "center";

    }

  };

}


// KEYBOARD CONTROLS
document.addEventListener("keydown", (e) => {

  if (lightbox && lightbox.style.display === "flex") {

    if (e.key === "ArrowRight" && nextBtnLightbox) {
      nextBtnLightbox.click();
    }

    if (e.key === "ArrowLeft" && prevBtnLightbox) {
      prevBtnLightbox.click();
    }

    if (e.key === "Escape") {
      lightbox.style.display = "none";
    }

  }

});


// IMAGE ZOOM
if (lightboxImg) {

  lightboxImg.addEventListener("click", () => {

    zoomed = !zoomed;

    if (zoomed) {

      lightboxImg.classList.add("zoomed");
      lightboxImg.style.transform = "scale(2)";

    } else {

      lightboxImg.classList.remove("zoomed");
      lightboxImg.style.transform = "scale(1)";
      lightboxImg.style.transformOrigin = "center";

    }

  });

}


// IMAGE MOVE ZOOM
if (lightboxImg) {

  lightboxImg.addEventListener("mousemove", (e) => {

    if (!zoomed) return;

    const rect = lightboxImg.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    lightboxImg.style.transformOrigin = `${x}% ${y}%`;

  });

}


// SHOW IMAGE FUNCTION
function showImage() {

  if (!lightboxImg || galleryImages.length === 0) return;

  lightboxImg.src = galleryImages[currentIndex].src;

  zoomed = false;

  lightboxImg.classList.remove("zoomed");

  lightboxImg.style.transform = "scale(1)";
  lightboxImg.style.transformOrigin = "center";

}


// LIGHTBOX SIDE ARROWS
if (lightbox) {

  lightbox.addEventListener("mousemove", (e) => {

    const width = window.innerWidth;
    const x = e.clientX;

    // LEFT
    if (prevBtnLightbox) {

      if (x < width * 0.2) {
        prevBtnLightbox.style.opacity = "1";
      } else {
        prevBtnLightbox.style.opacity = "0";
      }

    }

    // RIGHT
    if (nextBtnLightbox) {

      if (x > width * 0.8) {
        nextBtnLightbox.style.opacity = "1";
      } else {
        nextBtnLightbox.style.opacity = "0";
      }

    }

  });

}


// ================= WHATSAPP BOOKING =================
function bookWhatsApp(e) {

  e.preventDefault();

  const name = e.target.name.value;
  const email = e.target.email.value;
  const checkin = e.target.checkin.value;
  const checkout = e.target.checkout.value;
  const room = e.target.room.value;

  const message = `🏨 *New Booking Request - Tharu Mango Garden Resort*

👤 Name: ${name}
📧 Email: ${email}
📅 Check-in: ${checkin}
📅 Check-out: ${checkout}
🛏 Room: ${room}

Please confirm availability.`;

  const phone = "9779825552438";

  const url =
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");

}
// ================= MOBILE MENU =================

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if(menuToggle && navbar){

  menuToggle.addEventListener("click", () => {

    navbar.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if(navbar.classList.contains("active")){
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    }else{
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }

  });

  // CLOSE MENU AFTER CLICK
  document.querySelectorAll("#navbar a").forEach(link => {

    link.addEventListener("click", () => {

      navbar.classList.remove("active");

      const icon = menuToggle.querySelector("i");

      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");

    });

  });

}

// ================= TEAM CAROUSEL =================

const teamCards = document.querySelectorAll(".team-card");
const teamDotsContainer = document.querySelector(".team-dots");

const teamData = [
  {
    name:"Radheshyam Tharu",
    role:"Owner & Founder"
  },
  {
    name:"Kiran Tharu",
    role:"Project Manager"
  },
  {
    name:"Karishma Tharu",
    role:"Marketing Head"
  },
  {
    name:"Animesh Chaudhary",
    role:"Web Developer"
  },
  {
    name:"Tulsi Tharu",
    role:"Manager"
  },
  {
    name:"Amit Tharu",
    role:"Chef"
  },
  {
    name:"Sita Tharu",
    role:"Cleaner"
  }
];

let currentTeam = 2;

// CREATE DOTS
teamCards.forEach((_, index) => {

  const dot = document.createElement("span");

  dot.classList.add("team-dot");

  teamDotsContainer.appendChild(dot);

});

const teamDots = document.querySelectorAll(".team-dot");

// UPDATE CAROUSEL
function updateTeamCarousel(){

  teamCards.forEach(card => {
    card.className = "team-card";
  });

  const total = teamCards.length;

  teamCards[currentTeam].classList.add("active");

  teamCards[(currentTeam - 1 + total) % total]
    .classList.add("left1");

  teamCards[(currentTeam - 2 + total) % total]
    .classList.add("left2");

  teamCards[(currentTeam - 3 + total) % total]
    .classList.add("left3");

  teamCards[(currentTeam + 1) % total]
    .classList.add("right1");

  teamCards[(currentTeam + 2) % total]
    .classList.add("right2");

  teamCards[(currentTeam + 3) % total]
    .classList.add("right3");

  document.getElementById("teamName").textContent =
    teamData[currentTeam].name;

  document.getElementById("teamRole").textContent =
    teamData[currentTeam].role;

  teamDots.forEach(dot => {
    dot.classList.remove("active");
  });

  teamDots[currentTeam].classList.add("active");

}

// NEXT
document.querySelector(".team-next").onclick = () => {

  currentTeam = (currentTeam + 1) % teamCards.length;

  updateTeamCarousel();

};

// PREV
document.querySelector(".team-prev").onclick = () => {

  currentTeam =
    (currentTeam - 1 + teamCards.length) % teamCards.length;

  updateTeamCarousel();

};

// AUTO SLIDE
setInterval(() => {

  currentTeam = (currentTeam + 1) % teamCards.length;

  updateTeamCarousel();

}, 4000);

updateTeamCarousel();