// TP2 - SPA - app.js

// ========================
// EJERCICIO 01 - CALCULADORA
// ========================

// hace la operación aritmética según el botón que se presionó
function calcular(operacion) {
  const a = Number(document.getElementById("num1").value);
  const b = Number(document.getElementById("num2").value);
  const res = document.getElementById("resultado");

  if (document.getElementById("num1").value === "" || document.getElementById("num2").value === "") {
    res.textContent = "Resultado: completá ambos campos";
    return;
  }

  if (operacion === "/" && b === 0) {
    res.textContent = "Resultado: no se puede dividir por cero";
    return;
  }

  let resultado;
  if (operacion === "+") resultado = a + b;
  else if (operacion === "-") resultado = a - b;
  else if (operacion === "*") resultado = a * b;
  else if (operacion === "/") resultado = a / b;

  res.textContent = "Resultado: " + resultado;
}

document.getElementById("sumar").addEventListener("click", function() { calcular("+"); });
document.getElementById("restar").addEventListener("click", function() { calcular("-"); });
document.getElementById("multiplicar").addEventListener("click", function() { calcular("*"); });
document.getElementById("dividir").addEventListener("click", function() { calcular("/"); });


// ========================
// EJERCICIO 02 - CONVERSOR DE TEMPERATURA
// ========================

// convierte la temperatura leyendo origen y destino de los selects
function convertirTemp() {
  const valor = Number(document.getElementById("tempInput").value);
  const desde = document.getElementById("origen").value;
  const hasta = document.getElementById("destino").value;
  const res = document.getElementById("resultadoTemp");

  if (document.getElementById("tempInput").value === "") {
    res.textContent = "Resultado: —";
    return;
  }

  if (desde === hasta) {
    res.textContent = "Resultado: " + valor.toFixed(2);
    return;
  }

  // primero convierto todo a celsius
  let celsius;
  if (desde === "c") celsius = valor;
  else if (desde === "f") celsius = (valor - 32) * 5 / 9;
  else celsius = valor - 273.15;

  // despues de celsius al destino
  let resultado;
  if (hasta === "c") resultado = celsius;
  else if (hasta === "f") resultado = celsius * 9 / 5 + 32;
  else resultado = celsius + 273.15;

  res.textContent = "Resultado: " + resultado.toFixed(2);
}

document.getElementById("tempInput").addEventListener("input", convertirTemp);
document.getElementById("origen").addEventListener("change", convertirTemp);
document.getElementById("destino").addEventListener("change", convertirTemp);


// ========================
// EJERCICIO 03 - CONTADOR
// ========================

let count = 0;

// actualiza el número en pantalla y cambia el color según el rango
function actualizarContador() {
  const el = document.getElementById("contador");
  el.textContent = count;
  el.className = "numero-grande";
  if (count < 33) el.classList.add("contador-bajo");
  else if (count < 67) el.classList.add("contador-medio");
  else el.classList.add("contador-alto");
}

document.getElementById("mas").addEventListener("click", function() {
  if (count < 100) count++;
  actualizarContador();
});

document.getElementById("menos").addEventListener("click", function() {
  if (count > 0) count--;
  actualizarContador();
});

document.getElementById("reset").addEventListener("click", function() {
  count = 0;
  actualizarContador();
});

actualizarContador();


// ========================
// EJERCICIO 04 - GENERADOR DE COLORES HEX
// ========================

let historialHex = [];

document.getElementById("colorBtn").addEventListener("click", function() {
  // genero un numero random y lo convierto a hex
  const color = "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, "0");

  document.getElementById("colorBox").style.backgroundColor = color;
  document.getElementById("colorTexto").textContent = color;

  historialHex.unshift(color);
  if (historialHex.length > 5) historialHex.pop();

  const contenedor = document.getElementById("historialColores");
  contenedor.innerHTML = "";
  historialHex.forEach(function(hex) {
    const span = document.createElement("span");
    span.style.backgroundColor = hex;
    span.title = hex;
    contenedor.appendChild(span);
  });
});


// ========================
// EJERCICIO 05 - TO-DO LIST
// ========================

// cuenta las tareas no completadas y actualiza el texto
function actualizarPendientes() {
  const total = document.querySelectorAll("#lista li").length;
  const completadas = document.querySelectorAll("#lista li.completada").length;
  const pendientes = total - completadas;
  document.getElementById("pendientesCount").textContent = pendientes + " tareas pendientes";
}

