// ---------- mobile menu ----------
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");
const closeMenu = () => document.body.classList.remove("show-mobile-menu");

menuOpenButton.addEventListener("click", () => {
  document.body.classList.toggle("show-mobile-menu");
});
menuCloseButton.addEventListener("click", closeMenu);

// close the menu after tapping a link, or pressing Escape
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", closeMenu);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// ---------- featured carousel ----------
(() => {
  const track = document.querySelector(".featured-track");
  if (!track) return;

  const cards = track.querySelectorAll(".featured-card");
  const dots = document.querySelectorAll(".carousel-dot");
  const prev = document.querySelector("#featured-prev");
  const next = document.querySelector("#featured-next");

  // how far one card moves (card width + gap)
  const getStep = () => cards[1].offsetLeft - cards[0].offsetLeft;

  next.addEventListener("click", () => {
    track.scrollBy({ left: getStep(), behavior: "smooth" });
  });

  prev.addEventListener("click", () => {
    track.scrollBy({ left: -getStep(), behavior: "smooth" });
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      track.scrollTo({ left: i * getStep(), behavior: "smooth" });
    });
  });

  function updateDots() {
    const index = Math.min(dots.length - 1, Math.round(track.scrollLeft / getStep()));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  track.addEventListener("scroll", updateDots);
  updateDots();
})();

// ---------- gallery wall ----------
(() => {
  const section = document.querySelector("#gallery");
  if (!section) return;

  const strip = document.querySelector("#gallery-strip");
  const bar = document.querySelector("#gallery-progress-bar");
  const items = strip.querySelectorAll(".gallery-item");
  let maxShift = 0;

  // clientWidth excludes the scrollbar, so the last picture isn't cut off
  const viewWidth = () => document.documentElement.clientWidth;

  function measure() {
    maxShift = Math.max(0, strip.offsetWidth - viewWidth());
    section.style.height = window.innerHeight + maxShift + "px";
    update();
  }

  function update() {
    const scrollable = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top;
    const progress = scrollable > 0 ? Math.min(1, Math.max(0, -top / scrollable)) : 0;

    strip.style.transform = `translateX(${-progress * maxShift}px)`;
    bar.style.width = progress * 100 + "%";
  }

  // arrows scroll the page by one picture
  const getStep = () => items[1].offsetLeft - items[0].offsetLeft;

  document.querySelector("#gallery-next").addEventListener("click", () => {
    window.scrollBy({ top: getStep(), behavior: "smooth" });
  });

  document.querySelector("#gallery-prev").addEventListener("click", () => {
    window.scrollBy({ top: -getStep(), behavior: "smooth" });
  });

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", measure);
  window.addEventListener("load", measure); // re-measure once images have loaded
  measure();
})();

// ---------- build product cards ----------
(() => {
  const list = document.querySelector(".products-list");
  const sizes = ["small", "medium", "large"];

  list.innerHTML = products.map((p) => `
    <li class="product-card">
      <img src="${p.image}" alt="${p.alt}" class="product-image"
           width="400" height="500" loading="lazy">
      <h3 class="product-name">${p.name}</h3>
      <p class="product-description">${p.description}</p>
      <fieldset class="product-sizes">
        <legend>Size</legend>
        ${sizes.map((s) => `
          <input type="radio" name="size-${p.id}" id="${p.id}-${s}" value="${s}">
          <label for="${p.id}-${s}">${s[0].toUpperCase() + s.slice(1)}</label>
        `).join("")}
      </fieldset>
    </li>
  `).join("");
})();

// ---------- build product cards ----------
(() => {
  const list = document.querySelector(".products-list");

  list.innerHTML = products.map((p) => `
    <li class="product-card">
      <a href="product.html?id=${p.id}" class="product-link">
        <img src="${p.image}" alt="${p.alt}" class="product-image"
             width="400" height="500" loading="lazy">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-description">${p.description}</p>
        <p class="product-price">₱${p.price.toLocaleString()}</p>
      </a>
    </li>
  `).join("");
})();