const svg = document.getElementById("plano");
const tooltip = document.getElementById("tooltip");
const areaList = document.getElementById("areaList");
const search = document.getElementById("search");

let areas = [
  {
    "id": "vestibulo",
    "nombre": "Vestíbulo",
    "tipo": "vestibulo",
    "x": 100,
    "y": 100,
    "width": 150,
    "height": 100,
    "color": "#fff9c4",
    "descripcion": "Área de acceso principal"
  },
  {
    "id": "pasillo_1",
    "nombre": "Pasillo Principal",
    "tipo": "pasillo",
    "x": 100,
    "y": 200,
    "width": 800,
    "height": 30,
    "color": "#eeeeee",
    "descripcion": "Conecta las distintas zonas"
  },
  {
    "id": "habitacion_1",
    "nombre": "Habitación 101",
    "tipo": "habitacion",
    "x": 100,
    "y": 240,
    "width": 80,
    "height": 60,
    "color": "#e1f5fe",
    "descripcion": "Habitación estándar"
  },
  {
    "id": "habitacion_2",
    "nombre": "Habitación 102",
    "tipo": "habitacion",
    "x": 200,
    "y": 240,
    "width": 80,
    "height": 60,
    "color": "#e1f5fe",
    "descripcion": "Habitación estándar"
  },
  {
    "id": "capilla",
    "nombre": "Capilla",
    "tipo": "capilla",
    "x": 400,
    "y": 100,
    "width": 100,
    "height": 80,
    "color": "#f3e5f5",
    "descripcion": "Espacio espiritual"
  },
  {
    "id": "cafeteria",
    "nombre": "Cafetería",
    "tipo": "cafeteria",
    "x": 520,
    "y": 100,
    "width": 150,
    "height": 80,
    "color": "#ffe0b2",
    "descripcion": "Zona de comidas y bebidas"
  },
  {
    "id": "zona_verde_1",
    "nombre": "Zona Verde",
    "tipo": "zona_verde",
    "x": 700,
    "y": 300,
    "width": 200,
    "height": 150,
    "color": "#c8e6c9",
    "descripcion": "Jardín con árboles"
  },
  {
    "id": "fisioterapia",
    "nombre": "Fisioterapia",
    "tipo": "fisioterapia",
    "x": 100,
    "y": 320,
    "width": 180,
    "height": 70,
    "color": "#b2dfdb",
    "descripcion": "Área de rehabilitación física"
  },
  {
    "id": "psicologia",
    "nombre": "Psicología",
    "tipo": "psicologia",
    "x": 300,
    "y": 320,
    "width": 150,
    "height": 70,
    "color": "#f8bbd0",
    "descripcion": "Consultas psicológicas"
  },
  {
    "id": "botiquin",
    "nombre": "Botiquín",
    "tipo": "botiquin",
    "x": 470,
    "y": 320,
    "width": 80,
    "height": 70,
    "color": "#ffcdd2",
    "descripcion": "Atención médica básica"
  },
  {
    "id": "zona_verde_2",
    "nombre": "Zona Verde Norte",
    "tipo": "zona_verde",
    "x": 50,
    "y": 450,
    "width": 300,
    "height": 150,
    "color": "#c8e6c9",
    "descripcion": "Zona verde con bancos y árboles decorativos",
    "decoraciones": [
      {
        "tipo": "arbol",
        "src": "assets/tree.svg",
        "x": 70,
        "y": 470
      },
      {
        "tipo": "arbol",
        "src": "assets/tree.svg",
        "x": 150,
        "y": 500
      },
      {
        "tipo": "arbol",
        "src": "assets/tree.svg",
        "x": 250,
        "y": 470
      }
    ]
  },
  {
    "id": "recepcion",
    "nombre": "Recepción",
    "tipo": "recepcion",
    "x": 280,
    "y": 100,
    "width": 100,
    "height": 80,
    "color": "#fff9c4",
    "descripcion": "Área de atención al visitante"
  },
  {
    "id": "peluqueria",
    "nombre": "Peluquería",
    "tipo": "peluqueria",
    "x": 650,
    "y": 100,
    "width": 120,
    "height": 80,
    "color": "#fce4ec",
    "descripcion": "Corte y arreglo personal"
  },
  {
    "id": "vestuarios",
    "nombre": "Vestuarios",
    "tipo": "vestuarios",
    "x": 700,
    "y": 240,
    "width": 100,
    "height": 60,
    "color": "#d1c4e9",
    "descripcion": "Área de cambio de ropa"
  },
  {
    "id": "sala_usos_multiples",
    "nombre": "Sala de Usos Múltiples",
    "tipo": "sala_usos_multiples",
    "x": 470,
    "y": 400,
    "width": 200,
    "height": 100,
    "color": "#ffe082",
    "descripcion": "Sala para talleres y actividades"
  },
  {
    "id": "recepcion_mercancias",
    "nombre": "Recepción de Mercancías",
    "tipo": "recepcion_mercancias",
    "x": 700,
    "y": 470,
    "width": 180,
    "height": 80,
    "color": "#d7ccc8",
    "descripcion": "Área para recibir suministros"
  }
];


const initialViewBox = "0 0 1000 600"; // ajusta según tamaño plano original

svg.setAttribute("viewBox", initialViewBox);

renderAreas();
fillAreaList();

