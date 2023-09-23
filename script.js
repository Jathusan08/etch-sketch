const gridLayout = document.querySelector(".gridLayout");
const slider = document.getElementById("slider");
const sliderValueDisplay = document.getElementById("sliderValue");
const colorPicker = document.querySelector(".color-picker");

// setting wheh a buttons is pressed
let colorModeOn = true;

const createGrids = (numOfGrids) => {
  let grid;

  for (let i = 1; i <= numOfGrids; i++) {
    row = document.createElement("div");
    row.classList.add("row-grid");
    gridLayout.appendChild(row);

    for (let j = 1; j <= numOfGrids; j++) {
      grid = document.createElement("div");
      grid.classList.add("grid");

      grid.style.color = "white";

      row.appendChild(grid);
    }
  }
};

const removeGrids = () => {
  while (gridLayout.hasChildNodes()) {
    gridLayout.removeChild(gridLayout.firstChild);
  }
};

const applyColor = (event) => {
  let grid = event.target;
  if (grid.style.background === "" && colorModeOn) {
    console.log("add new color");
    grid.style.background = colorPicker.value;
  }
};

createGrids(5);

slider.addEventListener("input", () => {
  const sliderValue = slider.value;
  sliderValueDisplay.textContent = `${sliderValue} x ${sliderValue}`;
  removeGrids();
  createGrids(sliderValue);
});

gridLayout.addEventListener("mouseover", applyColor);
