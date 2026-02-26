// ============ DATA ============
const ROASTS = {
  ultraChill: [
    "You're built different. Genuinely concerningly prepared.",
    "Please go outside. You've earned it.",
    "Top of the class behavior. Suspicious, even.",
    "You studied. You slept. You ate. Who ARE you?",
  ],
  chill: [
    "You're fine. Annoyingly fine.",
    "Mild concern detected. Nothing a nap can't fix.",
    "Light prep, steady vibes. The chad energy is real.",
    "You're in the 'probably won't fail' category. Congrats.",
  ],
  medium: [
    "The syllabus opened, panicked, and closed again.",
    "You're at the 'cramming is still possible' stage.",
    "Medium rare. Needs more time in the oven.",
    "Procrastination is doing its best work on you.",
    "The vibe is: 'I'll start at 9pm'. It's 11pm. You lied.",
  ],
  highlyCooked: [
    "Bro opened the syllabus for the first time today.",
    "Your GPA just filed a missing person report.",
    "Sleep schedule has left the chat. It's not coming back.",
    "The exam is not scared of you. You should be scared.",
    "God is watching. He is logging off.",
    "You've transitioned from student to content creator (of panic).",
  ],
  burnt: [
    "CONGRATULATIONS. You have unlocked the void.",
    "You aren't cooked. You are CHARCOAL.",
    "At 0% syllabus, your strategy is to BECOME the exam.",
    "Even your delusion can't save you. That takes talent.",
    "This level of cooked is studied in academic disaster case files.",
  ]
};

const COPIUM_QUOTES = [
  "Bill Gates dropped out. Look at him now. (You are not Bill Gates.)",
  "Marks are just a number. Jail is also just a building.",
  "Your comeback arc starts tonight at 3 AM. Trust the process.",
  "C's get degrees. D's get... life experience.",
  "The exam can smell fear. Stop giving it power.",
  "You're not failing. You're on a nonlinear success trajectory.",
  "The universe rewards those who nap boldly.",
];

let currentCookedLevel = 0;
let studentNameGlobal = "Academic Victim";

// ============ THEME TOGGLE ============
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// ============ UTILS ============
function clamp(val, min, max) { return Math.min(max, Math.max(min, val)); }

// ============ CALCULATE ============
function calculate() {
  const nameInput = document.getElementById("studentName").value.trim();
  studentNameGlobal = nameInput || "Academic Victim";

  let syllabus = clamp(Number(document.getElementById("syllabus").value) || 0, 0, 100);
  let days     = Math.max(Number(document.getElementById("days").value) || 0, 0);
  let sleep    = clamp(Number(document.getElementById("sleep").value) || 7, 0, 24);
  let delusion = clamp(Number(document.getElementById("delusion").value) || 5, 1, 10);

  // --- Algorithm ---
  let baseCooked = 100 - syllabus;
  let timeMult = 1;

  if (days === 0)       timeMult = 3.0;
  else if (days <= 1)   timeMult = 2.5;
  else if (days <= 3)   timeMult = 1.8;
  else if (days <= 7)   timeMult = 1.2;
  else if (days > 30)   timeMult = 0.5;

  let score = baseCooked * timeMult;

  if (sleep < 5)       score += (5 - sleep) * 8;
  else if (sleep < 6)  score += (6 - sleep) * 4;

  if (delusion > 6 && syllabus < 50) score += (delusion - 5) * 3;
  if (delusion === 10 && syllabus < 20) score += 15;

  const displayScore = Math.min(100, Math.max(0, Math.round(score)));
  currentCookedLevel = displayScore;

  // --- Update UI ---
  updateUI(displayScore, syllabus, days, sleep);
}

