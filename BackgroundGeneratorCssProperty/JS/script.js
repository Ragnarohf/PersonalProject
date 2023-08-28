// Sélection des éléments HTML
const css = document.querySelector("h3");
const color1 = document.querySelector(".color1");
const color2 = document.querySelector(".color2");
const body = document.getElementById("gradient");
const random = document.getElementById("random");
const rotate = document.getElementById("rotate");
const copyCSSButton = document.getElementById("copy-css-button");
const gradientStatus = document.getElementById("gradient-status");

// Options de direction du dégradé
const possibleDir = ["right", "left"];
let dir = "right";

// Génère une couleur aléatoire au format hexadécimal
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Met à jour le dégradé en fonction des couleurs sélectionnées
function setGradient() {
  body.style.background = `linear-gradient(to ${dir}, ${color1.value}, ${color2.value})`;
  css.textContent = `background: ${body.style.background};`;
}

// Applique un dégradé avec des couleurs aléatoires
function setRandomGradient() {
  dir = possibleDir[Math.floor(Math.random() * 2)];
  color1.value = getRandomColor();
  color2.value = getRandomColor();
  setGradient();
}

// Initialise le dégradé avec les valeurs actuelles
setGradient();

// Écouteurs d'événements pour les changements de couleur et d'orientation
color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);
random.addEventListener("click", setRandomGradient);
rotate.addEventListener("click", () => {
  dir = dir === "left" ? "right" : "left";
  setGradient();
});

// Écouteur d'événement pour le bouton de copie
copyCSSButton.addEventListener("click", function () {
  const cssText = css.textContent;
  navigator.clipboard
    .writeText(cssText)
    .then(() => {
      alert("La propriété CSS a été copiée !");
    })
    .catch((error) => {
      console.error("Une erreur s'est produite lors de la copie : ", error);
    });
});
