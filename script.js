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
const chatbotToggles = document.querySelectorAll(".chatbot-toggle");
const chatbotContainer = document.querySelector(".chatbot-floating-container");

chatbotToggles.forEach(toggle => {
  toggle.addEventListener("click", () => {
    chatbotContainer.classList.toggle("visible");
  });
});

// === Chatbot AI Logic ===
const chatbotInput = document.getElementById("chatbot-input");
const chatbotSubmit = document.querySelector(".chatbot-submit");
const chatbotResponse = document.getElementById("chatbot-response");

function getNestaBotResponse(question) {
  const q = question.toLowerCase();

  if (!q) return "Please type a question!";

  if (q.includes("who founded") || q.includes("founder")) {
    return "NetsaEDU was founded by Robel Alemayehu, a student at Addis Ababa University.";
  }
  if (q.includes("what is netsaedu") || q.includes("about netsaedu")) {
    return "NetsaEDU is a student-built platform providing free access to past exams, study notes, and peer support.";
  }
  if (q.includes("products") || q.includes("services")) {
    return "We offer ExamVault (past exams), StudyTree (notes sharing), and a student community.";
  }
  if (q.includes("mission")) {
    return "Our mission is to empower Ethiopian students with free academic resources and support.";
  }
  if (q.includes("join") || q.includes("partners")) {
    return "Teachers, schools, NGOs, and media partners can join us to support students.";
  }
  if (q.includes("vision")) {
    return "Our vision is a future where every Ethiopian student has equal access to learning tools and success.";
  }
  if (q.includes("hello") || q.includes("hi")) {
    return "Hello! How can I assist you with NetsaEDU today?";
  }
  if (q.includes("help")) {
    return "Ask me anything about NetsaEDU — founders, mission, products, or how to join!";
  }

  return "Sorry, I’m not sure how to answer that yet. Try asking about our mission, products, or founders.";
}

function handleChatbotSubmit() {
  const question = chatbotInput.value.trim();
  if (!question) {
    showPopup("Please type a question.", "error");
    return;
  }
  chatbotResponse.textContent = "Typing...";
  setTimeout(() => {
    const answer = getNestaBotResponse(question);
    chatbotResponse.textContent = answer;
  }, 600); 
  chatbotInput.value = "";
}

chatbotSubmit.addEventListener("click", handleChatbotSubmit);
chatbotInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleChatbotSubmit();
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

// --- Visitor Counter ---
const visitCountEl = document.getElementById('visit-count');
if (visitCountEl) {
  let visits = localStorage.getItem('visitCount');
  visits = visits ? parseInt(visits) + 1 : 1;
  localStorage.setItem('visitCount', visits);
  visitCountEl.textContent = visits;
}

// --- Audience Toggle Switch ---
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
      // Delay hiding uniContent for smooth fade out
      setTimeout(() => {
        uniContent.style.display = 'none';
        highContent.style.display = 'block';
      }, 400);
    } else {
      btnUni.classList.add('active');
      btnHigh.classList.remove('active');
      uniContent.classList.add('active');
      highContent.classList.remove('active');
      // Delay hiding highContent for smooth fade out
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