// lee el input, crea el li con botón eliminar y lo agrega a la lista
function agregarTarea() {
  const input = document.getElementById("tareaInput");
  const texto = input.value.trim();
  if (texto === "") return;

  const li = document.createElement("li");
  li.textContent = texto;

  const btn = document.createElement("button");
  btn.textContent = "✕";
  btn.classList.add("btn-eliminar");
  btn.addEventListener("click", function(e) {
    e.stopPropagation();
    li.remove();
    actualizarPendientes();
  });

  li.appendChild(btn);

  li.addEventListener("click", function() {
    li.classList.toggle("completada");
    actualizarPendientes();
  });

  document.getElementById("lista").appendChild(li);
  input.value = "";
  actualizarPendientes();
}

document.getElementById("agregar").addEventListener("click", agregarTarea);
document.getElementById("tareaInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") agregarTarea();
});


// ========================
// EJERCICIO 06 - RELOJ DIGITAL
// ========================

let formato24 = true;

// obtiene la hora actual y la muestra en el formato elegido
function actualizarReloj() {
  const now = new Date();
  let texto;
  if (formato24) {
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
    texto = h + ":" + m + ":" + s;
  } else {
    texto = now.toLocaleTimeString("es-AR", { hour12: true });
  }
  document.getElementById("reloj").textContent = texto;
}

document.getElementById("toggleFormato").addEventListener("click", function() {
  formato24 = !formato24;
  this.textContent = formato24 ? "Cambiar a 12h" : "Cambiar a 24h";
  actualizarReloj();
});

setInterval(actualizarReloj, 1000);
actualizarReloj();


// ========================
// EJERCICIO 07 - TEMA CLARO / OSCURO
// ========================

// lee el tema guardado en localStorage y aplica la clase correspondiente
function aplicarTema() {
  const tema = localStorage.getItem("tema") || "oscuro";
  if (tema === "claro") {
    document.body.classList.add("tema-claro");
    document.getElementById("temaIcono").textContent = "☀️";
    document.getElementById("temaLabel").textContent = "Modo claro activo";
  } else {
    document.body.classList.remove("tema-claro");
    document.getElementById("temaIcono").textContent = "🌙";
    document.getElementById("temaLabel").textContent = "Modo oscuro activo";
  }
}

document.getElementById("toggleTema").addEventListener("click", function() {
  const actual = localStorage.getItem("tema") || "oscuro";
  localStorage.setItem("tema", actual === "oscuro" ? "claro" : "oscuro");
  aplicarTema();
});

aplicarTema();


// ========================
// EJERCICIO 08 - GENERADOR DE CONTRASEÑAS
// ========================

document.getElementById("longitud").addEventListener("input", function() {
  document.getElementById("longLabel").textContent = this.value;
});

// arma el conjunto de caracteres según los checkboxes y genera la contraseña
function generarPassword() {
  const longitud = Number(document.getElementById("longitud").value);
  const usaMayus = document.getElementById("chkMayus").checked;
  const usaNums = document.getElementById("chkNums").checked;
  const usaSim = document.getElementById("chkSim").checked;

  let chars = "abcdefghijklmnopqrstuvwxyz";
  if (usaMayus) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (usaNums) chars += "0123456789";
  if (usaSim) chars += "!@#$%^&*()_+-=[]{}";

  let pass = "";
  for (let i = 0; i < longitud; i++) {
    pass += chars[Math.floor(Math.random() * chars.length)];
  }

  document.getElementById("passOutput").value = pass;
  document.getElementById("copiado").textContent = "";
}

document.getElementById("genPass").addEventListener("click", generarPassword);

document.getElementById("copiarPass").addEventListener("click", function() {
  const pass = document.getElementById("passOutput").value;
  if (!pass) return;
  navigator.clipboard.writeText(pass).then(function() {
    document.getElementById("copiado").textContent = "✓ Copiado al portapapeles";
    setTimeout(function() {
      document.getElementById("copiado").textContent = "";
    }, 2000);
  });
});

generarPassword();


// ========================
// EJERCICIO 09 - VALIDADOR DE CONTRASEÑA
// ========================

