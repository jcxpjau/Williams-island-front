export async function getCaptionFromAI({ title, subtitle, subtitle2, business = "Tennis" }) {
    const prompt = `You are a creative copywriter for Instagram. Write a short and engaging Instagram caption for a business related to ${business}. The ad title is "${title}", the first subtitle is "${subtitle}" and the second is "${subtitle2}". The tone should be exciting and concise.`;
  
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        max_tokens: 80,
      })
    });
  
    const data = await response.json();
    return data.choices?.[0]?.message?.content.trim() || "";
  }
  