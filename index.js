const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const resultText = document.getElementById("resultText");

const generate = async () => {
    try {
        const response = await fetch('/api/generate', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: promptInput.value }),
        });

        const text = await response.text();
        // Append new response
        resultText.innerHTML += `<div>${text}</div>`;
        // Scroll to the latest response
        resultText.scrollTop = resultText.scrollHeight;
    } catch (error) {
        console.error("Error:", error);
        resultText.innerHTML += `<div>Error occurred while generating.</div>`;
    }
};

promptInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        generate();
        promptInput.value = '';
    }
});
generateBtn.addEventListener("click", generate);