const reglas = {
  "req-long": /.{8,}/,
  "req-may": /[A-Z]/,
  "req-min": /[a-z]/,
  "req-num": /[0-9]/,
  "req-sim": /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/
};

document.getElementById("passInput").addEventListener("input", function() {
  const val = this.value;
  let score = 0;

  for (let id in reglas) {
    const li = document.getElementById(id);
    if (reglas[id].test(val)) {
      li.classList.add("ok");
      li.textContent = "✓ " + li.textContent.slice(2);
      score++;
    } else {
      li.classList.remove("ok");
      li.textContent = "✗ " + li.textContent.slice(2);
    }
  }

  const porcentaje = (score / 5) * 100;
  document.getElementById("barraFill").style.width = porcentaje + "%";

  const niveles = ["", "Muy débil", "Débil", "Regular", "Buena", "Fuerte"];
  const colores = ["", "#ef5350", "#ffa726", "#ffa726", "#66bb6a", "#4fc3f7"];
  document.getElementById("barraFill").style.backgroundColor = score > 0 ? colores[score] : "#ef5350";
  document.getElementById("nivelFortaleza").textContent = score > 0 ? niveles[score] : "—";
});


// ========================
// EJERCICIO 10 - CONVERSOR DE DIVISAS
// ========================

// tasas relativas al dolar
const tasas = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  ARS: 1050,
  BRL: 5.05,
  JPY: 151.5
};

// convierte el monto pasando primero a USD y después a la moneda destino
function convertirDivisas() {
  const monto = Number(document.getElementById("montoInput").value);
  const desde = document.getElementById("monedaOrigen").value;
  const hasta = document.getElementById("monedaDestino").value;

  if (isNaN(monto) || monto < 0) return;

  const enUSD = monto / tasas[desde];
  const resultado = enUSD * tasas[hasta];

  const formateado = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: hasta,
    maximumFractionDigits: 2
  }).format(resultado);

  document.getElementById("resultadoDivisas").textContent = monto + " " + desde + " = " + formateado;
}

document.getElementById("montoInput").addEventListener("input", convertirDivisas);
document.getElementById("monedaOrigen").addEventListener("change", convertirDivisas);
document.getElementById("monedaDestino").addEventListener("change", convertirDivisas);
convertirDivisas();


// ========================
// EJERCICIO 11 - FORMULARIO DE REGISTRO
// ========================

// valida un campo y muestra el error si hay
function validarCampo(campo) {
  const el = document.getElementById("reg" + campo.charAt(0).toUpperCase() + campo.slice(1));
  const errEl = document.getElementById("err-" + campo);
  const val = el ? el.value.trim() : "";
  let msg = "";

  if (campo === "nombre" && val.length < 2) msg = "Mínimo 2 caracteres";
  if (campo === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) msg = "Email inválido";
  if (campo === "edad" && (val === "" || Number(val) < 1 || Number(val) > 120)) msg = "Ingresá una edad válida";
  if (campo === "pass" && val.length < 8) msg = "Mínimo 8 caracteres";
  if (campo === "confirm" && val !== document.getElementById("regPass").value) msg = "Las contraseñas no coinciden";

  errEl.textContent = msg;
  return msg === "";
}

const campos = ["nombre", "email", "edad", "pass", "confirm"];
campos.forEach(function(campo) {
  const id = "reg" + campo.charAt(0).toUpperCase() + campo.slice(1);
  document.getElementById(id).addEventListener("blur", function() {
    validarCampo(campo);
  });
});

document.getElementById("submitReg").addEventListener("click", function() {
  let todoValido = true;
  campos.forEach(function(campo) {
    if (!validarCampo(campo)) todoValido = false;
  });

  const exito = document.getElementById("regExito");
  if (todoValido) {
    exito.textContent = "✓ Registro exitoso!";
    campos.forEach(function(campo) {
      document.getElementById("reg" + campo.charAt(0).toUpperCase() + campo.slice(1)).value = "";
    });
  } else {
    exito.textContent = "";
  }
});


// ========================
// EJERCICIO 12 - ADIVINA EL NUMERO
// ========================

let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let intentosRestantes = 10;

