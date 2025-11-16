/**
 * Template Name: Instant
 * Template URL: https://bootstrapmade.com/newtemplate-bootstrap-website-template/
 * Updated: Jun 11 2025 with Bootstrap v5.3.6
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Initiate Pure Counter
   */
  // new PureCounter();

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector(".typed");
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(
      ".faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header"
    )
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();

////////TRANSLATE/////////

function changeLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);

  document.getElementById("langMenu").classList.add("hidden"); // menyuni yopish

  // Statiklar
  document.querySelectorAll("[data-uz]").forEach((el) => {
    const text = el.getAttribute("data-" + lang);
    if (text) {
      if ("placeholder" in el) {
        el.placeholder = text;
      } else {
        el.innerText = text;
      }
    }
  });

  // Dinamiklar
  if (fetchedData) {
    renderDynamicData(lang);
  }
}

let currentLang = localStorage.getItem("lang") || "uz";
let fetchedData = null;

// === API orqali ma’lumotlarni olish ===
fetch("https://alveron-production.up.railway.app/home/")
  .then((res) => res.json())
  .then((data) => {
    fetchedData = data;
    renderDynamicData(currentLang);
  });

// === Statik va dinamik matnlarni yangilovchi funksiya ===
function changeLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);

  // Statiklar
  document.querySelectorAll("[data-uz]").forEach((el) => {
    const text = el.getAttribute("data-" + lang);
    if (text) {
      if ("placeholder" in el) {
        el.placeholder = text;
      } else {
        el.innerText = text;
      }
    }
  });

  // Dinamiklar
  if (fetchedData) {
    renderDynamicData(lang);
  }
}

// === APIdan keladigan datani chiqarish ===
function renderDynamicData(lang) {
  let video = null;

  if (
    fetchedData &&
    fetchedData.simple_videos &&
    fetchedData.simple_videos.length > 0
  ) {
    video = fetchedData.simple_videos[0];
  }

  if (video) {
    const videoEl = document.getElementById("hero-bg-video");
    if (videoEl) {
      videoEl.src = video.video;
    }

    const titleEl = document.getElementById("video-title");
    if (titleEl) {
      titleEl.innerText = video["title_" + lang] || "";
    }

    const descEl = document.getElementById("video-description");
    if (descEl) {
      descEl.innerText = video["description_" + lang] || "";
    }
  }

  // Kategoriyalar
  const categoryList = document.querySelector("#category-links ul");
  if (
    categoryList &&
    fetchedData &&
    fetchedData.globals &&
    fetchedData.globals.length > 0
  ) {
    categoryList.innerHTML = "";

    for (let i = 0; i < fetchedData.globals.length; i++) {
      const cat = fetchedData.globals[i];
      const li = document.createElement("li");
      const a = document.createElement("a");

      a.textContent = cat["name_" + lang] || "";
      a.href = "local.html?id=" + cat.id;

      li.appendChild(a);
      categoryList.appendChild(li);
    }
  }
  const categoryBox = document.getElementById("category-box");

  // fetchedData — bu sizda API'dan kelgan ma'lumot
  if (
    categoryBox &&
    fetchedData &&
    fetchedData.globals &&
    fetchedData.globals.length > 0
  ) {
    categoryBox.innerHTML = "";

    fetchedData.globals.forEach((cat) => {
      const div = document.createElement("div");
      div.className =
        "p-4 rounded shadow-md hover:shadow-yellow-500 hover:bg-yellow-700 transition shadow-white text-center";

      div.onclick = () => {
        window.location.href = "local.html?id=" + cat.id;
      };
      // Agar sizda har bir kategoriyaga tegishli rasm bo‘lsa (masalan: cat.image)
      const imageUrl =
        cat.image || "https://via.placeholder.com/150x100?text=Image";

      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = cat["name_" + lang] || "";
      img.className = "w-full xl:h-26 md:h-32 object-cover rounded mb-3";

      const a = document.createElement("a");

      a.className =
        "text-lg font-bold text-white hover:text-yellow-500 flex items-center gap-2 justify-center";

      a.innerHTML = `<i class="fa-regular fa-circle-right"></i> ${
        cat["name_" + lang] || ""
      }`;

      div.appendChild(img);
      div.appendChild(a);
      categoryBox.appendChild(div);
    });
  }
}

// === Tilni tanlash ===
function setLang(lang) {
  localStorage.setItem("lang", lang);
  changeLang(lang); // DOMdagi data-uz, data-ru larni yangilaydi
  renderDynamicData(lang); // API dan kelgan data-larni ham yangilaydi
}

// === DOM yuklangach avtomatik tilni o‘rnatish ===
document.addEventListener("DOMContentLoaded", () => {
  changeLang(currentLang);
});

// === Til menyusini ochish/yopish ===
const langToggle = document.getElementById("langToggle");
const langMenu = document.getElementById("langMenu");

langToggle.addEventListener("click", () => {
  if (langMenu.classList.contains("scale-y-0")) {
    langMenu.classList.remove("scale-y-0", "opacity-0");
    langMenu.classList.add("scale-y-100", "opacity-100");
  } else {
    langMenu.classList.remove("scale-y-100", "opacity-100");
    langMenu.classList.add("scale-y-0", "opacity-0");
  }
});
// === Tashqariga bosilganda yopish ===
document.addEventListener("click", (e) => {
  if (!langMenu.contains(e.target) && !langToggle.contains(e.target)) {
    langMenu.classList.remove("scale-y-100", "opacity-100");
    langMenu.classList.add("scale-y-0", "opacity-0");
  }
});

function getCSRFToken() {
  const tokenRow = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="));

  return tokenRow ? tokenRow.split("=")[1] : null;
}