function updateUI(displayScore, syllabus, days, sleep) {
  let roastPool;
  if (displayScore < 15)       roastPool = ROASTS.ultraChill;
  else if (displayScore < 35) roastPool = ROASTS.chill;
  else if (displayScore < 60) roastPool = ROASTS.medium;
  else if (displayScore < 82) roastPool = ROASTS.highlyCooked;
  else                        roastPool = ROASTS.burnt;

  const roast = roastPool[Math.floor(Math.random() * roastPool.length)];
  const verdict = getVerdict(displayScore);

  let color, bgColor, borderColor;
  // Using generic vars that look good on both Light/Dark
  if (displayScore < 20)      { color = '#059669'; bgColor = 'rgba(16, 185, 129, 0.1)'; borderColor = '#34d399'; }
  else if (displayScore < 45) { color = '#d97706'; bgColor = 'rgba(251, 191, 36, 0.1)'; borderColor = '#fbbf24'; }
  else if (displayScore < 70) { color = '#ea580c'; bgColor = 'rgba(253, 186, 116, 0.1)'; borderColor = '#fdba74'; }
  else if (displayScore < 85) { color = '#dc2626'; bgColor = 'rgba(248, 113, 113, 0.1)'; borderColor = '#f87171'; }
  else                        { color = '#be123c'; bgColor = 'rgba(251, 113, 133, 0.1)'; borderColor = '#fb7185'; }

  document.getElementById("placeholder").style.display = "none";
  const resultContent = document.getElementById("resultContent");
  resultContent.classList.add("visible");

  const scoreEl = document.getElementById("scoreDisplay");
  scoreEl.style.color = color;
  scoreEl.innerHTML = `${displayScore}<span class="score-unit" style="color:var(--text); opacity:0.3;">%</span>`;
  
  const fill = document.getElementById("flameFill");
  fill.style.width = '0%';
  fill.style.background = `linear-gradient(to right, ${borderColor}, ${color})`;
  setTimeout(() => { fill.style.width = displayScore + '%'; }, 100);

  const badge = document.getElementById("verdictBadge");
  badge.textContent = verdict.label;
  badge.style.background = bgColor;
  badge.style.color = color;
  badge.style.border = `1px solid ${borderColor}`;

  document.getElementById("roastText").innerHTML = `"${roast}"`;

  const actions = document.getElementById("actions");
  actions.classList.add("visible");

  const copiumBtn = document.getElementById("copiumBtn");
  if (displayScore > 75) copiumBtn.classList.remove("hidden");
  else copiumBtn.classList.add("hidden");

  updateStats(displayScore, syllabus, days, sleep);
}

function updateStats(score, syllabus, days, sleep) {
  const strip = document.getElementById("statsStrip");
  strip.style.display = 'grid';
  strip.style.animation = 'fadeUp 0.5s 0.2s ease both';

  const survival = Math.max(0, Math.round(100 - score * 0.85));
  const grades = ['A+','A','B+','B','C+','C','D','F','F-'];
  const gradeIdx = Math.min(8, Math.floor(score / 12));
  const copeLevel = score > 80 ? 'MAX' : score > 50 ? 'HIGH' : score > 25 ? 'MED' : 'LOW';
  const prayers = score > 85 ? '∞' : score > 60 ? '1000+' : score > 30 ? '100' : '12';

  document.getElementById("statSurvival").textContent = survival + '%';
  document.getElementById("statGrade").textContent = grades[gradeIdx];
  document.getElementById("statCope").textContent = copeLevel;
  document.getElementById("statPrayer").textContent = prayers;
}

function getVerdict(score) {
  if (score < 10)  return { label: '✅ Not Cooked' };
  if (score < 25)  return { label: '🧊 Chilling' };
  if (score < 45)  return { label: '⚠️ Mildly Crispy' };
  if (score < 65)  return { label: '🔥 Medium Rare' };
  if (score < 82)  return { label: '💀 Well Done' };
  return                  { label: '☠️ BURNT TOAST' };
}

function takeCopium() {
  const dose = COPIUM_QUOTES[Math.floor(Math.random() * COPIUM_QUOTES.length)];
  document.getElementById("deluluPatient").textContent = studentNameGlobal;
  document.getElementById("deluluQuote").textContent = dose;
  document.getElementById("deluluModal").classList.remove("hidden");
}

