!(function (o, c) {
  var n = c.documentElement,
    t = " w-mod-";
  (n.className += t + "js"),
    ("ontouchstart" in o ||
      (o.DocumentTouch && c instanceof DocumentTouch)) &&
      (n.className += t + "touch");
})(window, document);



function is_touch_device() {
  try {
    return document.createEvent("TouchEvent"), !0;
  } catch (o) {
    return !1;
  }
}
if (!is_touch_device()) {
  function initSmoothScroll() {
    const el = document.querySelector("[data-scroll-container]");
    const isHorizontal = el.dataset.scrollDirection === "horizontal";
    window.locomotive = new LocomotiveScroll({
      el,
      smooth: true,
      direction: isHorizontal ? "horizontal" : "vertical",
      gestureDirection: isHorizontal ? "both" : "vertical"
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initSmoothScroll();
  });
}

import PaperCurtainEffect from "https://cdn.jsdelivr.net/gh/niccolomiranda/portfolio@fa29f26/paper-curtain.mjs";

const isMobile = window.innerWidth <= 991;
const isHorizontal =
  document.querySelector("[data-scroll-container]").dataset
    .scrollDirection === "horizontal";

const belowCanvas = document.querySelector("#below-canvas");
const aboveCanvas = document.querySelector("#above-canvas");

// console.log('canvas: ', aboveCanvas);
// console.log('is Horizontal: ', isHorizontal && !isMobile)

const paperCurtainEffect = new PaperCurtainEffect(aboveCanvas, {
  color: "#1D1D1B",
  background: "#000000",
  backgroundOpacity: 0,
  ease: "power3.inOut",
  duration: 2,
  texture:
    "https://uploads-ssl.webflow.com/5f2429f172d117fcee10e819/614f353f1e11a6a7afdd8b74_6059a3e2b9ae6d2bd508685c_pt-texture-2.jpg",
  amplitude: 0.25,
  rippedFrequency: 3.5,
  rippedAmplitude: 0.05,
  curveFrequency: 1,
  curveAmplitude: 0.1,
  rippedDelta: 1,
  rippedHeight: 0.07,
  horizontal: isHorizontal && !isMobile
});

// console.log('effect: ', paperCurtainEffect);

window.paperCurtainEffect = paperCurtainEffect;

if (window.location.href.includes("?")) {
  app.classList.add("appear");
}
if (
  window.location.pathname !== "/" &&
  !window.location.pathname.includes("/work/") &&
  !window.location.href.includes("?")
) {
  window.belowPaperCurtainEffect = new PaperCurtainEffect(belowCanvas, {
    color: "#cdc6be",
    background: "#1D1D1B",
    backgroundOpacity: 1,
    ease: "power3.inOut",
    duration: 2,
    texture:
      "https://uploads-ssl.webflow.com/5f2429f172d117fcee10e819/614f353f1e11a6a7afdd8b74_6059a3e2b9ae6d2bd508685c_pt-texture-2.jpg",
    amplitude: 0.25,
    rippedFrequency: 3.5,
    rippedAmplitude: 0.05,
    curveFrequency: 1,
    curveAmplitude: 0.1,
    rippedDelta: 1,
    rippedHeight: 0.07,
    horizontal: false
  });

  //const image = document.querySelector("[data-image]")
  //if(image) {
  //  const src = image.getAttribute("data-image")
  //  window.belowPaperCurtainEffect.curtain.setImage(image)
  //}

  // console.log('in init')
  window.belowPaperCurtainEffect.in();
  const app = document.querySelector("#app");
  setTimeout(() => {
    app.classList.add("appear");
  }, 2000);
}

//Work page
const navWorkPage = document.querySelector(".nav.work");
if (navWorkPage) {
  const workCanvas = navWorkPage.querySelector(".gl-canvas canvas");
  window.workPaperCurtainEffect = new PaperCurtainEffect(workCanvas, {
    color: "#1D1D1B",
    background: "#000000",
    backgroundOpacity: 0,
    ease: "power3.inOut",
    duration: 2,
    texture:
      "https://uploads-ssl.webflow.com/5f2429f172d117fcee10e819/614f353f1e11a6a7afdd8b74_6059a3e2b9ae6d2bd508685c_pt-texture-2.jpg",
    amplitude: 0.25,
    rippedFrequency: 3.5,
    rippedAmplitude: 0.05,
    curveFrequency: 1,
    curveAmplitude: 0.1,
    rippedDelta: 1,
    rippedHeight: 0.07,
    horizontal: isHorizontal && !isMobile
  });
}

let toggle = false;
let transition = false;

function onNavClick(e) {
  // console.log('listener 1', transition)

  if (transition) return;
  toggle = !toggle;

  if (toggle) {
    // console.log('in menu')
    document.querySelector("nav.nav .menu").style.display = "flex";
    window.paperCurtainEffect.in();
  } else {
    // console.log('out menu')
    window.paperCurtainEffect.out();

    setTimeout(() => {
      document.querySelector("nav.nav .menu").style.display = "none";
    }, 400);
  }
}

function onWorkNavClick(e) {
  // console.log('listener 1', transition)

  if (transition) return;
  toggle = !toggle;

  if (toggle) {
    // console.log('in work nav')
    window.workPaperCurtainEffect.in();
  } else {
    // console.log('out work nav')
    window.workPaperCurtainEffect.out();
  }
}

document.querySelector(".nav-link").addEventListener("click", onNavClick);

//Work page
const navWorkPage = document.querySelector(".nav.work");
if (navWorkPage) {
  navWorkPage
    .querySelector(".nav-block.r")
    .addEventListener("click", onWorkNavClick);
}

const internalLinks = [...document.querySelectorAll("a")].filter((link) =>
  link.href.includes(document.location.host)
);

internalLinks.forEach((link) => {
  const href = link.href;

  // Work single page template, transition won't work for some reason so i'm disabling it on this button
  if (link.classList.contains("back-all")) return;

  link.addEventListener("click", async function (e) {
    let hrefPointer = location.href;
    // console.log('listener 2', 'transition: ', transition, 'toggle: ', toggle)
    e.preventDefault();
    //debugger;
    if (transition) return;
    transition = true;
    //debugger;
    const color = link.getAttribute("data-color") || "#1D1D1B";
    const img = link.querySelector("[data-image]");
    let image = undefined;
    if (img) {
      //debugger;
      image = img.getAttribute("data-image");
      //debugger;
    }

    if (toggle) {
      //debugger;
      // console.log('out')
      if (navWorkPage) {
        window.workPaperCurtainEffect.curtain.setBackground(color, 1);
        window.workPaperCurtainEffect.out();
      } else {
        window.paperCurtainEffect.curtain.setBackground(color, 1);
        window.paperCurtainEffect.out();
      }
    } else {
      //debugger;
      // console.log('in set image rotate')
      window.paperCurtainEffect.curtain.setColor(color, 1);
      window.paperCurtainEffect.curtain.uniforms.uHorizontal.value = 0;
      if (image) {
        await window.paperCurtainEffect.curtain.setImage(image);
      }

      window.paperCurtainEffect.canvas.style.transform = "rotate(180deg)";
      window.paperCurtainEffect.curtain.setInverted(true);
      window.paperCurtainEffect.in();
    }

    // This is an attempt to fix bugs
    setTimeout(() => {
      // console.log('transition false timeout')
      transition = false;
      //   window.location.href = href;
    }, 1500);

    const nav = document.querySelector("nav.nav");
    let fadeEls;

    const el = document.querySelector("[data-scroll-container]");
    const isHorizontal = el.dataset.scrollDirection === "horizontal";

    if (toggle) {
      // console.log('hide navbar toggle menu')
      nav.classList.remove("hide"); // fixes bug
      if (navWorkPage) {
        fadeEls = navWorkPage.querySelectorAll(
          ".nav-head, .nav-block, .menu-line, .paper-background"
        );
      } else {
        fadeEls = nav.querySelectorAll(
          ".nav-head, .nav-block, .menu-line, .paper-background"
        );
      }
      if (nav || navWorkPage) {
        fadeEls.forEach((el) => {
          gsap.to(el, { opacity: 0, duration: 0.6, ease: Expo.easeOut });
        });
      } else {
        console.warn("no navbar to hide");
      }
    } else {
      // console.log('hide navbar not menu')
      if (nav) {
        nav.querySelector(".gl-canvas").style.zIndex = "9999";
      } else {
        console.warn("no navbar to hide");
      }
    }

    document.body.addEventListener(
      "paper-curtain",
      function (e) {
        //debugger;
        // console.log(href);
        window.location.href = href;
      },
      { once: true }
    );

    setTimeout(() => {
      //debugger;
      // console.log('link timeout', href);
      if (window.location.href === hrefPointer) return;
      window.location.href = href;
    }, 2500);
  });
});


if (typeof vh === "undefined") {
  //100vh Fix on Mobile
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
}


document.addEventListener("DOMContentLoaded", function () {
  const sliders = butterSlider.autoInit();
  console.log(sliders);

  sliders[0].smoothAmount = 1;
  sliders[0].setRelativePosition(
    window.innerWidth * (0.62 / sliders[0].dragSpeed)
  );
  sliders[0].smoothAmount = 0.15;
});



function setPathnameClass() {
  const regex = /(?<=work\/).*$/gm;
  const match = regex.exec(window.location.pathname);
  if (!match) return;
  document.querySelector("body").classList.add(match[0]);
}
setPathnameClass();



window.scrollTo(0, 0);
    if (window.innerWidth >= 768) {
      document.documentElement.classList.add("no-scroll");

      setTimeout(() => {
        const nav = document
          .querySelector("nav.nav")
          .style.removeProperty("transform");
        document.documentElement.classList.remove("no-scroll");
      }, 5000);
    }




document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    if (!window.locomotive) return;
    // prevent scroll durin appear animation
    window.locomotive.stop();

    setTimeout(() => {
      window.locomotive.update();
    }, 0);

    setTimeout(() => {
      window.locomotive.update();
      window.locomotive.start();
    }, 5000);
    // prevent scroll durin appear animation
  }, 0);
});