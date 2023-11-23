const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const resultText = document.getElementById("resultText");


const fetchWithTimeout = (url, options, timeout = 7000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out')), timeout)
        )
    ]);
};

const generate = async () => {
    try {
        const response = await fetchWithTimeout('/api/generate', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: promptInput.value }),
        }, 6000);

        const text = await response.text();
        // Append new response
        resultText.innerHTML += `<div style="padding: 10px 0;">${text}</div>`;
        // Scroll to the latest response
        resultText.scrollTop = resultText.scrollHeight;
        promptInput.value = '';
    } catch (error) {
        console.error("Error:", error);
        resultText.innerHTML += `<div>Error occurred while generating.</div>`;
        promptInput.value = '';
    }
};

promptInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        generate();
    }
});
generateBtn.addEventListener("click", generate);
