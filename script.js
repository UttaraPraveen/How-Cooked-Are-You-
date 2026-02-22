// ============ DATA ============
const ROASTS = {
  ultraChill: [
    "You're built different. Genuinely concerningly prepared.",
    "Please go outside. You've earned it.",
    "Top of the class behavior. Suspicious, even.",
    "Are you a robot? Only a robot would be this ready.",
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
    "You're at the 'cramming is still possible' stage. Act now.",
    "Medium rare. Needs more time in the oven.",
    "You're coasting. The cliff is closer than it looks.",
    "Procrastination is doing its best work on you.",
    "The vibe is: 'I'll start at 9pm'. It's 11pm. You lied.",
  ],
  highlyCooked: [
    "Bro opened the syllabus for the first time today. Classic.",
    "Your GPA just filed a missing person report.",
    "Sleep schedule has left the chat. It's not coming back.",
    "Academic comeback loading… ETA: never.",
    "The exam is not scared of you. You should be scared of the exam.",
    "You: 'I work better under pressure.' The pressure: 'lol no.'",
    "God is watching. He is logging off.",
    "You've transitioned from student to content creator (of panic).",
  ],
  burnt: [
    "CONGRATULATIONS. You have unlocked the void.",
    "You aren't cooked. You are CHARCOAL.",
    "At 0% syllabus, your strategy is to BECOME the exam.",
    "Even your delusion can't save you. That takes talent.",
    "A moment of silence for the career that could have been. 🕯️",
    "You didn't burn your ships. You burned your notes, the ship, the harbor, and yourself.",
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
  "Every 'F' is just an 'A' that hasn't been graded yet. (That's not how it works.)",
  "The universe rewards those who nap boldly.",
  "10 years from now this won't matter. (It will definitely matter tomorrow.)",
];

let currentCookedLevel = 0;
let studentNameGlobal = "Academic Victim";

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

  updateUI(displayScore, syllabus, days, sleep);
}

