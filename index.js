
const openaiApiKey = process.env.OPENAI_API_KEY;
const openaiUrl = process.env.OPENAI_URL;

const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");
const resultText = document.getElementById("resultText");

const generate = async () => {

    try {
        // Fetch the response from the OpenAI API with the signal from AbortController
        const response = await fetch(openaiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${openaiApiKey}`,
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
