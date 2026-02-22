# How Cooked Are You?
## COOKED.exe | The Academic Crisis Detector

> **"A clinical-grade assessment tool for students teetering on the edge of academic ruin."**

**COOKED.exe** is a satirical web application designed to calculate exactly how likely a student is to fail based on their syllabus coverage, sleep deprivation, and levels of delusion. It features a dual-theme UI (Clean SaaS vs. Cyber-Grunge), a custom image generator, and a proprietary "Panic Algorithm."

---

## 📸 Screenshots

| **Light Mode (Clean SaaS)** | **Dark Mode (Cyber Grunge)** |
|:---------------------------:|:----------------------------:|
| *For the denial phase* | *For the acceptance phase* |
|<img width="1892" height="871" alt="image" src="https://github.com/user-attachments/assets/7dd2bf53-c7c6-4d1f-96d1-a1436e4498c4" />| <img width="1872" height="827" alt="image" src="https://github.com/user-attachments/assets/d471cfc2-d61a-4ced-8ca6-a345105cebf8" />|

---

## 🌟 Key Features

### 🧠 The "Panic Algorithm"
We don't just guess; we calculate. The backend logic considers:
* **Time Dilation:** 1 day left counts as 3x the stress of 7 days left.
* **Sleep Debt:** Less than 5 hours of sleep applies a "Brain Fog" penalty.
* **Delusion Tax:** High confidence + Low syllabus completion = Maximum Cooked Score.

### 🌓 Dual-Personality UI
Toggle between two distinct realities:
1.  **Light Mode:** A clean, soothing interface to trick you into thinking everything is fine.
2.  **Dark Mode:** A chaotic, noise-textured, neon-infused cyber-grunge interface for when reality sets in.

### 🪦 The Tombstone Mint
Uses the **HTML5 Canvas API** to dynamically generate a downloadable `.png` tombstone.
* **Adaptive Rendering:** The tombstone style changes based on your selected theme (Light Stone vs. Dark Cyber-Stone).
* **Custom Epitaphs:** "Cause of Death" is auto-generated based on your specific failure metrics.

### 💊 The Delulu Prescription
If your "Cooked Level" exceeds 75%, you gain access to the **Delulu Pill**—a modal containing randomly generated gaslighting quotes to make you feel better (e.g., *"Bill Gates dropped out too"*).

---

## 🛠️ Tech Stack

* **HTML5:** Semantic structure.
* **CSS3:** CSS Variables for theming, Glassmorphism, Animations, and Flexbox/Grid layouts.
* **JavaScript (Vanilla):** DOM manipulation, Canvas rendering logic, and local storage state management.
* **Fonts:** *Syne* (Headings) and *Space Mono* (Data/UI).

---

## 🚀 How to Run

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/yourusername/cooked-exe.git](https://github.com/yourusername/cooked-exe.git)
    ```

2.  **Open the Project**
    Navigate to the folder and open `index.html` in any modern web browser.

    *No `npm install` or build steps required. It's pure, unadulterated web tech.*

---

## 📂 Project Structure

```text
cooked-exe/
├── index.html      # The skeleton (Modals, Inputs, Canvas)
├── style.css       # The skin (Variables, Animations, Dark/Light logic)
├── script.js       # The brain (Math, Canvas Drawing, DOM Logic)
└── README.md       # You are here
