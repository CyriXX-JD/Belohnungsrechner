function calculateReward() {
  const refReward = parseFloat(document.getElementById("refReward").value);
  const refMultiplier = parseFloat(document.getElementById("refMultiplier").value);
  const newMultiplier = parseFloat(document.getElementById("newMultiplier").value);
  const resultEl = document.getElementById("result");

  if (refReward > 0 && refMultiplier > 0 && newMultiplier > 0) {
    const baseValue = refReward / refMultiplier;
    const newReward = baseValue * newMultiplier;
    resultEl.style.color = "#28a745";
    resultEl.innerText = `Belohnung bei ${newMultiplier}x: ${newReward.toFixed(2)}`;
  } else {
    resultEl.innerText = "Bitte gib überall gültige Werte größer als 0 ein.";
    resultEl.style.color = "#cc0000";
  }
}

async function saveAsPDF() {
  const resultText = document.getElementById("result").innerText;
  if (!resultText || resultText.includes("gültige Werte")) {
    alert("Bitte zuerst ein gültiges Ergebnis berechnen.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Wasserzeichen
  doc.saveGraphicsState();
  doc.setTextColor(200, 200, 200); // hellgrau
  doc.setFontSize(40);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(150);
  doc.text("Derek Lopez I 87481 DE02", 35, 150, { angle: 45 });
  doc.restoreGraphicsState();

  // Inhalt
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Belohnungsrechner Ergebnis", 20, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(resultText, 20, 40);

  doc.save("belohnung.pdf");
}

function toggleLanguage() {
  const title = document.getElementById("title");
  const rewardLabel = document.getElementById("rewardLabel");
  const multiplierLabel = document.getElementById("multiplierLabel");
  const newMultiplierLabel = document.getElementById("newMultiplierLabel");
  const resultEl = document.getElementById("result");

  if (title.innerText === "Belohnung berechnen") {
    title.innerText = "Reward Calculator";
    rewardLabel.innerText = "Reference Reward:";
    multiplierLabel.innerText = "Multiplier:";
    newMultiplierLabel.innerText = "New Multiplier:";
    resultEl.innerText = "";
  } else {
    title.innerText = "Belohnung berechnen";
    rewardLabel.innerText = "Referenz-Belohnung:";
    multiplierLabel.innerText = "Multiplikator:";
    newMultiplierLabel.innerText = "Neuer Multiplikator:";
    resultEl.innerText = "";
  }
}
