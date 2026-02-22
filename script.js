const ROASTS = [
    "Bro opened the syllabus for the first time today.",
    "Your delusion level is carrying your GPA.",
    "Sleep schedule has officially left the chat.",
    "Academic comeback loading… please wait 3-5 business days.",
    "You and the syllabus are currently strangers.",
    "This is not studying. This is character development.",
    "The exam fears you. (This may be false.)",
    "God is watching, and He is confused."
];

const COPIUM_QUOTES = [
    "Bill Gates dropped out and look at him now.",
    "Marks are just a number. Jail is just a room.",
    "Academic comeback starts at 3 AM. Trust the process.",
    "The sun will still rise even if you fail (probably).",
    "C's get degrees. D's get... diplomas?",
    "Einstein failed math. (He didn't, but let's pretend).",
    "You're not failing, you're just pivoting to a new career path."
];

let currentCookedLevel = 0; 
let studentNameGlobal = "Academic Victim"; // Default name

function calculate() {
    // 1. Get Inputs
    const nameInput = document.getElementById("studentName").value;
    studentNameGlobal = nameInput ? nameInput : "Academic Victim";
    
    let syllabus = Number(document.getElementById("syllabus").value);
    let days = Number(document.getElementById("days").value);
    let sleep = Number(document.getElementById("sleep").value);
    let delusion = Number(document.getElementById("delusion").value);

    // Sanity Checks
    if (syllabus < 0) syllabus = 0;
    if (syllabus > 100) syllabus = 100;
    if (days < 0) days = 0;
    if (sleep < 0) sleep = 0;

    // ================= THE ALGORITHM =================
    let baseCooked = 100 - syllabus;
    let timeMultiplier = 1;
    
    if (days <= 1) timeMultiplier = 2.5;
    else if (days <= 3) timeMultiplier = 1.8;
    else if (days <= 7) timeMultiplier = 1.2;
    else if (days > 30) timeMultiplier = 0.5;

    let cookedScore = baseCooked * timeMultiplier;

    if (sleep < 6) cookedScore += (6 - sleep) * 5;
    if (delusion > 5 && syllabus < 50) cookedScore += delusion * 2;

    let displayScore = Math.min(100, Math.max(0, Math.round(cookedScore)));
    currentCookedLevel = displayScore;

    // ================= UI UPDATES =================
    const resultDiv = document.getElementById("result");
    const actionsDiv = document.getElementById("actions");
    const copiumBtn = document.getElementById("copiumBtn");
    
    resultDiv.classList.remove("hidden");
    actionsDiv.classList.remove("hidden");

    // Delulu Button Logic (>80%)
    if (displayScore > 80) {
        copiumBtn.classList.remove("hidden");
    } else {
        copiumBtn.classList.add("hidden");
    }

    const roast = ROASTS[Math.floor(Math.random() * ROASTS.length)];
    let icon = "🔥";
    if (displayScore < 30) icon = "🧊";
    if (displayScore > 85) icon = "💀";

    resultDiv.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
            <span style="background: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 20px; font-size: 0.8rem;">
                ${getVerdict(displayScore).split('.')[0]}
            </span>
            <span style="font-size: 1.5rem;">${icon}</span>
        </div>
        
        <h1 style="font-size: 3.5rem; margin: 0; line-height: 1;">${displayScore}%</h1>
        <p style="opacity: 0.9; font-size: 0.9rem; margin-top: 5px;">Cooked Level</p>
        
        <div style="margin-top: 15px; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 15px;">
            <p style="font-size: 0.9rem; font-style: italic;">"${roast}"</p>
        </div>
    `;
}

// === DELULU PILL FUNCTION ===
function takeCopium() {
    const dose = COPIUM_QUOTES[Math.floor(Math.random() * COPIUM_QUOTES.length)];
    
    // Set content
    document.getElementById("deluluPatient").innerText = studentNameGlobal;
    document.getElementById("deluluQuote").innerText = dose;
    
    // Show Modal
    const modal = document.getElementById("deluluModal");
    modal.classList.remove("hidden");
}

// === TOMBSTONE FUNCTION ===
function generateTombstone() {
    const canvas = document.getElementById("tombstoneCanvas");
    const ctx = canvas.getContext("2d");
    const name = studentNameGlobal;
    
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#64748b";
    ctx.beginPath();
    ctx.arc(200, 150, 140, Math.PI, 0); 
    ctx.lineTo(340, 500); 
    ctx.lineTo(60, 500); 
    ctx.lineTo(60, 150); 
    ctx.fill();

    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(130, 140);
    ctx.stroke();

    ctx.fillStyle = "#0f172a";
    ctx.textAlign = "center";
    ctx.font = "bold 40px Courier New";
    ctx.fillText("R.I.P", 200, 110);
    ctx.font = "bold 30px Courier New";
    ctx.fillText(name.toUpperCase().substring(0, 12), 200, 180);

    const today = new Date().toLocaleDateString();
    ctx.font = "20px Courier New";
    ctx.fillText(`Date: ${today}`, 200, 220);

    ctx.beginPath(); ctx.moveTo(100, 240); ctx.lineTo(300, 240); ctx.stroke();

    ctx.font = "italic 18px Courier New";
    ctx.fillText("Cause of Death:", 200, 280);
    
    let cause = "Academic Victim";
    if (currentCookedLevel >= 90) cause = "0% Syllabus, 100% Hope";
    else if (currentCookedLevel >= 70) cause = "Procrastination Overdose";
    else if (currentCookedLevel < 30) cause = "Died of Boredom (Topper)";

    ctx.font = "bold 19px Courier New";
    ctx.fillText(cause, 200, 310);
    ctx.font = "16px Courier New";
    ctx.fillText(`Cooked Level: ${currentCookedLevel}%`, 200, 450);

    const modal = document.getElementById("tombstoneModal");
    document.getElementById("tombstonePreview").src = canvas.toDataURL();
    modal.classList.remove("hidden");
}

function downloadImage() {
    const canvas = document.getElementById("tombstoneCanvas");
    const link = document.createElement('a');
    link.download = `RIP-${studentNameGlobal}.png`;
    link.href = canvas.toDataURL();
    link.click();
}

// === SHARED CLOSE MODAL FUNCTION ===
function closeModal(event, modalId) {
    if (event.target.id === modalId || event.target.className === "close-btn" || event.target.classList.contains("download-action")) {
        document.getElementById(modalId).classList.add("hidden");
    }
}

function getVerdict(score) {
    if (score < 10) return "You are the danger. Go sleep.";
    if (score < 30) return "You’re chilling. Suspiciously calm.";
    if (score < 60) return "Medium Rare. Stress is kicking in.";
    if (score < 85) return "Deep Fried. Start praying.";
    return "CONGRATULATIONS. You are burnt toast.";
}