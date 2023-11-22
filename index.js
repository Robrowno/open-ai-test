const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const resultText = document.getElementById("resultText");

const generate = async () => {
    try {
        // Send the user input to the serverless function
        const response = await fetch('/api/generate', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: promptInput.value }),
        });

        const text = await response.text();
        resultText.innerText = text;
    } catch (error) {
        console.error("Error:", error);
        resultText.innerText = "Error occurred while generating.";
    }
};

promptInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        generate();
    }
});
generateBtn.addEventListener("click", generate);
