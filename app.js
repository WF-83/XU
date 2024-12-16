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

// Pips Calculator
document.getElementById("calculate-pips").addEventListener("click", () => {
    const entry = parseFloat(document.getElementById("entry").value);
    const exit = parseFloat(document.getElementById("exit").value);
    const lotSize = parseFloat(document.getElementById("lot-size").value);

    if (isNaN(entry) || isNaN(exit) || isNaN(lotSize)) {
        document.getElementById("pips-result").innerText = "Result: Please enter valid numbers!";
        return;
    }

    const pips = Math.abs((exit - entry) * 10); // Pips calculation
    const profitUSD = (pips * 0.10 * (lotSize / 0.01)).toFixed(2);
    const profitRM = (profitUSD * 4.7).toFixed(2);

    document.getElementById(
        "pips-result"
    ).innerHTML = `Result: ${pips.toFixed(2)} pips<br>Profit: ${profitUSD} USD<br>Profit: RM ${profitRM}`;
});

// ChatGPT Placeholder
document.getElementById("ask-chatgpt").addEventListener("click", () => {
    document.getElementById("response").innerText = "ChatGPT response is temporarily unavailable.";
});
