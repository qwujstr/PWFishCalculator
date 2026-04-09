const fishData = [
    { name: "Herring", icon: "textures/herring.png", prices: [10, 40, 70, 100, 300] },
    { name: "Kingfish", icon: "textures/kingfish.png", prices: [10, 40, 70, 100, 300] },
    { name: "Goldfish", icon: "textures/goldfish.png", prices: [15, 60, 105, 150, 600] },
    { name: "Butterflyfish", icon: "textures/butterflyfish.png", prices: [15, 60, 105, 150, 600] },
    { name: "Carp", icon: "textures/carp.png", prices: [20, 80, 140, 200, 600] },
    { name: "Halibut", icon: "textures/halibut.png", prices: [20, 80, 140, 200, 600] },
    { name: "Sea Angler", icon: "textures/seaangler.png", prices: [30, 120, 210, 300, 900] },
    { name: "Tuna", icon: "textures/tuna.png", prices: [40, 160, 280, 400, 1200] },
    { name: "Acid Puffer", icon: "textures/acidpuffer.png", prices: [80, 320, 560, 800, 2400] },
    { name: "Dumb Fish", icon: "textures/dumbfish.png", prices: [5, 10, 30, 50, 100] },
    { name: "Piranha", icon: "textures/piranha.png", prices: [30, 120, 210, 300, 900] },
    { name: "Crab", icon: "textures/crab.png", prices: [320, 1280, 2240, 3200, 9600] }
];

const container = document.getElementById('fishRowsContainer');
const totalDisplay = document.getElementById('totalGems');

function init() {
    fishData.forEach((fish, fishIdx) => {
        const row = document.createElement('div');
        row.className = 'fish-row';

        let rowHtml = `
            <div class="fish-identity">
                <img src="${fish.icon}" class="fish-icon" onerror="this.style.display='none'">
                <div class="fish-name-v2">${fish.name}</div>
            </div>
        `;

        fish.prices.forEach((price, sizeIdx) => {
            rowHtml += `
                <div class="input-container">
                    <div class="price-tag">${price} GEMS</div>
                    <input type="number" 
                           class="fish-input" 
                           data-fish="${fishIdx}" 
                           data-size="${sizeIdx}" 
                           value="0" 
                           min="0" 
                           onclick="this.select()"
                           oninput="calculateTotal()">
                </div>
            `;
        });

        row.innerHTML = rowHtml;
        container.appendChild(row);
    });
}

function calculateTotal() {
    let total = 0;
    const inputs = document.querySelectorAll('.fish-input');

    inputs.forEach(input => {
        const fishIdx = input.getAttribute('data-fish');
        const sizeIdx = input.getAttribute('data-size');
        const quantity = parseInt(input.value) || 0;
        const price = fishData[fishIdx].prices[sizeIdx];

        total += quantity * price;
    });

    totalDisplay.innerText = total.toLocaleString();
}

window.resetAll = function() {
    const inputs = document.querySelectorAll('.fish-input');
    inputs.forEach(input => input.value = 0);
    calculateTotal();
};

init();