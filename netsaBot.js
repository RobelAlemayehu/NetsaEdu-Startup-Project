// Chatbot toggle logic 
const chatbotToggles = document.querySelectorAll(".chatbot-toggle");
const chatbotContainer = document.querySelector(".chatbot-floating-container");

chatbotToggles.forEach(toggle => {
  toggle.addEventListener("click", () => {
    chatbotContainer.classList.toggle("visible");
  });
});
// Chatbot AI Logic with keyword 
const chatbotInput = document.getElementById("chatbot-input");
const chatbotSubmit = document.querySelector(".chatbot-submit");
const chatbotResponse = document.getElementById("chatbot-response");

const responses = [
  { keywords: ['founder', 'who founded'], response: "NetsaEdu was founded by Robel Alemayehu, a student at Addis Ababa University." },
  { keywords: ['what is NetsaEdu', 'about NetsaEdu'], response: "NetsaEdu is a student-built platform providing free access to past exams, study notes, and peer support." },
  { keywords: ['products', 'services'], response: "We offer ExamVault (past exams), StudyTree (notes sharing), and a student community." },
  { keywords: ['mission'], response: "Our mission is to empower Ethiopian students with free academic resources and support." },
  { keywords: ['join', 'partners'], response: "Teachers, schools, NGOs, and media partners can join us to support students." },
  { keywords: ['vision'], response: "Our vision is a future where every Ethiopian student has equal access to learning tools and success." },
  { keywords: ['hello', 'hi'], response: "Hello! How can I assist you with NetsaEdu today?" },
  { keywords: ['help'], response: "Ask me anything about NetsaEdu — founders, mission, products, or how to join!" },
  { keywords: ['joke'], response: "Why do programmers prefer dark mode? Because light attracts bugs!" }
];

function getNestaBotResponse(question) {
  const q = question.toLowerCase().trim();
  if (!q) return "Please type a question!";

  for (const item of responses) {
    if (item.keywords.some(k => q.includes(k))) {
      return item.response;
    }
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