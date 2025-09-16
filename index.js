const verbs = ["have", "do", "say", "get", "make", "go", "know", "take", "see", "come", "think", "look", "want", "give", "use", "find", "tell", "ask", "work", "call", "try", "need", "feel", "become", "leave", "put", "mean", "keep", "let", "begin", "seem", "help", "talk", "turn", "start", "show", "hear", "play", "run", "move", "like", "live", "believe", "hold", "bring", "happen", "write", "sit", "stand", "eat", "draw", "run", "jump", "play", "walk", "read", "open", "close", "bring", "carry", "cut", "drive", "fall", "fly", "grow", "learn", "listen", "lose", "meet", "pay", "put", "read", "sleep", "speak", "study", "swim", "teach", "win"];
let currentWord = "";
let progress = 0;
let stars = localStorage.getItem("stars") ? parseInt(localStorage.getItem("stars")) : 0;

// función para desordenar letras de una palabra
function shuffle(word) {
  let arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

// mostrar un nuevo verbo desordenado
function newWord() {
  currentWord = verbs[Math.floor(Math.random() * verbs.length)];
  let scrambled = shuffle(currentWord);

  // aseguramos que salga diferente al original
  while (scrambled === currentWord) {
    scrambled = shuffle(currentWord);
  }

  document.getElementById("scrambled").innerHTML = scrambled;
  document.getElementById("answer").value = "";
}

// comprobar respuesta del usuario
function checkAnswer() {
  const userAnswer = document.getElementById("answer").value.toLowerCase().trim();
  if (userAnswer === currentWord) {
    progress += 20;
    if (progress >= 100) {
      progress = 0;
      stars++;
      localStorage.setItem("stars", stars);
      renderStars();
      alert("¡Ganaste una estrella! ⭐");
    }
    updateProgress();
    newWord();
  } else {
    alert("Incorrecto, intenta de nuevo.");
  }
}

// actualizar barra de progreso
function updateProgress() {
  document.getElementById("progress").style.width = progress + "%";
}

// mostrar estrellas guardadas
function renderStars() {
  document.getElementById("stars").textContent = "⭐".repeat(stars);
}
console.log('foo')
// iniciar el juego al cargar la página
window.onload = () => {
  renderStars();
  newWord();
  document.getElementById("checkBtn").addEventListener("click", checkAnswer);
};
