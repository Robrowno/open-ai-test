// api/generate.js
module.exports = async (req, res) => {
    // Extract user input from the request
    const { content } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/engines/gpt-3.5-turbo/completions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content }],
                max_tokens: 50,
            }),
        });

        const data = await response.json();
        res.status(200).json(data.choices[0].message.content);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error occurred while generating." });
    }
};
