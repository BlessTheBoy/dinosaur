console.log("Script.js loaded");
const btnLoad = document.querySelector("#btnLoad");
btnLoad.addEventListener("click", generateResults);
const container = document.getElementById("container");
generateResults();

async function generateResults() {
  const name = await getDinoName();

  const dinoName = name[0].join(" ");
  const dinoNameSlug = name[0][0];
  const dinoImage = await getDinoImage(dinoNameSlug);

  console.log(dinoName);
  console.log(dinoImage);

  let head = document.querySelector("#dinoHead")
    ? document.querySelector("#dinoHead")
    : document.createElement("p");
  head.innerHTML = dinoName;
  head.id = "dinoHead";
  head.className = "result-head";

  let image = document.querySelector("#dinoImage")
    ? document.querySelector("#dinoImage")
    : document.createElement("img");
  image.src = dinoImage;
  image.id = "dinoImage";
  image.alt = dinoName;
  image.className = "result-image";

  let cover = document.querySelector("#cover")
    ? document.querySelector("#cover")
    : document.createElement("div");
  cover.id = "cover";
  cover.appendChild(head);
  cover.appendChild(image);

  container.appendChild(cover);
}

async function getDinoName() {
  const response = await fetch("api/dinoname");
  const data = await response.json();

  return data;
}

async function getDinoImage(name) {
  const response = await fetch(`api/dinoimage?q=${name}`);
  const data = await response.json().then((response) => response.thumbnailUrl);

  return data;
}
