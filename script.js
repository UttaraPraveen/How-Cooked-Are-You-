const ROASTS = [
    "Bro opened the syllabus for the first time today.",
    "Your delusion level is carrying your GPA.",
    "Sleep schedule has officially left the chat.",
    "Academic comeback loading… please wait 3-5 business days.",
    "You and the syllabus are currently strangers.",
    "This is not studying. This is character development.",
    "One motivational reel away from changing nothing.",
    "The exam fears you. (This may be false.)"
];

function calculate() {
    const syllabus = Number(document.getElementById("syllabus").value);
    const days = Number(document.getElementById("days").value);
    const sleep = Number(document.getElementById("sleep").value);
    const delusion = Number(document.getElementById("delusion").value);

    // Basic calculation logic
    let cooked = (100 - syllabus) * 0.5 +
                 (days < 5 ? 30 : 5) + 
                 (Math.max(0, 7 - sleep) * 8) + 
                 (delusion * 3);

    cooked = Math.max(0, Math.min(100, Math.round(cooked)));

    // Update UI
    const resultDiv = document.getElementById("result");
    const card = document.getElementById("main-card");
    
    resultDiv.classList.remove("hidden");
    
    // Apply dynamic glow based on severity
    card.classList.remove("chilling", "mild", "cooked");
    if (cooked < 30) card.classList.add("chilling");
    else if (cooked < 70) card.classList.add("mild");
    else card.classList.add("cooked");

    const roast = ROASTS[Math.floor(Math.random() * ROASTS.length)];

    resultDiv.innerHTML = `
        <h2 style="color: ${cooked > 70 ? '#f43f5e' : '#22c55e'}">${cooked}% Cooked 💀</h2>
        <p><strong>Verdict:</strong> ${getVerdict(cooked)}</p>
        <p><em>"${roast}"</em></p>
        <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <small><strong>Plan:</strong> ${getPlan(cooked)}</small>
        </div>
    `;
}

function getVerdict(score) {
    if (score < 30) return "You’re chilling. Suspiciously calm.";
    if (score < 60) return "Mildly cooked. Academic anxiety loading...";
    if (score < 85) return "Deep fried. Start praying.";
    return "ABSOLUTELY COOKED. Main character breakdown arc.";
}

function getPlan(score) {
    if (score < 30) return "Revise + hydrate. Don’t get overconfident.";
    if (score < 60) return "Pomodoro mode. Delete Instagram.";
    if (score < 85) return "Past papers + caffeine + manifestation.";
    return "Call your topper friend. This is a group project now.";
}