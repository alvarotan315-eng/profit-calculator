// ==========================
// Profit Calculator
// script.js
// ==========================

const sellingPriceInput = document.getElementById("sellingPrice");
const costPriceInput = document.getElementById("costPrice");
const operationalCostInput = document.getElementById("operationalCost");

const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");

const grossProfitText = document.getElementById("grossProfit");
const netProfitText = document.getElementById("netProfit");
const grossMarginText = document.getElementById("grossMargin");
const netMarginText = document.getElementById("netMargin");

// ==========================
// Format Rupiah & Parsing
// ==========================

// Format angka positif/negatif ke format Rupiah
function formatRupiah(number) {
    const isNegative = number < 0;
    const absNumber = Math.abs(number);
    const formatted = "Rp " + absNumber.toLocaleString("id-ID");
    
    return isNegative ? "-" + formatted : formatted;
}

// Mengambil angka murni dari input pengguna
function getNumber(value) {
    const cleanValue = value.replace(/\D/g, "");
    return cleanValue ? Number(cleanValue) : 0;
}

// Format input secara otomatis saat diketik
function formatInput(e) {
    const number = getNumber(e.target.value);

    if (number === 0) {
        e.target.value = "";
        return;
    }

    e.target.value = formatRupiah(number);
}

sellingPriceInput.addEventListener("input", formatInput);
costPriceInput.addEventListener("input", formatInput);
operationalCostInput.addEventListener("input", formatInput);

// ==========================
// Hitung
// ==========================

calculateBtn.addEventListener("click", () => {
    const sellingPrice = getNumber(sellingPriceInput.value);
    const costPrice = getNumber(costPriceInput.value);
    const operationalCost = getNumber(operationalCostInput.value);

    // Validasi dasar
    if (sellingPrice <= 0) {
        alert("Mohon masukkan Harga Jual yang valid (lebih besar dari 0).");
        return;
    }

    const grossProfit = sellingPrice - costPrice;
    const netProfit = grossProfit - operationalCost;

    const grossMargin = (grossProfit / sellingPrice) * 100;
    const netMargin = (netProfit / sellingPrice) * 100;

    // Output
    grossProfitText.textContent = formatRupiah(grossProfit);
    netProfitText.textContent = formatRupiah(netProfit);
    grossMarginText.textContent = grossMargin.toFixed(2) + "%";
    netMarginText.textContent = netMargin.toFixed(2) + "%";
});

// ==========================
// Reset
// ==========================

resetBtn.addEventListener("click", () => {
    sellingPriceInput.value = "";
    costPriceInput.value = "";
    operationalCostInput.value = "";

    grossProfitText.textContent = "Rp 0";
    netProfitText.textContent = "Rp 0";
    grossMarginText.textContent = "0%";
    netMarginText.textContent = "0%";
});
