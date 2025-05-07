import html2canvas from "html2canvas";

export async function postToSocialMedia(element, caption) {
  const canvas = await html2canvas(element);

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));

  if (!blob) throw new Error("Erro ao gerar imagem");

  // 3. Prepare o FormData para o Cloudinary
  const formData = new FormData();
  formData.append("file", blob);
  formData.append("upload_preset", "teste-ads");
  formData.append("folder", "ads");

  console.log("[Cloudinary] FormData preparado:");
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  // 4. Envie para Cloudinary
  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/djota6kqp/image/upload";

  const response = await fetch(cloudinaryUrl, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  console.log("[Cloudinary] Resposta recebida:", data);

  if (!response.ok) throw new Error("Erro ao enviar para o Cloudinary: " + data.error?.message);

  // 5. Envie a URL para o n8n com os dados corretos
  const payload = {
    social_media: ["instagram"],
    image_url: data.secure_url,
    caption,
  };

  console.log("[n8n] Enviando dados para n8n:", payload);

  const n8nResponse = await fetch("https://valmirborges.app.n8n.cloud/webhook-test/4237f72f-703a-49de-bd04-6fbfb503aeca", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!n8nResponse.ok) {
    const errorText = await n8nResponse.text();
    console.error("[n8n] Erro na resposta:", errorText);
    throw new Error("Erro ao enviar para o n8n");
  }

  console.log("[n8n] Envio para n8n concluído com sucesso");

  return true;
}
