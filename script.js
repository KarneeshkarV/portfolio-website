$(document).ready(function () {
  $(window).scroll(function () {
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }

    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
    $("html").css("scrollBehavior", "auto");
  });

  $(".navbar .menu li a").click(function () {
    $("html").css("scrollBehavior", "smooth");
  });

  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });

  $(".vim-help-toggle").click(function () {
    $(".vim-help").toggleClass("hidden");
    const isHidden = $(".vim-help").hasClass("hidden");
    localStorage.setItem("vimHelpHidden", isHidden);
  });

  if (localStorage.getItem("vimHelpHidden") === "true") {
    $(".vim-help").addClass("hidden");
  }

  var typed = new Typed(".typing", {
    strings: [
      "Software Engineer",
      "Full Stack Developer",
      "Problem Solver",
      "Tech Enthusiast",
    ],
    typeSpeed: 55,
    backSpeed: 35,
    loop: true,
  });

  var typed2 = new Typed(".typing-2", {
    strings: [
      "Software Engineer",
      "Full Stack Developer",
      "Problem Solver",
      "Tech Enthusiast",
    ],
    typeSpeed: 500,
    backSpeed: 60,
    loop: true,
  });

  $(".carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 3,
        nav: false,
      },
    },
  });

  function animateSkillBars() {
    const skillSection = document.getElementById("tech-skills");
    if (!skillSection) return;
    const bars = document.querySelectorAll(
      ".skills .skills-content .column.right .bars .line"
    );
    const sectionTop = skillSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (sectionTop < windowHeight - 100) {
      bars.forEach((bar) => {
        bar.classList.add("animated");
      });
      window.removeEventListener("scroll", animateSkillBars);
    }
  }
  window.addEventListener("scroll", animateSkillBars);
  animateSkillBars();

  function animateTimeline() {
    const timelineItems = document.querySelectorAll(".timeline-item");
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    timelineItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < windowHeight - 100) {
        item.classList.add("timeline-animate--visible");
      }
    });
  }
  window.addEventListener("scroll", animateTimeline);
  animateTimeline();

  const scrollAmount = 700;
  const ggTimeout = 500;
  let lastKeyPressTime = 0;
  let lastKey = "";
  let colonPressed = false;

  $(document).on("keydown", function (event) {
    const targetTagName = event.target.tagName.toLowerCase();
    const isContentEditable = event.target.isContentEditable;

    if (
      targetTagName === "input" ||
      targetTagName === "textarea" ||
      isContentEditable
    ) {
      if (event.key === "g") {
        lastKey = "";
      }
      colonPressed = false;
      return;
    }

    const now = Date.now();

    if (event.key === ":") {
      colonPressed = true;
      event.preventDefault();
      return;
    }

    if (colonPressed && event.key === "q") {
      if (confirm("Do you want to exit this website?")) {
        window.close();
        if (window.location.href) {
          window.location.href = "about:blank";
        }
      }
      colonPressed = false;
      event.preventDefault();
      return;
    }

    if (colonPressed && event.key !== "q") {
      colonPressed = false;
    }

    switch (event.key) {
      case "j":
        window.scrollBy({
          top: scrollAmount,
          behavior: "auto",
        });
        lastKey = "";
        break;
      case "k":
        window.scrollBy({
          top: -scrollAmount,
          behavior: "auto",
        });
        lastKey = "";
        break;
      case "g":
        if (lastKey === "g" && now - lastKeyPressTime < ggTimeout) {
          window.scrollTo({
            top: 0,
            behavior: "auto",
          });
          lastKey = "";
        } else {
          lastKey = "g";
          lastKeyPressTime = now;
        }
        break;
      case "G":
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "auto",
        });
        lastKey = "";
        break;
      case "?":
        $(".vim-help").toggleClass("hidden");
        lastKey = "";
        break;
      default:
        lastKey = "";
        break;
    }

    if (
      [":", "j", "k", "g", "G", "?"].includes(event.key) &&
      !isContentEditable &&
      targetTagName !== "input" &&
      targetTagName !== "textarea"
    ) {
      event.preventDefault();
    }
  });

  $(window).on("blur", function () {
    lastKey = "";
    lastKeyPressTime = 0;
    colonPressed = false;
  });

  if (typeof gsap !== "undefined") {
    gsap.set(".ball", { xPercent: -50, yPercent: -50 });

    const ball = document.querySelector(".ball");
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.08;

    const xSet = gsap.quickSetter(ball, "x", "px");
    const ySet = gsap.quickSetter(ball, "y", "px");

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;

      xSet(pos.x);
      ySet(pos.y);
    });

    const interactiveElements = document.querySelectorAll(
      "a, button, kbd, .menu-btn, .vim-help-toggle, .scroll-up-btn"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(ball, { duration: 0.2, scale: 1.3, autoAlpha: 0.7 });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(ball, { duration: 0.2, scale: 1, autoAlpha: 1 });
      });
    });
  } else {
    console.error("GSAP library not loaded. Mouse trail effect requires GSAP.");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll("#heartfelt-design .service-card");

    function setActiveCard(cardToActivate) {
      console.warn("setActiveCard function needs rewrite for inline styles.");
      cards.forEach((c) => {
        if (c !== cardToActivate) {
          c.classList.remove("active");
        }
      });
      if (cardToActivate) {
        cardToActivate.classList.add("active");
      }
    }

    cards.forEach((card) => {
      card.addEventListener("click", function () {
        this.style.transform = "scale(0.98)";
        setTimeout(() => {
          if (!this.classList.contains("active")) {
            this.style.transform = "translateY(0px)";
          } else {
            this.style.transform = "translateY(-6px)";
          }
          console.warn("Card click handler needs rewrite for inline styles.");
        }, 100);
      });

      card.addEventListener("mouseleave", function () {
        if (!this.classList.contains("active")) {
          if (!this.style.transform || !this.style.transform.includes("scale")) {
            this.style.transform = "";
          }
        } else {
          if (!this.style.transform || !this.style.transform.includes("scale")) {
            this.style.transform = "translateY(-6px)";
          }
        }
      });
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const serviceCards = document.querySelectorAll(".service-card");
    const experienceCards = document.querySelectorAll(".experience .card");
    const projectCards = document.querySelectorAll(".projects .card");
    const allCards = [...serviceCards, ...experienceCards, ...projectCards];

    allCards.forEach((card) => card.classList.add("card-animate"));

    const observer = new window.IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("card-animate--visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    allCards.forEach((card) => observer.observe(card));
  });
});

// Terminal copy function
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(function() {
    // Show a brief success message
    const btn = event.target.closest('.copy-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    btn.style.backgroundColor = '#28ca42';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.backgroundColor = '#8a4fff';
    }, 2000);
  }).catch(function(err) {
    console.error('Failed to copy: ', err);
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      const btn = event.target.closest('.copy-btn');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      btn.style.backgroundColor = '#28ca42';

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = '#8a4fff';
      }, 2000);
    } catch (err) {
      console.error('Fallback copy failed: ', err);
    }
    document.body.removeChild(textArea);
  });
}