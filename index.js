const promptInput = document.getElementById("userInput");
const generateBtn = document.getElementById("submitBtn");
const resultText = document.getElementById("promptOutput");

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
        promptInput.value = '';
    } catch (error) {
        console.error("Error:", error);
        resultText.innerHTML += `<div>Error occurred while generating.</div>`;
    }
};

promptInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        generate();
    }
});
generateBtn.addEventListener("click", generate);
