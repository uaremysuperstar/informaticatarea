// Elementos
const entrada = document.getElementById("entrada");
const guardarBtn = document.getElementById("guardarBtn");
const lista = document.getElementById("lista");
const bonusBar = document.getElementById("bonusBar");
const bonusText = document.getElementById("bonusText");
const starsDiv = document.getElementById("stars");

// Datos guardados
let datos = JSON.parse(localStorage.getItem("misDatos")) || [];
let puntos = Number(localStorage.getItem("misPuntos")) || 0;
let estrellas = JSON.parse(localStorage.getItem("misEstrellas")) || [];

// ⚡ Si los puntos están en 100 o más → reiniciar a 0
if (puntos >= 100) {
  puntos = 0;
  localStorage.setItem("misPuntos", String(puntos));
}

// Mostrar UI inicial
actualizarBonusUI();
mostrarLista();
mostrarEstrellas();

// Guardar tarea
guardarBtn.addEventListener("click", () => {
  const text = entrada.value.trim();
  if (text === "") return;
  datos.push(text);
  localStorage.setItem("misDatos", JSON.stringify(datos));
  entrada.value = "";
  mostrarLista();
});

// Enter también guarda
entrada.addEventListener("keydown", (e) => {
  if (e.key === "Enter") guardarBtn.click();
});

// Mostrar lista con botones
function mostrarLista() {
  lista.innerHTML = "";
  datos.forEach((item, index) => {
    const li = document.createElement("li");

    const texto = document.createElement("span");
    texto.textContent = item;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "✔️";
    btn.title = "Marcar como completada";
    btn.addEventListener("click", () => completarTarea(index));

    li.appendChild(texto);
    li.appendChild(btn);
    lista.appendChild(li);
  });

  if (datos.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No hay tareas. Agrega una arriba.";
    lista.appendChild(li);
  }
}

// Completar tarea
function completarTarea(index) {
  if (index < 0 || index >= datos.length) return;

  puntos += 5;

  if (puntos >= 100) {
    puntos = 0; // reiniciar barra
    agregarEstrella(); // dar recompensa
  }

  // Guardar puntos
  localStorage.setItem("misPuntos", String(puntos));
  actualizarBonusUI();

  // Eliminar tarea
  datos.splice(index, 1);
  localStorage.setItem("misDatos", JSON.stringify(datos));
  mostrarLista();

  alert("¡Lo lograste, sigue así! +5 puntos");
}

// Actualizar barra
function actualizarBonusUI() {
  bonusBar.style.width = puntos + "%";
  bonusText.textContent = puntos + " / 100 puntos";
}

// Agregar estrellita
function agregarEstrella() {
  estrellas.push("⭐");
  localStorage.setItem("misEstrellas", JSON.stringify(estrellas));
  mostrarEstrellas();
  alert("¡Estrellita por tu esfuerzo, lo estas haciendo genial!");
}

// Mostrar estrellas guardadas
function mostrarEstrellas() {
  starsDiv.innerHTML = "";
  estrellas.forEach(() => {
    const estrella = document.createElement("span");
    estrella.textContent = "⭐";
    estrella.style.fontSize = "30px";
    estrella.style.margin = "5px";
    starsDiv.appendChild(estrella);
  });
}

