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
let studentNameGlobal = "Bro"; // Default name

function calculate() {
    // 1. Get Inputs
    const nameInput = document.getElementById("studentName").value;
    studentNameGlobal = nameInput ? nameInput : "Bro";
    
    let syllabus = Number(document.getElementById("syllabus").value);
    let days = Number(document.getElementById("days").value);
    let sleep = Number(document.getElementById("sleep").value);
    let delusion = Number(document.getElementById("delusion").value);

    // Sanity Checks (Prevent negatives or impossible numbers)
    if (syllabus < 0) syllabus = 0;
    if (syllabus > 100) syllabus = 100;
    if (days < 0) days = 0;
    if (sleep < 0) sleep = 0;

    // ================= THE ALGORITHM =================
    
    // Step 1: Base Unpreparedness (Raw score out of 100)
    let baseCooked = 100 - syllabus;

    // Step 2: The "Time Panic" Multiplier
    // The fewer days you have, the more your lack of syllabus matters.
    let timeMultiplier = 1;
    
    if (days <= 1) {
        timeMultiplier = 2.5; // EXTREME PANIC (If you have 50% left, you are 125% cooked)
    } else if (days <= 3) {
        timeMultiplier = 1.8; // High Panic
    } else if (days <= 7) {
        timeMultiplier = 1.2; // Mild Panic
    } else if (days > 30) {
        timeMultiplier = 0.5; // You have time, chill out
    }

    // Apply Time Multiplier to the base score
    let cookedScore = baseCooked * timeMultiplier;

    // Step 3: Sleep Deprivation Penalty
    // If you sleep less than 6 hours, your brain works worse.
    if (sleep < 6) {
        cookedScore += (6 - sleep) * 5; // +5% cooked per missing hour
    }

    // Step 4: Delusion Tax
    // If you are highly delusional but haven't studied, you are MORE cooked because you won't panic-study.
    if (delusion > 5 && syllabus < 50) {
        cookedScore += delusion * 2;
    }

    // Cap the score between 0 and 100 (but allows for 100+ internally for logic, capped for display)
    let displayScore = Math.min(100, Math.max(0, Math.round(cookedScore)));
    currentCookedLevel = displayScore;

    // ================= UI UPDATES =================

    const resultDiv = document.getElementById("result");
    const actionsDiv = document.getElementById("actions");
    const copiumBtn = document.getElementById("copiumBtn");
    const card = document.getElementById("main-card");
    
    resultDiv.classList.remove("hidden");
    actionsDiv.classList.remove("hidden");

    // Glow Logic
    card.className = "container"; // Reset classes
    if (displayScore < 30) card.classList.add("chilling");
    else if (displayScore < 70) card.classList.add("mild");
    else card.classList.add("cooked");

    // Copium Button Logic (>80%)
    if (displayScore > 80) {
        copiumBtn.classList.remove("hidden");
    } else {
        copiumBtn.classList.add("hidden");
    }

    // Dynamic Text Color
    let color = "#22c55e"; // Green
    if (displayScore > 40) color = "#eab308"; // Yellow
    if (displayScore > 75) color = "#f43f5e"; // Red

    const roast = ROASTS[Math.floor(Math.random() * ROASTS.length)];

    resultDiv.innerHTML = `
        <h2 style="color: ${color}; font-size: 2.5rem; margin: 10px 0;">${displayScore}% Cooked 💀</h2>
        <p style="font-size: 1.1rem;"><strong>Verdict:</strong> ${getVerdict(displayScore)}</p>
        <p style="color: #cbd5e1; font-style: italic;">"${roast}"</p>
    `;
}

// === BUTTON FUNCTIONS ===

function takeCopium() {
    const dose = COPIUM_QUOTES[Math.floor(Math.random() * COPIUM_QUOTES.length)];
    // Simple creative alert
    alert(`💊 PRESCRIBED DOSE FOR ${studentNameGlobal.toUpperCase()}:\n\n"${dose}"`);
}

function generateTombstone() {
    const canvas = document.getElementById("tombstoneCanvas");
    const ctx = canvas.getContext("2d");
    const name = studentNameGlobal;
    
    // Draw Background
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Stone
    ctx.fillStyle = "#64748b";
    ctx.beginPath();
    ctx.arc(200, 150, 140, Math.PI, 0); 
    ctx.lineTo(340, 500); 
    ctx.lineTo(60, 500); 
    ctx.lineTo(60, 150); 
    ctx.fill();

    // Cracks in stone (Visual flair)
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(130, 140);
    ctx.stroke();

    // Text Settings
    ctx.fillStyle = "#0f172a";
    ctx.textAlign = "center";
    
    ctx.font = "bold 40px Courier New";
    ctx.fillText("R.I.P", 200, 110);

    ctx.font = "bold 30px Courier New";
    ctx.fillText(name.toUpperCase().substring(0, 12), 200, 180);

    const today = new Date().toLocaleDateString();
    ctx.font = "20px Courier New";
    ctx.fillText(`Date: ${today}`, 200, 220);

    ctx.beginPath();
    ctx.moveTo(100, 240);
    ctx.lineTo(300, 240);
    ctx.stroke();

    ctx.font = "italic 18px Courier New";
    ctx.fillText("Cause of Death:", 200, 280);
    
    // Dynamic Cause of Death
    let cause = "Academic Victim";
    if (currentCookedLevel >= 90) cause = "0% Syllabus, 100% Hope";
    else if (currentCookedLevel >= 70) cause = "Procrastination Overdose";
    else if (currentCookedLevel < 30) cause = "Died of Boredom (Topper)";

    ctx.font = "bold 19px Courier New";
    ctx.fillText(cause, 200, 310);

    ctx.font = "16px Courier New";
    ctx.fillText(`Cooked Level: ${currentCookedLevel}%`, 200, 450);

    // Download
    const link = document.createElement('a');
    link.download = `RIP-${name}.png`;
    link.href = canvas.toDataURL();
    link.click();
}

function getVerdict(score) {
    if (score < 10) return "You are the danger. Go sleep.";
    if (score < 30) return "You’re chilling. Suspiciously calm.";
    if (score < 60) return "Medium Rare. Stress is kicking in.";
    if (score < 85) return "Deep Fried. Start praying.";
    return "CONGRATULATIONS. You are burnt toast.";
}