document.getElementById("adivinar").addEventListener("click", function() {
  if (intentosRestantes <= 0) return;

  const guess = Number(document.getElementById("numGuess").value);
  const pista = document.getElementById("pista");

  if (!guess || guess < 1 || guess > 100) {
    pista.textContent = "Ingresá un número entre 1 y 100";
    return;
  }

  intentosRestantes--;
  document.getElementById("intentosLeft").textContent = intentosRestantes;

  if (guess === numeroSecreto) {
    pista.textContent = "¡Correcto! Era el " + numeroSecreto;
    document.getElementById("adivinar").disabled = true;
  } else if (intentosRestantes === 0) {
    pista.textContent = "Sin intentos. Era el " + numeroSecreto;
  } else if (guess < numeroSecreto) {
    pista.textContent = "El número es MAYOR que " + guess;
  } else {
    pista.textContent = "El número es MENOR que " + guess;
  }

  document.getElementById("numGuess").value = "";
});

document.getElementById("numGuess").addEventListener("keydown", function(e) {
  if (e.key === "Enter") document.getElementById("adivinar").click();
});

document.getElementById("nuevoJuego").addEventListener("click", function() {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  intentosRestantes = 10;
  document.getElementById("intentosLeft").textContent = 10;
  document.getElementById("pista").textContent = "—";
  document.getElementById("numGuess").value = "";
  document.getElementById("adivinar").disabled = false;
});


// ========================
// EJERCICIO 13 - CRONOMETRO
// ========================

let cronoInterval = null;
let tiempoMs = 0;
let lapNum = 0;

// formatea milisegundos a MM:SS.d
function formatTiempo(ms) {
  const dec = Math.floor(ms / 100) % 10;
  const seg = Math.floor(ms / 1000) % 60;
  const min = Math.floor(ms / 60000);
  return String(min).padStart(2, "0") + ":" + String(seg).padStart(2, "0") + "." + dec;
}

document.getElementById("cronoStart").addEventListener("click", function() {
  if (cronoInterval) return;
  const inicio = Date.now() - tiempoMs;
  cronoInterval = setInterval(function() {
    tiempoMs = Date.now() - inicio;
    document.getElementById("cronoDisplay").textContent = formatTiempo(tiempoMs);
  }, 100);
});

document.getElementById("cronoStop").addEventListener("click", function() {
  clearInterval(cronoInterval);
  cronoInterval = null;
});

document.getElementById("cronoReset").addEventListener("click", function() {
  clearInterval(cronoInterval);
  cronoInterval = null;
  tiempoMs = 0;
  lapNum = 0;
  document.getElementById("cronoDisplay").textContent = "00:00.0";
  document.getElementById("laps").innerHTML = "";
});

document.getElementById("cronoLap").addEventListener("click", function() {
  if (!cronoInterval) return;
  lapNum++;
  const li = document.createElement("li");
  li.textContent = "Vuelta " + lapNum + ": " + formatTiempo(tiempoMs);
  document.getElementById("laps").prepend(li);
});


// ========================
// EJERCICIO 14 - BUSCADOR DE TABLA
// ========================

const peliculas = [
  { titulo: "Interstellar", director: "Nolan", anio: 2014, genero: "Sci-Fi", nota: "9.0" },
  { titulo: "El Padrino", director: "Coppola", anio: 1972, genero: "Drama", nota: "9.2" },
  { titulo: "Pulp Fiction", director: "Tarantino", anio: 1994, genero: "Thriller", nota: "8.9" },
  { titulo: "Inception", director: "Nolan", anio: 2010, genero: "Sci-Fi", nota: "8.8" },
  { titulo: "Matrix", director: "Wachowski", anio: 1999, genero: "Acción", nota: "8.7" },
  { titulo: "Forrest Gump", director: "Zemeckis", anio: 1994, genero: "Drama", nota: "8.8" },
  { titulo: "El Rey León", director: "Allers", anio: 1994, genero: "Animación", nota: "8.5" },
  { titulo: "Gladiador", director: "Scott", anio: 2000, genero: "Acción", nota: "8.5" },
  { titulo: "Titanic", director: "Cameron", anio: 1997, genero: "Romance", nota: "7.9" },
  { titulo: "Avatar", director: "Cameron", anio: 2009, genero: "Sci-Fi", nota: "7.8" },
  { titulo: "Joker", director: "Phillips", anio: 2019, genero: "Thriller", nota: "8.4" },
  { titulo: "Parasite", director: "Bong Joon-ho", anio: 2019, genero: "Drama", nota: "8.5" },
  { titulo: "1917", director: "Mendes", anio: 2019, genero: "Bélico", nota: "8.3" },
  { titulo: "La La Land", director: "Chazelle", anio: 2016, genero: "Musical", nota: "8.0" },
  { titulo: "Dunkirk", director: "Nolan", anio: 2017, genero: "Bélico", nota: "7.9" },
  { titulo: "Bohemian Rhapsody", director: "Singer", anio: 2018, genero: "Biográfico", nota: "7.9" }
];

