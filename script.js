
// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// CTA button press animation + alert
const ctaBtn = document.querySelector('.cta-button');
if (ctaBtn) {
  ctaBtn.addEventListener('click', () => {
    ctaBtn.classList.add('pressed');
    setTimeout(() => {
      ctaBtn.classList.remove('pressed');
      alert('Let’s get you started!');
      console.log('User clicked: Get Started');
    }, 200);
  });
}

// Ticker pause on hover
const ticker = document.querySelector('.ticker');
const tickerWrap = document.querySelector('.ticker-wrap');
if (ticker && tickerWrap) {
  tickerWrap.addEventListener('mouseover', () => {
    ticker.style.animationPlayState = 'paused';
  });
  tickerWrap.addEventListener('mouseout', () => {
    ticker.style.animationPlayState = 'running';
  });
}

// Fun fact toggle in story section
const storySection = document.querySelector('.story-text');
if (storySection) {
  const funFact = document.createElement('p');
  funFact.textContent = '🎓 Fun Fact: The first version of NetsaEDU was built in a dorm room!';
  funFact.style.display = 'none';
  funFact.style.marginTop = '10px';
  funFact.style.fontStyle = 'italic';
  funFact.style.color = '#395886';
  storySection.appendChild(funFact);
  storySection.addEventListener('click', () => {
    funFact.style.display = funFact.style.display === 'none' ? 'block' : 'none';
  });
}

// Feature hover and click log
document.querySelectorAll('.feature-box').forEach(box => {
  box.addEventListener('mouseenter', () => {
    box.style.transform = 'scale(1.05)';
    box.style.transition = 'transform 0.3s ease';
  });
  box.addEventListener('mouseleave', () => {
    box.style.transform = 'scale(1)';
  });
  box.addEventListener('click', () => {
    const feature = box.querySelector('h3')?.textContent;
    if (feature) {
      console.log(`User is interested in: ${feature}`);
    }
  });
});

// Highlight active nav link on click
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function () {
    navLinks.forEach(l => l.classList.remove('active-nav'));
    this.classList.add('active-nav');
  });
});

// Sticky nav and background fade on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header?.classList.add('sticky');
  } else {
    header?.classList.remove('sticky');
  }

  // Scroll Spy: highlight current section in nav
  document.querySelectorAll('section').forEach(section => {
    const top = window.scrollY;
    const offset = section.offsetTop - 100;
    const height = section.offsetHeight;
    const id = section.getAttribute('class');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (id && link.getAttribute('href').includes(id)) {
          link.classList.add('active-nav');
        }
      });
    }
  });
});

// Hamburger menu toggle for mobile
const mobileNav = document.querySelector('.hamburger');
mobileNav?.addEventListener('click', () => {
  document.querySelector('.nav-links')?.classList.toggle('show');
});

// Flip testimonial on hover (no click)
document.querySelectorAll('.testimonial').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('expanded');
  });
  card.addEventListener('mouseleave', () => {
    card.classList.remove('expanded');
  });
});

// FAQ toggle functionality
document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    if (answer) {
      answer.style.display = answer.style.display === "block" ? "none" : "block";
    }
  });
});

// Team member image interaction
document.querySelectorAll(".member").forEach(member => {
  const name = member.querySelector("h4")?.textContent;
  const role = member.querySelector("p")?.textContent;
  const img = member.querySelector("img");

  if (img && name && role) {
    img.addEventListener("click", () => {
      alert(`${name}: ${role}`);
    });
  }
});
// === Helper: Show popup message ===
function showPopup(message, type = "success") {
  const popup = document.createElement("div");
  popup.className = `popup ${type}`;
  popup.innerText = message;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add("show");
  }, 10);

  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => {
      if (popup.parentNode) {
        popup.parentNode.removeChild(popup);
      }
    }, 300);
  }, 3000);
}

// === Chatbot toggle logic ===
const chatbotToggle = document.querySelector(".chatbot-toggle");
const chatbotContainer = document.querySelector(".chatbot-floating-container");

chatbotToggle.addEventListener("click", () => {
  chatbotContainer.classList.toggle("visible");
});

// === Chatbot submit handler ===
document.querySelector(".chatbot-submit").addEventListener("click", () => {
  const input = document.getElementById("chatbot-input");
  const question = input.value.trim();

  if (question) {
    showPopup(`NestaBot received: "${question}"`, "success");
    input.value = "";
  } else {
    showPopup("Please type a question.", "error");
  }
});
// Back to Top Button
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// === Contact form submission handler ===
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email) {
    showPopup("Please fill out all required fields.", "error");
    return;
  }

  // Simulate success
  showPopup(`Thank you, ${name}! Your message has been sent.`, "success");

  // Clear form
  this.reset();
});

