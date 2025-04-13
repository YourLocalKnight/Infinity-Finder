function generateSeeds() {
  const edition = document.getElementById("edition").value;
  const pattern = document.getElementById("pattern").value;
  const amount = parseInt(document.getElementById("amount").value);
  const resultBox = document.getElementById("results");
  resultBox.innerHTML = ""; // Clear old results

  let seeds = [];
  let baseSeed, nMin, nMax, multiplier;

  if (edition === "bedrock") {
    multiplier = 2 ** 32;
    nMin = -2147483647;
    nMax = 2147483647;
    baseSeed = pattern === "diagonal" ? 1669320484 : 1000686894;

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
      baseSeed = 107038380838084n; // Also valid
    }

    for (let i = 0; i < amount; i++) {
      const n = BigInt(getRandomInt(nMin, nMax));
      const seed = multiplier * n + baseSeed;
      seeds.push(seed.toString());
    }
  }

  // Show the results
  if (seeds.length > 0) {
    resultBox.innerHTML = seeds.map(s => `<p>${s}</p>`).join("");
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

// Enable/disable Java-only option on page load
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

  // Trigger once
  editionSelect.dispatchEvent(new Event("change"));
};