function updateUI(displayScore, syllabus, days, sleep) {
  // --- Roast selection based on score ---
  let roastPool;
  if (displayScore < 15)       roastPool = ROASTS.ultraChill;
  else if (displayScore < 35) roastPool = ROASTS.chill;
  else if (displayScore < 60) roastPool = ROASTS.medium;
  else if (displayScore < 82) roastPool = ROASTS.highlyCooked;
  else                        roastPool = ROASTS.burnt;

  const roast = roastPool[Math.floor(Math.random() * roastPool.length)];
  const verdict = getVerdict(displayScore);

  // --- Color scheme ---
  let color, bgColor;
  if (displayScore < 20)      { color = '#00ff88'; bgColor = 'rgba(0,255,136,0.1)'; }
  else if (displayScore < 45) { color = '#ffb800'; bgColor = 'rgba(255,184,0,0.1)'; }
  else if (displayScore < 70) { color = '#ff8c00'; bgColor = 'rgba(255,140,0,0.1)'; }
  else if (displayScore < 85) { color = '#ff4d00'; bgColor = 'rgba(255,77,0,0.1)'; }
  else                        { color = '#ff3366'; bgColor = 'rgba(255,51,102,0.1)'; }

  // --- Update UI Elements ---
  document.getElementById("placeholder").style.display = "none";

  const resultContent = document.getElementById("resultContent");
  resultContent.classList.add("visible");

  const scoreEl = document.getElementById("scoreDisplay");
  scoreEl.style.color = color;
  scoreEl.innerHTML = `${displayScore}<span class="score-unit">%</span>`;
  scoreEl.style.animation = 'scoreReveal 0.4s cubic-bezier(0.175,0.885,0.32,1.275) both';
  setTimeout(() => { scoreEl.style.animation = ''; }, 500);

  const fill = document.getElementById("flameFill");
  fill.style.width = '0%';
  fill.style.background = `linear-gradient(to right, #ffb800, ${color})`;
  setTimeout(() => { fill.style.width = displayScore + '%'; }, 100);

  const badge = document.getElementById("verdictBadge");
  badge.textContent = verdict.label;
  badge.style.background = bgColor;
  badge.style.color = color;
  badge.style.border = `1px solid ${color}44`;

  document.getElementById("roastText").innerHTML = `"${roast}"`;

  // Actions
  const actions = document.getElementById("actions");
  actions.classList.add("visible");

  const copiumBtn = document.getElementById("copiumBtn");
  if (displayScore > 75) copiumBtn.classList.remove("hidden");
  else copiumBtn.classList.add("hidden");

  // Stats strip
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

// ============ VERDICTS ============
function getVerdict(score) {
  if (score < 10)  return { label: '✅ Not Cooked' };
  if (score < 25)  return { label: '🧊 Chilling Dangerously' };
  if (score < 45)  return { label: '⚠️ Mildly Crispy' };
  if (score < 65)  return { label: '🔥 Medium Rare' };
  if (score < 82)  return { label: '💀 Well Done' };
  return                  { label: '☠️ BURNT TOAST' };
}

// ============ DELULU PILL ============
function takeCopium() {
  const dose = COPIUM_QUOTES[Math.floor(Math.random() * COPIUM_QUOTES.length)];
  document.getElementById("deluluPatient").textContent = studentNameGlobal;
  document.getElementById("deluluQuote").textContent = dose;
  
  const modal = document.getElementById("deluluModal");
  modal.classList.remove("hidden");
  modal.classList.add("open");
}

// ============ TOMBSTONE ============
function generateTombstone() {
  const canvas = document.getElementById("tombstoneCanvas");
  const ctx = canvas.getContext("2d");
  const name = studentNameGlobal;
  const W = canvas.width, H = canvas.height;

  // Background (Dark Theme)
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, '#0d0d0d');
  bgGrad.addColorStop(1, '#1a0a00');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Stone
  const stoneGrad = ctx.createLinearGradient(0, 60, 0, H - 30);
  stoneGrad.addColorStop(0, '#4a4a4a');
  stoneGrad.addColorStop(1, '#2a2a2a');
  ctx.fillStyle = stoneGrad;
  ctx.beginPath();
  ctx.arc(W/2, 180, 150, Math.PI, 0);
  ctx.lineTo(W - 60, H - 40);
  ctx.lineTo(60, H - 40);
  ctx.closePath();
  ctx.fill();

  // Stone edge highlight
  ctx.strokeStyle = '#666';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Inner shadow on stone
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(W/2, 180, 142, Math.PI, 0);
  ctx.stroke();

  // Ground
  const groundGrad = ctx.createLinearGradient(0, H - 50, 0, H);
  groundGrad.addColorStop(0, '#2d1a00');
  groundGrad.addColorStop(1, '#1a0d00');
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, H - 50, W, 50);

  // R.I.P Text
  ctx.textAlign = "center";
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 8;

  ctx.font = "bold 42px 'Courier New'";
  ctx.fillStyle = '#ff4d00';
  ctx.fillText("R.I.P", W/2, 115);

  ctx.font = "bold 22px 'Courier New'";
  ctx.fillStyle = '#e0e0e0';
  ctx.fillText(name.toUpperCase().substring(0, 14), W/2, 175);

  ctx.font = "16px 'Courier New'";
  ctx.fillStyle = '#999';
  const today = new Date().toLocaleDateString('en-GB');
  ctx.fillText(today, W/2, 210);

  // Divider
  ctx.strokeStyle = '#555';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(90, 228);
  ctx.lineTo(310, 228);
  ctx.stroke();

  ctx.font = "italic 15px 'Courier New'";
  ctx.fillStyle = '#aaa';
  ctx.fillText("Cause of Death:", W/2, 260);

  let cause = "Academic Negligence";
  if       (currentCookedLevel >= 95) cause = "0% Syllabus, 100% Cope";
  else if (currentCookedLevel >= 85) cause = "Procrastination Overdose";
  else if (currentCookedLevel >= 70) cause = "Delusional Optimism";
  else if (currentCookedLevel >= 50) cause = "Peak Mid-Semester Chaos";
  else if (currentCookedLevel < 20)  cause = "Studied Too Hard (Sad)";

  ctx.font = "bold 16px 'Courier New'";
  ctx.fillStyle = '#ff8c00';
  ctx.fillText(cause, W/2, 290);

  // Flame emoji area
  ctx.font = "30px serif";
  ctx.fillText("🔥", W/2, 360);

  ctx.font = "bold 15px 'Courier New'";
  ctx.fillStyle = '#ff4d00';
  ctx.fillText(`COOKED: ${currentCookedLevel}%`, W/2, 400);

  ctx.font = "12px 'Courier New'";
  ctx.fillStyle = '#555';
  ctx.fillText("cooked.exe v2.0", W/2, 460);

  ctx.shadowBlur = 0;

  // Show Modal
  document.getElementById("tombstonePreview").src = canvas.toDataURL();
  const modal = document.getElementById("tombstoneModal");
  modal.classList.remove("hidden");
  modal.classList.add("open");
}

function downloadImage() {
  const canvas = document.getElementById("tombstoneCanvas");
  const link = document.createElement('a');
  link.download = `RIP-${studentNameGlobal.replace(/\s+/g,'-')}.png`;
  link.href = canvas.toDataURL();
  link.click();
}

// ============ MODALS ============
function closeModal(id) {
  const el = document.getElementById(id);
  el.classList.add("hidden");
  el.classList.remove("open");
}

function handleOverlayClick(e, id) {
  if (e.target.id === id) closeModal(id);
}