// genera las filas de la tabla a partir del array de películas
function renderTabla() {
  const tbody = document.getElementById("tablaBody");
  tbody.innerHTML = "";
  peliculas.forEach(function(p) {
    const tr = document.createElement("tr");
    tr.innerHTML = "<td>" + p.titulo + "</td><td>" + p.director + "</td><td>" + p.anio + "</td><td>" + p.genero + "</td><td>" + p.nota + "</td>";
    tbody.appendChild(tr);
  });
}

// oculta las filas que no coinciden con el texto buscado
function filtrarTabla() {
  const busq = document.getElementById("busqueda").value.toLowerCase();
  const filas = document.querySelectorAll("#tablaBody tr");
  let visibles = 0;

  filas.forEach(function(fila) {
    if (fila.textContent.toLowerCase().includes(busq)) {
      fila.classList.remove("oculta");
      visibles++;
    } else {
      fila.classList.add("oculta");
    }
  });

  document.getElementById("coincidencias").textContent = visibles + " resultado(s)";
}

document.getElementById("busqueda").addEventListener("input", filtrarTabla);
renderTabla();
filtrarTabla();


// ========================
// EJERCICIO 15 - FAQ ACORDEON
// ========================

const preguntas = [
  { q: "¿Qué es JavaScript?", r: "JavaScript es un lenguaje de programación interpretado que se usa principalmente en el navegador para hacer páginas web interactivas." },
  { q: "¿Qué diferencia hay entre let y const?", r: "let permite cambiar el valor de la variable después de declararla, const no permite reasignación." },
  { q: "¿Qué es el DOM?", r: "El DOM (Document Object Model) es la representación en árbol del HTML de la página que JavaScript puede modificar dinámicamente." },
  { q: "¿Qué son los eventos en JS?", r: "Son acciones del usuario como click, tecla o scroll que podemos capturar con addEventListener para ejecutar código." },
  { q: "¿Qué es una SPA?", r: "Una Single Page Application carga una sola página HTML y actualiza el contenido dinámicamente sin recargar la página." }
];

const faqContainer = document.getElementById("faqContainer");

preguntas.forEach(function(item) {
  const div = document.createElement("div");
  div.classList.add("faq-item");

  const btn = document.createElement("button");
  btn.classList.add("faq-pregunta");
  btn.innerHTML = "<span>" + item.q + "</span><span>▼</span>";
  btn.setAttribute("aria-expanded", "false");

  const respuesta = document.createElement("div");
  respuesta.classList.add("faq-respuesta");
  respuesta.textContent = item.r;

  btn.addEventListener("click", function() {
    const estaAbierta = respuesta.classList.contains("abierta");

    // cierro todas
    document.querySelectorAll(".faq-respuesta").forEach(function(r) { r.classList.remove("abierta"); });
    document.querySelectorAll(".faq-pregunta").forEach(function(b) { b.setAttribute("aria-expanded", "false"); });

    if (!estaAbierta) {
      respuesta.classList.add("abierta");
      btn.setAttribute("aria-expanded", "true");
    }
  });

  div.appendChild(btn);
  div.appendChild(respuesta);
  faqContainer.appendChild(div);
});


// ========================
// EJERCICIO 16 - CARRITO DE COMPRAS
// ========================

const productos = [
  { id: 1, nombre: "Teclado Mecánico", precio: 29.99 },
  { id: 2, nombre: "Mouse Inalámbrico", precio: 19.99 },
  { id: 3, nombre: "Monitor 27\"", precio: 299.99 },
  { id: 4, nombre: "Auriculares USB", precio: 39.99 },
  { id: 5, nombre: "Webcam HD", precio: 49.99 }
];

