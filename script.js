const svg = document.getElementById("plano");
const tooltip = document.getElementById("tooltip");
const areaList = document.getElementById("area-list");
let currentViewBox = { x: 0, y: 0, width: 1000, height: 800 };

fetch("areas.json")
  .then(res => res.json())
  .then(areas => {
    areas.forEach(area => {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", area.x);
      rect.setAttribute("y", area.y);
      rect.setAttribute("width", area.width);
      rect.setAttribute("height", area.height);
      rect.setAttribute("fill", area.color);
      rect.classList.add("habitacion");
      rect.addEventListener("mousemove", e => {
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
        tooltip.classList.remove("hidden");
        tooltip.innerText = area.descripcion;
      });
      rect.addEventListener("mouseleave", () => tooltip.classList.add("hidden"));
      rect.addEventListener("click", () => zoomTo(area));
      svg.appendChild(rect);

      const li = document.createElement("li");
      li.textContent = area.nombre;
      li.onclick = () => zoomTo(area);
      areaList.appendChild(li);
    });
  });

function zoomTo(area) {
  const padding = 20;
  const x = area.x - padding;
  const y = area.y - padding;
  const width = area.width + padding * 2;
  const height = area.height + padding * 2;
  svg.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
}

document.getElementById("search").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  [...areaList.children].forEach(li => {
    li.style.display = li.textContent.toLowerCase().includes(value) ? "block" : "none";
  });
});

svg.addEventListener("wheel", e => {
  e.preventDefault();
  const delta = e.deltaY > 0 ? 1.1 : 0.9;
  currentViewBox.width *= delta;
  currentViewBox.height *= delta;
  svg.setAttribute("viewBox", `${currentViewBox.x} ${currentViewBox.y} ${currentViewBox.width} ${currentViewBox.height}`);
});

// Navegación con flechas
document.addEventListener("keydown", e => {
  const move = 50;
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    if (e.key === "ArrowUp") currentViewBox.y -= move;
    if (e.key === "ArrowDown") currentViewBox.y += move;
    if (e.key === "ArrowLeft") currentViewBox.x -= move;
    if (e.key === "ArrowRight") currentViewBox.x += move;
    svg.setAttribute("viewBox", `${currentViewBox.x} ${currentViewBox.y} ${currentViewBox.width} ${currentViewBox.height}`);
  }
});
