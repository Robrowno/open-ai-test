
// const OPENAI_API_KEY = "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"
// const OPENAI_URL = "https://api.openai.com/v1/chat/completions"

require('dotenv').config()

const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");
const resultText = document.getElementById("resultText");

const generate = async () => {

    try {
        // Fetch the response from the OpenAI API with the signal from AbortController
        const response = await fetch(OPENAI_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: promptInput.value }],
                max_tokens: 50,




            }),
        });

        const data = await response.json();
        resultText.innerText = data.choices[0].message.content;
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