// ============ ADAPTIVE TOMBSTONE GENERATOR ============
function generateTombstone() {
  const canvas = document.getElementById("tombstoneCanvas");
  const ctx = canvas.getContext("2d");
  const name = studentNameGlobal;
  const W = canvas.width, H = canvas.height;
  const theme = document.documentElement.getAttribute('data-theme') || 'light';
  
  const isDark = theme === 'dark';

  // --- CONFIG ---
  const colors = {
    bgTop: isDark ? '#0d0d0d' : '#f8fafc',
    bgBot: isDark ? '#1a0a00' : '#e2e8f0',
    stoneTop: isDark ? '#4a4a4a' : '#cbd5e1',
    stoneBot: isDark ? '#2a2a2a' : '#94a3b8',
    stroke: isDark ? '#666' : '#64748b',
    groundTop: isDark ? '#2d1a00' : '#86efac',
    groundBot: isDark ? '#1a0d00' : '#4ade80',
    textMain: isDark ? '#e0e0e0' : '#1e293b',
    textSub: isDark ? '#999' : '#475569',
    accent: isDark ? '#ff4d00' : '#dc2626'
  };

  // Background
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, colors.bgTop);
  bgGrad.addColorStop(1, colors.bgBot);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Stone
  const stoneGrad = ctx.createLinearGradient(0, 60, 0, H - 30);
  stoneGrad.addColorStop(0, colors.stoneTop);
  stoneGrad.addColorStop(1, colors.stoneBot);
  ctx.fillStyle = stoneGrad;
  ctx.beginPath();
  ctx.arc(W/2, 180, 150, Math.PI, 0);
  ctx.lineTo(W - 60, H - 40);
  ctx.lineTo(60, H - 40);
  ctx.closePath();
  ctx.fill();

  // Stone Outline
  ctx.strokeStyle = colors.stroke;
  ctx.lineWidth = 3;
  ctx.stroke();

  // Ground
  const groundGrad = ctx.createLinearGradient(0, H - 50, 0, H);
  groundGrad.addColorStop(0, colors.groundTop);
  groundGrad.addColorStop(1, colors.groundBot);
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, H - 50, W, 50);

  // Text
  ctx.textAlign = "center";
  ctx.shadowColor = isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.5)';
  ctx.shadowBlur = 4;

  ctx.font = "bold 42px 'Courier New'";
  ctx.fillStyle = colors.accent;
  ctx.fillText("R.I.P", W/2, 115);

  ctx.font = "bold 22px 'Courier New'";
  ctx.fillStyle = colors.textMain;
  ctx.fillText(name.toUpperCase().substring(0, 14), W/2, 175);

  ctx.font = "16px 'Courier New'";
  ctx.fillStyle = colors.textSub;
  ctx.fillText(new Date().toLocaleDateString('en-GB'), W/2, 210);

  // Divider
  ctx.strokeStyle = colors.stroke;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(90, 228);
  ctx.lineTo(310, 228);
  ctx.stroke();

  ctx.font = "italic 15px 'Courier New'";
  ctx.fillStyle = colors.textSub;
  ctx.fillText("Cause of Death:", W/2, 260);

  let cause = "Academic Negligence";
  if      (currentCookedLevel >= 95) cause = "0% Syllabus, 100% Cope";
  else if (currentCookedLevel >= 85) cause = "Procrastination Overdose";
  else if (currentCookedLevel >= 70) cause = "Delusional Optimism";
  else if (currentCookedLevel >= 50) cause = "Peak Mid-Semester Chaos";
  else if (currentCookedLevel < 20)  cause = "Studied Too Hard (Sad)";

  ctx.font = "bold 16px 'Courier New'";
  ctx.fillStyle = colors.accent;
  ctx.fillText(cause, W/2, 290);

  ctx.font = "30px serif";
  ctx.fillText("🔥", W/2, 360);

  ctx.font = "bold 15px 'Courier New'";
  ctx.fillStyle = colors.accent;
  ctx.fillText(`COOKED: ${currentCookedLevel}%`, W/2, 400);

  ctx.shadowBlur = 0;

  document.getElementById("tombstonePreview").src = canvas.toDataURL();
  document.getElementById("tombstoneModal").classList.remove("hidden");
}

function downloadImage() {
  const link = document.createElement('a');
  link.download = `RIP-${studentNameGlobal.replace(/\s+/g,'-')}.png`;
  link.href = document.getElementById("tombstoneCanvas").toDataURL();
  link.click();
}

function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}

function handleOverlayClick(e, id) {
  if (e.target.id === id) closeModal(id);
}
// ============ SHARE SYSTEM ============

function getShareText() {
  const siteURL = "https://uttarapraveen.github.io/How-Cooked-Are-You-/";

  return `I'm ${currentCookedLevel}% cooked 🔥💀

Patient: ${studentNameGlobal}

Try yours here:
${siteURL}`;
}

function openShareModal() {
  document.getElementById("shareModal").classList.remove("hidden");
}

function shareWhatsApp() {
  const text = encodeURIComponent(getShareText());
  window.open(`https://wa.me/?text=${text}`, "_blank");
}

function shareTwitter() {
  const text = encodeURIComponent(getShareText());
  window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
}

function shareFacebook() {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
}

function shareInstagram() {
  copyShareText();
  alert("Result copied! Open Instagram and paste it in your story 😊");
}

function copyShareText() {
  navigator.clipboard.writeText(getShareText())
    .then(() => alert("Copied to clipboard!"))
    .catch(() => alert("Could not copy automatically."));
}
