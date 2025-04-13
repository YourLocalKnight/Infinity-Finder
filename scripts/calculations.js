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
    } else if (pattern === "vertical") {
      baseSeed = 164311266871034n;
    } else {
      baseSeed = 107038380838084n; // fallback for horizontal
    }
  }

  let seeds = [];
  for (let i = 0; i < amount; i++) {
    let n = edition === "bedrock" ? getRandomInt(nMin, nMax) : BigInt(getRandomInt(nMin, nMax));
    let seed = edition === "bedrock" ? multiplier * n + baseSeed : multiplier * n + baseSeed;
    seeds.push(seed.toString());
    resultBox.innerHTML += `<p>${seed.toString()}</p>`;
  }

  if (seeds.length > 0) {
    resultBox.innerHTML += `<button onclick="copySeeds()">Copy All Seeds</button>`;
    resultBox.innerHTML += `<textarea id="copyBox" style="width: 100%; height: 0; position: absolute; left: -9999px;">${seeds.join("\n")}</textarea>`;
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function copySeeds() {
  const copyBox = document.getElementById("copyBox");
  copyBox.select();
  document.execCommand("copy");
  alert("Seeds copied to clipboard!");
}

// Enable/disable pattern option dynamically
window.onload = () => {
  const editionSelect = document.getElementById("edition");
  const patternSelect = document.getElementById("pattern");

  editionSelect.addEventListener("change", () => {
    if (editionSelect.value === "java") {
      patternSelect.querySelector("option[value='horizontal']").disabled = false;
    } else {
      patternSelect.querySelector("option[value='horizontal']").disabled = true;
      if (patternSelect.value === "horizontal") {
        patternSelect.value = "diagonal";
      }
    }
  });

  // Trigger initial state
  editionSelect.dispatchEvent(new Event("change"));
};
