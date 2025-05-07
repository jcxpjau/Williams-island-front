import html2canvas from "html2canvas";

export async function postToSocialMedia(adElement, caption, callback) {
  try {
    console.log("Iniciando captura da imagem...");

    const canvas = await html2canvas(adElement);
    const imageBlob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!imageBlob) throw new Error("Falha ao converter canvas em blob");

    console.log("Imagem capturada, iniciando upload para ImgBB...");

    const formData = new FormData();
    formData.append("image", imageBlob);

    const imgbbApiKey = "9606f49b7b684608780c6a5ff147be15"; // Substitua por sua chave real

    const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
      method: "POST",
      body: formData,
    });

    const imgbbResult = await imgbbResponse.json();
    console.log("Resposta do ImgBB:", imgbbResult);

    if (!imgbbResult.success) throw new Error("Erro no upload da imagem para ImgBB");

    const imageUrl = imgbbResult.data.url;
    console.log("Imagem hospedada em:", imageUrl);

    const postData = {
      social_media: ["instagram"],
      image_url: imageUrl,
      caption,
    };

    console.log("Dados que serão enviados ao n8n:", postData);

    const webhookUrl = "https://valmirborges.app.n8n.cloud/webhook-test/4237f72f-703a-49de-bd04-6fbfb503aeca";

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const result = await response.json();
    console.log("Resposta do webhook n8n:", result);

    if (callback) callback(null, result);
  } catch (error) {
    console.error("Erro ao postar no Instagram:", error);
    if (callback) callback(error);
  }
}
