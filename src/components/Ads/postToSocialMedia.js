import html2canvas from "html2canvas";

export async function postToSocialMedia(element, caption, format = "feed") {
  const computedStyles = window.getComputedStyle(element);
  const originalBorderRadius = computedStyles.borderRadius;
  const originalBoxShadow = computedStyles.boxShadow;
  const originalFilter = computedStyles.filter;

  element.style.borderRadius = "0";
  element.style.boxShadow = "none";
  element.style.filter = "none";

  const canvas = await html2canvas(element, { useCORS: true, scale: 1 });

  element.style.borderRadius = originalBorderRadius;
  element.style.boxShadow = originalBoxShadow;
  element.style.filter = originalFilter;

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));

  if (!blob) throw new Error("Erro ao gerar imagem");

  const formData = new FormData();
  formData.append("file", blob);
  formData.append("upload_preset", "teste-ads");
  formData.append("folder", "ads");

  console.log("[Cloudinary] FormData preparado:");
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/djota6kqp/image/upload";

  const response = await fetch(cloudinaryUrl, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  console.log("[Cloudinary] Resposta recebida:", data);

  if (!response.ok) throw new Error("Erro ao enviar para o Cloudinary: " + data.error?.message);

  const payload = {
    social_media: [format === "stories" ? "instagramstory" : "instagram"],
    image_url: data.secure_url,
    caption,
  };

  console.log("[n8n] Enviando dados para n8n:", payload);

  const n8nResponse = await fetch("https://valmirborges.app.n8n.cloud/webhook/4237f72f-703a-49de-bd04-6fbfb503aeca", {
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
