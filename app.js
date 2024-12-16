// TradingView Widget for XAUUSD
new TradingView.widget({
    container_id: "tradingview-widget",
    width: "100%",
    height: "400",
    symbol: "FX_IDC:XAUUSD",
    interval: "60",
    timezone: "Etc/UTC",
    theme: "dark",
    style: "1",
    locale: "en",
    toolbar_bg: "#1e1e2e",
    enable_publishing: false,
    allow_symbol_change: true,
    save_image: false,
});

// Fetch Live XAUUSD Price using GoldAPI
const fetchLivePrice = async () => {
    const apiKey = "goldapi-d4fsm4qsygnl-io"; // Replace with your GoldAPI key
    const url = "https://www.goldapi.io/api/XAU/USD";

    try {
        const response = await fetch(url, {
            headers: {
                "x-access-token": apiKey,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        if (data && data.price) {
            const price = data.price;
            document.getElementById("live-price").innerText = `USD ${price.toFixed(2)}`;
        } else {
            throw new Error("Invalid API response.");
        }
    } catch (error) {
        console.error("Live Price Fetch Error:", error);
        document.getElementById("live-price").innerText = "Error fetching price. Try again.";
    }
};

// Refresh live price every 10 seconds
fetchLivePrice();
setInterval(fetchLivePrice, 10000);

// Pips Calculator Logic
document.getElementById("calculate-pips").addEventListener("click", () => {
    const entry = parseFloat(document.getElementById("entry").value);
    const exit = parseFloat(document.getElementById("exit").value);
    const lotSize = parseFloat(document.getElementById("lot-size").value);

    if (isNaN(entry) || isNaN(exit) || isNaN(lotSize)) return;

    const pips = Math.abs((exit - entry) * 10); // Calculate pips
    const roundedPips = Math.floor(pips); // Remove decimal places
    const profitUSD = (roundedPips * 0.10 * (lotSize / 0.01)).toFixed(2);
    const profitRM = (profitUSD * 4.7).toFixed(2);

    document.getElementById("pips-result").style.display = "block";
    document.getElementById(
        "pips-result"
    ).innerHTML = `Result: ${roundedPips} pips<br>Profit: ${profitUSD} USD<br>Profit: RM ${profitRM}`;
});