function renderAreas() {
  // Limpiar svg antes de dibujar (para reiniciar render)
  while (svg.firstChild) svg.removeChild(svg.firstChild);

  areas.forEach(area => {
    // Ajustes de posición para reducir espacios salvo el caso de vestuarios y zona verde
    let offsetX = 0, offsetY = 0;
    // Por ejemplo, si quieres compactar todas las áreas 10px menos a la derecha y abajo, salvo entre vestuarios y zona verde:
    if (!(area.id === "vestuarios" || area.tipo === "zona_verde")) {
      offsetX = -10;
      offsetY = -10;
    }
    // Si quieres un ajuste más fino, dime.

    const el = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    el.setAttribute("x", area.x + offsetX);
    el.setAttribute("y", area.y + offsetY);
    el.setAttribute("width", area.width);
    el.setAttribute("height", area.height);
    el.setAttribute("fill", area.color);
    el.setAttribute("stroke", "#333");
    el.setAttribute("stroke-width", "1");
    el.classList.add("area");
    el.dataset.id = area.id;
    el.style.cursor = "pointer";

    el.addEventListener("mouseenter", () => {
      tooltip.innerHTML = `<strong>${area.nombre}</strong><br>${area.descripcion}`;
      tooltip.style.display = "block";
    });

    el.addEventListener("mousemove", (e) => {
      tooltip.style.left = (e.pageX + 15) + "px";
      tooltip.style.top = (e.pageY + 15) + "px";
    });

    el.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });

    el.addEventListener("click", (e) => {
      e.stopPropagation(); // para que no dispare click fuera
      focusArea(area.id);
    });

    svg.appendChild(el);

    // Añadir el texto con el nombre del área
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.textContent = area.nombre;
    text.setAttribute("x", area.x + offsetX + 5);  // un poco dentro a la izquierda
    text.setAttribute("y", area.y + offsetY + 20); // un poco hacia abajo para que se lea bien
    text.setAttribute("font-size", "14");
    text.setAttribute("fill", "#000");
    text.setAttribute("font-family", "Arial, sans-serif");
    text.style.userSelect = "none";
    svg.appendChild(text);

    // Añadir decoraciones con imágenes si existen
    if (area.decoraciones && Array.isArray(area.decoraciones)) {
      area.decoraciones.forEach(deco => {
        if (deco.tipo === "arbol" && deco.src) {
          const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
          img.setAttribute("href", deco.src);
          img.setAttribute("x", deco.x);
          img.setAttribute("y", deco.y);
          img.setAttribute("width", 30);
          img.setAttribute("height", 30);
          svg.appendChild(img);
        }
      });
    }
  });

  createResetButton();
}


function createResetButton() {
  // Crear grupo SVG para botón
  const btnGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  btnGroup.setAttribute("class", "reset-btn");
  btnGroup.style.cursor = "pointer";

  // Fondo botón (rectángulo con esquinas redondeadas)
  const btnBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  btnBg.setAttribute("x", 10);
  btnBg.setAttribute("y", 540);
  btnBg.setAttribute("width", 130);
  btnBg.setAttribute("height", 40);
  btnBg.setAttribute("rx", 8);
  btnBg.setAttribute("ry", 8);
  btnBg.setAttribute("fill", "#4caf50");
  btnBg.setAttribute("stroke", "#2e7d32");
  btnBg.setAttribute("stroke-width", "2");
  btnGroup.appendChild(btnBg);

  // Icono (un simple "home" / reset estilo)
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "path");
  icon.setAttribute("d", "M15 35 L15 25 L25 25 L25 35 Z M10 35 L20 20 L30 35 Z"); // casa sencilla
  icon.setAttribute("fill", "white");
  icon.setAttribute("transform", "translate(15,510) scale(1.5)");
  btnGroup.appendChild(icon);

  // Texto
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", 60);
  text.setAttribute("y", 570);
  text.setAttribute("fill", "white");
  text.setAttribute("font-family", "Arial, sans-serif");
  text.setAttribute("font-size", "16");
  text.textContent = "Vista Inicial";
  btnGroup.appendChild(text);

  btnGroup.addEventListener("click", () => {
    resetView();
  });

  svg.appendChild(btnGroup);
}

function fillAreaList() {
  areaList.innerHTML = "";
  areas.forEach(area => {
    const li = document.createElement("li");
    li.textContent = area.nombre;
    li.style.cursor = "pointer";
    li.addEventListener("click", () => focusArea(area.id));
    areaList.appendChild(li);
  });
}

search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  const items = areaList.querySelectorAll("li");
  items.forEach((item, index) => {
    const match = areas[index].nombre.toLowerCase().includes(value);
    item.style.display = match ? "block" : "none";
  });
});

function focusArea(id) {
  const area = areas.find(a => a.id === id);
  if (!area) return;
  const padding = 20;
  const x = area.x - padding;
  const y = area.y - padding;
  const width = area.width + 2 * padding;
  const height = area.height + 2 * padding;
  svg.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
}

// Resetea a vista inicial
function resetView() {
  svg.setAttribute("viewBox", initialViewBox);
}

// Clic fuera de áreas: vuelve a vista inicial
svg.addEventListener("click", () => {
  resetView();
});

// Navegación con teclado
document.addEventListener("keydown", (e) => {
  let [x, y, w, h] = svg.getAttribute("viewBox").split(" ").map(Number);
  const step = 20;
  if (e.key === "ArrowLeft") x -= step;
  if (e.key === "ArrowRight") x += step;
  if (e.key === "ArrowUp") y -= step;
  if (e.key === "ArrowDown") y += step;
  svg.setAttribute("viewBox", `${x} ${y} ${w} ${h}`);
});

// Zoom con la rueda del ratón
svg.addEventListener("wheel", (e) => {
  e.preventDefault();
  let [x, y, w, h] = svg.getAttribute("viewBox").split(" ").map(Number);
  const zoom = e.deltaY < 0 ? 0.9 : 1.1;
  const cx = x + w / 2;
  const cy = y + h / 2;
  w *= zoom;
  h *= zoom;
  x = cx - w / 2;
  y = cy - h / 2;
  svg.setAttribute("viewBox", `${x} ${y} ${w} ${h}`);
}, { passive: false });