let carrito = {};

// crea las cards de producto con su botón de agregar al carrito
function renderCatalogo() {
  const cont = document.getElementById("catalogo");
  cont.innerHTML = "";
  productos.forEach(function(p) {
    const card = document.createElement("div");
    card.classList.add("producto-card");
    card.innerHTML = "<strong>" + p.nombre + "</strong><span>$" + p.precio.toFixed(2) + "</span>";
    const btn = document.createElement("button");
    btn.textContent = "Agregar";
    btn.addEventListener("click", function() {
      if (carrito[p.id]) carrito[p.id].cantidad++;
      else carrito[p.id] = { nombre: p.nombre, precio: p.precio, cantidad: 1 };
      renderCarrito();
    });
    card.appendChild(btn);
    cont.appendChild(card);
  });
}

// muestra los items del carrito y calcula subtotal, descuento y total
function renderCarrito() {
  const lista = document.getElementById("carritoItems");
  lista.innerHTML = "";
  let subtotal = 0;

  Object.values(carrito).forEach(function(item) {
    const sub = item.precio * item.cantidad;
    subtotal += sub;
    const li = document.createElement("li");
    li.innerHTML = "<span>" + item.nombre + " x" + item.cantidad + "</span><span>$" + sub.toFixed(2) + "</span>";
    lista.appendChild(li);
  });

  const descuento = subtotal > 50 ? subtotal * 0.1 : 0;
  const total = subtotal - descuento;

  document.getElementById("subtotal").textContent = "$" + subtotal.toFixed(2);
  document.getElementById("total").textContent = "$" + total.toFixed(2) + (descuento > 0 ? " (−10%)" : "");
}

document.getElementById("vaciarCarrito").addEventListener("click", function() {
  carrito = {};
  renderCarrito();
});

renderCatalogo();
renderCarrito();


// ========================
// EJERCICIO 17 - PALETA DE COLORES
// ========================

