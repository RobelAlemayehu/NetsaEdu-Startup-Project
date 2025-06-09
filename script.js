// Smooth scroll + active nav link using event delegation
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');

nav?.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    e.preventDefault();

    // Smooth scroll
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });

    // Active nav link highlight
    navLinks.forEach(link => link.classList.remove('active-nav'));
    e.target.classList.add('active-nav');
  }
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
  funFact.textContent = '🎓 Fun Fact: The first version of NetsaEdu was built in a dorm room!';
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

// Sticky nav and background fade on scroll + Scroll Spy for current section highlight
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header?.classList.add('sticky');
  } else {
    header?.classList.remove('sticky');
  }

  // Scroll Spy
  const top = window.scrollY;
  document.querySelectorAll('section').forEach(section => {
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

// FAQ toggle functionality with keyboard accessibility
document.querySelectorAll(".faq-question").forEach(button => {
  button.setAttribute('tabindex', 0); // make focusable
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    if (answer) {
      answer.style.display = answer.style.display === "block" ? "none" : "block";
      button.setAttribute('aria-expanded', answer.style.display === "block");
    }
  });
  button.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      button.click();
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

//  Helper: Show popup message
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

//Contact form submission handler 
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

// Visitor Counter
const visitCountEl = document.getElementById('visit-count');
if (visitCountEl) {
  let visits = localStorage.getItem('visitCount');
  visits = visits ? parseInt(visits) + 1 : 1;
  localStorage.setItem('visitCount', visits);
  visitCountEl.textContent = visits;
}

// Audience Toggle Switch
const btnHigh = document.getElementById('toggle-high');
const btnUni = document.getElementById('toggle-uni');
const highContent = document.getElementById('high-content');
const uniContent = document.getElementById('uni-content');

if (btnHigh && btnUni && highContent && uniContent) {
  function toggleAudience(toHigh) {
    if (toHigh) {
      btnHigh.classList.add('active');
      btnUni.classList.remove('active');
      highContent.classList.add('active');
      uniContent.classList.remove('active');
      setTimeout(() => {
        uniContent.style.display = 'none';
        highContent.style.display = 'block';
      }, 400);
    } else {
      btnUni.classList.add('active');
      btnHigh.classList.remove('active');
      uniContent.classList.add('active');
      highContent.classList.remove('active');
      setTimeout(() => {
        highContent.style.display = 'none';
        uniContent.style.display = 'block';
      }, 400);
    }
  }

  // Initialize content display block
  highContent.style.display = 'block';
  uniContent.style.display = 'none';

  btnHigh.addEventListener('click', () => toggleAudience(true));
  btnUni.addEventListener('click', () => toggleAudience(false));
}
