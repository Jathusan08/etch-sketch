const gridLayout = document.querySelector(".gridLayout");

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

createGrids(5);
