const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const resultText = document.getElementById("resultText");
const stopBtn = document.getElementById("stopBtn");

let controller = null;


// const fetchWithTimeout = (url, options, timeout = 10000) => {
//     return Promise.race([
//         fetch(url, options),
//         new Promise((_, reject) =>
//             setTimeout(() => reject(new Error('Request timed out')), timeout)
//         )
//     ]);
// };

const generate = async () => {


    // Alert the user if no prompt value
    if (!promptInput.value) {
        alert("Please enter a prompt.");
        return;
    }

    // Disable the generate button and enable the stop button
    generateBtn.disabled = true;
    stopBtn.disabled = false;
    resultText.innerText = "Generating...";
    document.getElementById("spinner").style.display = "block";


    controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = await fetchWithTimeout('/api/generate', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: promptInput.value }),
            signal,
        });

        const text = await response.text();
        resultText.innerText = ""; // Clear "Generating..." text
        // Append new response
        resultText.innerHTML += `<div style="padding: 10px 0;">${text}</div>`;
        // Scroll to the latest response
        resultText.scrollTop = resultText.scrollHeight;
        promptInput.value = '';
        document.getElementById("spinner").style.display = "none";

    } catch (error) {
        if (signal.aborted) {
            resultText.innerText = "Request aborted.";
        } else {
            console.error("Error:", error);
            resultText.innerHTML += `<div>Error occurred while generating.</div>`;
            promptInput.value = '';
        }

    } finally {
        // Enable the generate button and disable the stop button
        generateBtn.disabled = false;
        stopBtn.disabled = true;
        controller = null; // Reset the AbortController instance
    }
};

const stop = () => {
    // Abort the fetch request by calling abort() on the AbortController instance
    if (controller) {
        controller.abort();
        controller = null;
    }
};


promptInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        generate();
    }
});
generateBtn.addEventListener("click", generate);
