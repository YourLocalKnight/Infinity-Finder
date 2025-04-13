function generateSeeds() {
  const edition = document.getElementById("edition").value;
  const pattern = document.getElementById("pattern").value;
  const amount = parseInt(document.getElementById("amount").value);
  const resultBox = document.getElementById("results");
  resultBox.innerHTML = "";

  let seeds = [];
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

    for (let i = 0; i < amount; i++) {
      const n = getRandomInt(nMin, nMax);
      const seed = multiplier * n + baseSeed;
      seeds.push(seed.toString());
    }

  } else if (edition === "java") {
    multiplier = 2n ** 48n;
    nMin = -32768;
    nMax = 32768;

    if (pattern === "diagonal") {
      baseSeed = 107038380838084n;
    } else if (pattern === "vertical") {
      baseSeed = 164311266871034n;
    } else if (pattern === "horizontal") {
      baseSeed = 107038380838084n;
    } else {
      baseSeed = 107038380838084n; // fallback
    }

    for (let i = 0; i < amount; i++) {
      const n = BigInt(getRandomInt(nMin, nMax));
      const seed = multiplier * n + baseSeed;
      seeds.push(seed.toString());
    }
  }

  if (seeds.length > 0) {
    const output = seeds.map(s => `<p>${s}</p>`).join("");
    resultBox.innerHTML = output +
      `<button onclick="copySeeds()">Copy All Seeds</button>` +
      `<textarea id="copyBox" style="width: 100%; height: 0; position: absolute; left: -9999px;">${seeds.join("\n")}</textarea>`;
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function copySeeds() {
  const copyBox = document.getElementById("copyBox");
  copyBox.select();
  copyBox.setSelectionRange(0, 99999); // For mobile
  document.execCommand("copy");
  alert("Seeds copied to clipboard!");
}

window.onload = () => {
  const editionSelect = document.getElementById("edition");
  const patternSelect = document.getElementById("pattern");

  editionSelect.addEventListener("change", () => {
    const horizontalOption = patternSelect.querySelector("option[value='horizontal']");
    if (editionSelect.value === "java") {
      horizontalOption.disabled = false;
    } else {
      horizontalOption.disabled = true;
      if (patternSelect.value === "horizontal") {
        patternSelect.value = "diagonal";
      }
    }
  });

  editionSelect.dispatchEvent(new Event("change"));
};
