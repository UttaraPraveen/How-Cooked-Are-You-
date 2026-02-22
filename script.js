function calculate() {
  const syllabus = Number(document.getElementById("syllabus").value);
  const days = Number(document.getElementById("days").value);
  const sleep = Number(document.getElementById("sleep").value);
  const delusion = Number(document.getElementById("delusion").value);
  // ================= ROAST MODE =================
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


function getRandomRoast() {
  const index = Math.floor(Math.random() * ROASTS.length);
  return ROASTS[index];
}
  let cooked =
    (100 - syllabus) * 0.5 +
    (days < 5 ? 20 : 5) +
    (Math.max(0, 6 - sleep) * 5) +
    (delusion * 2);

  cooked = Math.max(0, Math.min(100, Math.round(cooked)));

  const verdict = getVerdict(cooked);
  const plan = getPlan(cooked);
  const roast = getRandomRoast();

  document.getElementById("result").innerHTML = `
    <h2>${cooked}% Cooked 💀</h2>
    <p><strong>Meme Verdict:</strong> ${verdict}</p>
    <p><strong>Survival Plan:</strong> ${plan}</p>
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