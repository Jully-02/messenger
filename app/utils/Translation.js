export const translateMessage = async (message, targetLanguage) => {
    const url =
        "https://aibit-translator.p.rapidapi.com/api/v1/translator/text";
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "X-RapidAPI-Key":
                "fd1fc8ced4msh2458f01be63c094p1532d9jsn31724c7fa4db",
            "X-RapidAPI-Host": "aibit-translator.p.rapidapi.com",
        },
        body: new URLSearchParams({
            from: "auto",
            to: targetLanguage,
            text: message,
        }),
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        const translation = result.trans;
        return translation;
    } catch (error) {
        console.error(error);
    }
};
