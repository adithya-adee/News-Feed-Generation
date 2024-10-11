export const sendContent = async (userId: string, content: string) => {
  try {
    const response = await fetch("http://localhost:8080/keyword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        content,
      }),
    });
    const result = await response.json();
    console.log("Keyword extraction result:", result);
  } catch (err) {
    console.error("Error sending content:", err);
  }
};
