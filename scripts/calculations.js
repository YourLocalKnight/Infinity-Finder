function generateSeeds() {
  const edition = document.getElementById("edition").value;
  const pattern = document.getElementById("pattern").value;
  const amount = parseInt(document.getElementById("amount").value);
  const resultBox = document.getElementById("results");
  resultBox.innerHTML = "";

  let baseSeed;
  let multiplier;
  let nMin, nMax;

  if (edition === "bedrock") {
    multiplier = 2 ** 32;
    nMin = -2147483647;
    nMax = 2147483647;

    if (pattern === "diagonal") {
      baseSeed = 1669320484;
    } else {
      baseSeed = 1000686894;
    }
  } else if (edition === "java") {
    multiplier = 2n ** 48n;
    nMin = -32768;
    nMax = 32768;

    if (pattern === "diagonal") {
      baseSeed = 107038380838084n;
    } else {
      baseSeed = 164311266871034n;
    }
  }

  for (let i = 0; i < amount; i++) {
    let n = edition === "bedrock" ? getRandomInt(nMin, nMax) : BigInt(getRandomInt(nMin, nMax));
    let seed = edition === "bedrock" ? multiplier * n + baseSeed : multiplier * n + baseSeed;
    resultBox.innerHTML += `<p>${seed.toString()}</p>`;
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