// convierte hex a hsl para poder manipular el color
function hexAHSL(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s;
  let l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

// convierte el color HEX a HSL y genera 5 variantes de luminosidad
function generarPaleta() {
  const hex = document.getElementById("colorBase").value;
  const { h, s } = hexAHSL(hex);
  const luces = [80, 65, 50, 35, 20];
  const etiquetas = ["Tinte 2", "Tinte 1", "Base", "Sombra 1", "Sombra 2"];

  const cont = document.getElementById("paletaContainer");
  cont.innerHTML = "";

  luces.forEach(function(l, i) {
    const color = "hsl(" + h + ", " + s + "%, " + l + "%)";
    const chip = document.createElement("div");
    chip.classList.add("paleta-chip");
    chip.style.backgroundColor = color;
    chip.textContent = etiquetas[i];
    chip.title = "Clic para copiar: " + color;

    chip.addEventListener("click", function() {
      navigator.clipboard.writeText(color).then(function() {
        chip.style.outline = "2px solid white";
        setTimeout(function() { chip.style.outline = ""; }, 800);
      });
    });

    cont.appendChild(chip);
  });
}

document.getElementById("genPaleta").addEventListener("click", generarPaleta);
generarPaleta();


// ========================
// EJERCICIO 18 - QUIZ CON TEMPORIZADOR
// ========================

const preguntasQuiz = [
  { pregunta: "¿Cuál es el resultado de typeof null en JavaScript?", opciones: ["null", "object", "undefined", "string"], correcta: 1 },
  { pregunta: "¿Qué método agrega un elemento al final de un array?", opciones: ["push()", "pop()", "shift()", "unshift()"], correcta: 0 },
  { pregunta: "¿Qué significa CSS?", opciones: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Syntax", "Colored Style System"], correcta: 1 },
  { pregunta: "¿Cuál NO es un tipo primitivo en JavaScript?", opciones: ["string", "boolean", "object", "number"], correcta: 2 },
  { pregunta: "¿Qué propiedad activa Flexbox?", opciones: ["grid", "flex", "display: flex", "flexbox"], correcta: 2 },
  { pregunta: "¿Qué hace Array.filter()?", opciones: ["Modifica el original", "Retorna un nuevo array con los que pasan la condición", "Suma los elementos", "Ordena el array"], correcta: 1 },
  { pregunta: "¿Cómo se declara una constante?", opciones: ["var x = 5", "let x = 5", "const x = 5", "fixed x = 5"], correcta: 2 },
  { pregunta: "¿Qué etiqueta incluye JavaScript en HTML?", opciones: ["<js>", "<script>", "<javascript>", "<code>"], correcta: 1 },
  { pregunta: "¿Qué hace localStorage.setItem()?", opciones: ["Lee un dato", "Elimina un dato", "Guarda un dato en el navegador", "Limpia el storage"], correcta: 2 },
  { pregunta: "¿Qué operador compara tipo y valor?", opciones: ["==", "=", "===", "!="], correcta: 2 }
];

let quizIndex = 0;
let quizPuntaje = 0;
let quizTimer = null;
let tiempoQ = 30;
let respondido = false;

// reinicia los contadores y arranca desde la primera pregunta
function iniciarQuiz() {
  quizIndex = 0;
  quizPuntaje = 0;
  document.getElementById("quizStart").style.display = "none";
  document.getElementById("quizResultado").style.display = "none";
  document.getElementById("quizPregunta").style.display = "block";
  mostrarPregunta();
}

// muestra la pregunta actual, sus opciones y pone en marcha el timer
function mostrarPregunta() {
  if (quizIndex >= preguntasQuiz.length) {
    mostrarResultado();
    return;
  }

  respondido = false;
  clearInterval(quizTimer);
  tiempoQ = 30;

  const q = preguntasQuiz[quizIndex];
  document.getElementById("quizNumero").textContent = "Pregunta " + (quizIndex + 1) + "/" + preguntasQuiz.length;
  document.getElementById("quizTexto").textContent = q.pregunta;

  const opcCont = document.getElementById("quizOpciones");
  opcCont.innerHTML = "";
  q.opciones.forEach(function(op, i) {
    const btn = document.createElement("button");
    btn.textContent = op;
    btn.addEventListener("click", function() { responder(i, btn); });
    opcCont.appendChild(btn);
  });

  actualizarTimer();
  quizTimer = setInterval(function() {
    tiempoQ--;
    actualizarTimer();
    if (tiempoQ <= 0) {
      clearInterval(quizTimer);
      if (!respondido) {
        respondido = true;
        marcarRespuesta(-1);
        setTimeout(function() { quizIndex++; mostrarPregunta(); }, 1200);
      }
    }
  }, 1000);
}

// actualiza el texto y la barra del cronómetro del quiz
function actualizarTimer() {
  document.getElementById("quizTimer").textContent = tiempoQ + "s";
  document.getElementById("timerBarFill").style.width = ((tiempoQ / 30) * 100) + "%";
}

// procesa la respuesta del usuario y pasa a la siguiente pregunta
function responder(indice, btnEl) {
  if (respondido) return;
  respondido = true;
  clearInterval(quizTimer);
  marcarRespuesta(indice, btnEl);
  setTimeout(function() { quizIndex++; mostrarPregunta(); }, 1200);
}

// pinta de verde la correcta y de rojo la incorrecta si falló
function marcarRespuesta(indice, btnEl) {
  const q = preguntasQuiz[quizIndex];
  document.querySelectorAll("#quizOpciones button").forEach(function(b, i) {
    if (i === q.correcta) b.classList.add("correcta");
    else if (b === btnEl) b.classList.add("incorrecta");
    b.disabled = true;
  });
  if (indice === q.correcta) quizPuntaje++;
}

// muestra el puntaje final al terminar todas las preguntas
function mostrarResultado() {
  document.getElementById("quizPregunta").style.display = "none";
  const res = document.getElementById("quizResultado");
  res.style.display = "block";
  const pct = Math.round((quizPuntaje / preguntasQuiz.length) * 100);
  res.innerHTML = "<p><strong>Resultado: " + quizPuntaje + "/" + preguntasQuiz.length + " (" + pct + "%)</strong></p>" +
    "<p>" + (pct >= 70 ? "¡Muy bien!" : "Seguí practicando") + "</p>" +
    "<button id='reiniciarQuiz'>Volver a intentar</button>";
  document.getElementById("reiniciarQuiz").addEventListener("click", function() {
    res.style.display = "none";
    document.getElementById("quizStart").style.display = "block";
  });
}

document.getElementById("iniciarQuiz").addEventListener("click", iniciarQuiz);


// ========================
// EJERCICIO 19 - GRAFICO DE BARRAS
// ========================

let datosGrafico = [];

// calcula la altura de cada barra en proporción al valor máximo y las dibuja
function renderGrafico() {
  const cont = document.getElementById("graficoContainer");
  cont.innerHTML = "";
  if (datosGrafico.length === 0) return;

  const maxVal = Math.max.apply(null, datosGrafico.map(function(d) { return d.valor; }));

  datosGrafico.forEach(function(d) {
    const altura = (d.valor / maxVal) * 130;

    const item = document.createElement("div");
    item.classList.add("barra-item");

    const val = document.createElement("span");
    val.classList.add("barra-val");
    val.textContent = d.valor;

    const barra = document.createElement("div");
    barra.classList.add("barra");
    barra.style.height = altura + "px";

    const nombre = document.createElement("span");
    nombre.classList.add("barra-nombre");
    nombre.textContent = d.nombre;

    item.appendChild(val);
    item.appendChild(barra);
    item.appendChild(nombre);
    cont.appendChild(item);
  });
}

document.getElementById("agregarBarra").addEventListener("click", function() {
  const nombre = document.getElementById("grafNombre").value.trim();
  const valor = Number(document.getElementById("grafValor").value);
  if (!nombre || !valor || valor <= 0) return;

  datosGrafico.push({ nombre: nombre, valor: valor });
  document.getElementById("grafNombre").value = "";
  document.getElementById("grafValor").value = "";
  renderGrafico();
});

document.getElementById("grafValor").addEventListener("keydown", function(e) {
  if (e.key === "Enter") document.getElementById("agregarBarra").click();
});

document.getElementById("limpiarGrafico").addEventListener("click", function() {
  datosGrafico = [];
  renderGrafico();
});


// ========================
// EJERCICIO 20 - KANBAN DRAG & DROP
// ========================

let cardId = 0;

// crea un elemento div draggable con texto y botón para eliminar
function crearTarjeta(texto) {
  const card = document.createElement("div");
  card.classList.add("kanban-card");
  card.setAttribute("draggable", "true");
  card.dataset.id = ++cardId;

  const span = document.createElement("span");
  span.textContent = texto;

  const btnDel = document.createElement("button");
  btnDel.classList.add("del-card");
  btnDel.textContent = "✕";
  btnDel.addEventListener("click", function() { card.remove(); });

  card.appendChild(span);
  card.appendChild(btnDel);

  card.addEventListener("dragstart", function(e) {
    e.dataTransfer.setData("text/plain", card.dataset.id);
    card.classList.add("dragging");
  });

  card.addEventListener("dragend", function() {
    card.classList.remove("dragging");
  });

  return card;
}

document.getElementById("kanbanAgregar").addEventListener("click", function() {
  const input = document.getElementById("kanbanInput");
  const texto = input.value.trim();
  if (!texto) return;
  document.getElementById("cards-todo").appendChild(crearTarjeta(texto));
  input.value = "";
});

document.getElementById("kanbanInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") document.getElementById("kanbanAgregar").click();
});

// configuro las columnas para recibir el drop
document.querySelectorAll(".kanban-cards").forEach(function(zona) {
  zona.addEventListener("dragover", function(e) {
    e.preventDefault();
    zona.parentElement.classList.add("drag-over");
  });

  zona.addEventListener("dragleave", function() {
    zona.parentElement.classList.remove("drag-over");
  });

  zona.addEventListener("drop", function(e) {
    e.preventDefault();
    zona.parentElement.classList.remove("drag-over");
    const id = e.dataTransfer.getData("text/plain");
    const card = document.querySelector(".kanban-card[data-id='" + id + "']");
    if (card) zona.appendChild(card);
  });
});

// tarjetas de ejemplo para que no quede vacio
document.getElementById("cards-todo").appendChild(crearTarjeta("Diseñar interfaz"));
document.getElementById("cards-todo").appendChild(crearTarjeta("Escribir tests"));
document.getElementById("cards-progress").appendChild(crearTarjeta("Implementar login"));
document.getElementById("cards-done").appendChild(crearTarjeta("Setup del proyecto"));
