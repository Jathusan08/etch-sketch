const gridLayout = document.querySelector(".gridLayout");
const slider = document.getElementById("slider");
const sliderValueDisplay = document.getElementById("sliderValue");
const colorPicker = document.querySelector(".color-picker");
const rainbowModeBtn = document.querySelector(".rainbowMode-btn");
const clearBtn = document.querySelector(".clear-btn");
const erarserBtn = document.querySelector(".eraser-btn");

// setting wheh a buttons is pressed
let colorModeOn = true;
let rainbowModeOn = false;
let eraser = false;

let gridColorArr = [];

const createGrids = (numOfGrids) => {
  let grid;
  let gridNum = 0;

  for (let i = 1; i <= numOfGrids; i++) {
    row = document.createElement("div");
    row.classList.add("row-grid");
    gridLayout.appendChild(row);

    for (let j = 1; j <= numOfGrids; j++) {
      grid = document.createElement("div");
      grid.classList.add("grid");
      grid.setAttribute("id", `${gridNum}`);

      gridNum += 1;
      gridColorArr.push("");
      row.appendChild(grid);
    }
  }
};

const rgbFormat = (grid) => {
  console.log(grid.style.backgroundColor);
  let rgbColor = grid.style.backgroundColor;
  let rgbArr = grid.style.backgroundColor
    .substring(4, rgbColor.length - 1)
    .replace(/ /g, "")
    .split(",");
  console.log(rgbArr);

  let R = Number(rgbArr[0]) / 10;
  let G = Number(rgbArr[1] / 10);
  let B = Number(rgbArr[2] / 10);

  let countIteration = 0;

  return `rgb(${R}, ${G}, ${B}, ${countIteration})`;
};

const darkMode = (grid) => {
  // console.log(grid.id);
  let rgbColor = grid.style.backgroundColor;
  let rgbArr = grid.style.backgroundColor
    .substring(4, rgbColor.length - 1)
    .replace(/ /g, "")
    .split(",");
  //console.log(rgbArr);

  let R = Number(rgbArr[0]);
  let G = Number(rgbArr[1]);
  let B = Number(rgbArr[2]);
  // console.log(`R:${R}`);
  // console.log(`G:${G}`);
  // console.log(`B:${B}`);

  let divideColor = gridColorArr[Number(grid.id)];
  let divideColorArray = gridColorArr[Number(grid.id)]
    .substring(4, divideColor.length - 1)
    .replace(/ /g, "")
    .split(",");

  let divideColorByR = Number(divideColorArray[0]);
  let divideColorByG = Number(divideColorArray[1]);
  let divideColorByB = Number(divideColorArray[2]);

  let countIteration = Number(divideColorArray[3]);

  countIteration += 1;

  if (countIteration <= 9) {
    if (R >= 0) {
      //  console.log("R divide by: " + R);
      R -= divideColorByR;
    }

    if (G >= 0) {
      //  console.log("G divide by: " + G);
      G -= divideColorByG;
    }

    if (B >= 0) {
      // console.log("B divide by: " + B);
      B -= divideColorByB;
    }
  } else if (countIteration === 10) {
    R = 0;
    G = 0;
    B = 0;
  }

  gridColorArr[
    Number(grid.id)
  ] = `rgb(${divideColorByR}, ${divideColorByG}, ${divideColorByB}, ${countIteration})`;
  console.log(`rgb(${R}, ${G}, ${B})`);
  return `rgb(${R}, ${G}, ${B})`;
};

const removeGrids = () => {
  while (gridLayout.hasChildNodes()) {
    gridLayout.removeChild(gridLayout.firstChild);
  }
};

const clearGridLayout = () => {
  document.querySelectorAll(".grid").forEach((grid) => {
    grid.style.background = "";
  });
};

const generateRainbowColor = () => {
  rainbowModeOn = true;
  colorModeOn = false;
  eraser = false;
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;
};

const applyColor = (event) => {
  let grid = event.target;
  if (grid.style.background === "" && rainbowModeOn != true && colorModeOn) {
    console.log("add new color");
    grid.style.background = colorPicker.value;
    gridColorArr[Number(grid.id)] = rgbFormat(grid);
    console.log(gridColorArr[Number(grid.id)]);
  } else if (
    rainbowModeOn &&
    grid.style.background === "" &&
    colorModeOn != true
  ) {
    console.log("add rainbow color");

    grid.style.background = generateRainbowColor();
    gridColorArr[Number(grid.id)] = rgbFormat(grid);
  } else if (eraser && grid.style.background != "") {
    grid.style.background = "";
  } else {
    grid.style.backgroundColor = darkMode(grid);
  }
};

createGrids(5);

slider.addEventListener("input", () => {
  removeGrids();
  gridColorArr.length = 0;
  const sliderValue = slider.value;
  sliderValueDisplay.textContent = `${sliderValue} x ${sliderValue}`;
  createGrids(sliderValue);
});

gridLayout.addEventListener("mouseover", applyColor);
rainbowModeBtn.addEventListener("click", generateRainbowColor);
colorPicker.addEventListener("click", () => {
  colorModeOn = true;
  rainbowModeOn = false;
  eraser = false;
});

clearBtn.addEventListener("click", clearGridLayout);

erarserBtn.addEventListener("click", () => {
  eraser = true;
  rainbowModeOn = false;
  colorModeOn = false;
});
