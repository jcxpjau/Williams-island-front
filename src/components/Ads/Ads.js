import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import styles from "./Ads.module.css";
import template1 from "./template1.png";
import template2 from "./template2.png";
import template3 from "./template3.png";
import Header from "components/Headers/Header.js";
import { postToSocialMedia } from "./postToSocialMedia";

export default function AdEditor() {
  const [title, setTitle] = useState("Special Offer!");
  const [subtitle, setSubtitle] = useState("Schedule your ");
  const [subtitle2, setSubtitle2] = useState("Vagas limitadas!");
  const [bgColor, setBgColor] = useState("#f0f0f0");
  const [textColor, setTextColor] = useState("#ffffff");
  const [secondaryColor, setSecondaryColor] = useState("#eeeeee");
  const [imageUrl, setImageUrl] = useState(template1);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [logoUrl, setLogoUrl] = useState(null);
  const [previewFormat, setPreviewFormat] = useState("feed");

  const [titlePosition, setTitlePosition] = useState({ x: 50, y: 50 });
  const [subtitlePosition, setSubtitlePosition] = useState({ x: 50, y: 100 });
  const [subtitle2Position, setSubtitle2Position] = useState({ x: 50, y: 140 });
  const [logoPosition, setLogoPosition] = useState({ x: 10, y: 10 });

  const [showPopup, setShowPopup] = useState(false);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  const dragData = useRef({ isDragging: false, offsetX: 0, offsetY: 0, type: null });

  const handleDragStart = (e, type) => {
    let pos;
    if (type === "title") pos = titlePosition;
    else if (type === "subtitle") pos = subtitlePosition;
    else if (type === "subtitle2") pos = subtitle2Position;
    else if (type === "logo") pos = logoPosition;

    dragData.current = {
      isDragging: true,
      offsetX: e.clientX - pos.x,
      offsetY: e.clientY - pos.y,
      type,
    };
  };

  const handleDrag = (e) => {
    if (!dragData.current.isDragging) return;
    const { offsetX, offsetY, type } = dragData.current;
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    if (type === "title") setTitlePosition({ x, y });
    else if (type === "subtitle") setSubtitlePosition({ x, y });
    else if (type === "subtitle2") setSubtitle2Position({ x, y });
    else if (type === "logo") setLogoPosition({ x, y });
  };

  const handleDragEnd = () => {
    dragData.current.isDragging = false;
  };

  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImageUrl(URL.createObjectURL(file));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogoUrl(URL.createObjectURL(file));
  };

  const downloadImage = () => {
    const element = document.getElementById("ad-preview");
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.download = "anuncio.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const handlePostToInstagram = async () => {
    setUploading(true);
    try {
      const element = document.getElementById("ad-preview");
      await postToSocialMedia(element, caption, "YOUR_IMGBB_API_KEY");
      alert("Post enviado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao postar o anúncio.");
    } finally {
      setUploading(false);
      setShowPopup(false);
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.teste}>
        <div className={styles.container}>
          <div className={styles.leftPanel}>
            <div className={styles.header}>
              <h2>Creating Ads with A.N.A</h2>
              <div className={styles.avatar}></div>
            </div>

            <div className={styles.subHeader}>
              <strong>Tennis Templates</strong>
              <p>Based in your business</p>
            </div>

            <div className={styles.templateOptions}>
              {[template1, template2, template3].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Template ${index + 1}`}
                  className={styles.templateImage}
                  onClick={() => setImageUrl(img)}
                />
              ))}
              {imageUrl && typeof imageUrl === "string" && !imageUrl.includes("template") && (
                <img
                  src={imageUrl}
                  alt="Custom Background"
                  className={styles.templateImage}
                  onClick={() => setImageUrl(imageUrl)}
                />
              )}
            </div>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Main Text:"
              className={styles.input}
            />
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Subtitle 1:"
              className={styles.input}
            />
            <input
              type="text"
              value={subtitle2}
              onChange={(e) => setSubtitle2(e.target.value)}
              placeholder="Subtitle 2:"
              className={styles.input}
            />

            <label className={styles.label}>Fonte:</label>
            <select
              className={styles.input}
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
            >
              <option value="Arial">Arial</option>
              <option value="'Times New Roman', serif">Times New Roman</option>
              <option value="'Courier New', monospace">Courier New</option>
              <option value="'Comic Sans MS', cursive">Comic Sans</option>
              <option value="Verdana">Verdana</option>
              <option value="'Open Sans', sans-serif">Open Sans</option>
            </select>

            <div className={styles.colorRow}>
              <label className={styles.colorLabel}>
                Main Color:
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className={styles.colorInput}
                />
              </label>
              <label className={styles.colorLabel}>
                Secondary:
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className={styles.colorInput}
                />
              </label>
            </div>

            <label className={styles.label}>Imagem de fundo:</label>
            <input type="file" accept="image/*" onChange={handleBackgroundUpload} className={styles.input} />

            <label className={styles.label}>Logo (topo):</label>
            <input type="file" accept="image/*" onChange={handleLogoUpload} className={styles.input} />

            <button onClick={downloadImage} className={styles.downloadButton}>
              Download
            </button>

            <button onClick={() => setShowPopup(true)} className={styles.downloadButton}>
              Postar no Instagram
            </button>

              {showPopup && (
                <div className={styles.popupOverlay}>
                  <div className={styles.popup}>
                    <h3>Escreva a legenda do post:</h3>
                    <textarea
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className={styles.textarea}
                      placeholder="Digite sua legenda aqui..."
                    />
                    <div className={styles.popupButtons}>
                      <button onClick={() => setShowPopup(false)} className={styles.cancelButton}>
                        Cancelar
                      </button>
                      <button onClick={handlePostToInstagram} disabled={uploading} className={styles.confirmButton}>
                        {uploading ? "Postando..." : "Postar"}
                      </button>
                    </div>
                  </div>
                </div>
                  )}
          </div>

          <div className={styles.rightPanel}>
            <h3>Preview</h3>
            <div className={styles.previewDevice}>Mobile ▼</div>

            <div
              id="ad-preview"
              className={styles.adPreview}
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: textColor,
                backgroundColor: bgColor,
                fontFamily,
                width: previewFormat === "stories" ? "360px" : "360px",
                height: previewFormat === "stories" ? "640px" : "360px",
                position: "relative",
                overflow: "hidden",
                margin: "0 auto",
              }}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
            >
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt="Logo"
                  draggable={false}
                  onMouseDown={(e) => handleDragStart(e, "logo")}
                  style={{
                    position: "absolute",
                    left: `${logoPosition.x}px`,
                    top: `${logoPosition.y}px`,
                    cursor: "grab",
                    maxWidth: "150px",
                  }}
                />
              )}

              <h1
                style={{
                  position: "absolute",
                  left: `${titlePosition.x}px`,
                  top: `${titlePosition.y}px`,
                  cursor: "grab",
                }}
                onMouseDown={(e) => handleDragStart(e, "title")}
              >
                {title}
              </h1>

              <p
                style={{
                  position: "absolute",
                  left: `${subtitlePosition.x}px`,
                  top: `${subtitlePosition.y}px`,
                  cursor: "grab",
                }}
                onMouseDown={(e) => handleDragStart(e, "subtitle")}
              >
                {subtitle}
              </p>

              <p
                style={{
                  position: "absolute",
                  left: `${subtitle2Position.x}px`,
                  top: `${subtitle2Position.y}px`,
                  cursor: "grab",
                  color: secondaryColor,
                }}
                onMouseDown={(e) => handleDragStart(e, "subtitle2")}
              >
                {subtitle2}
              </p>
            </div>

            <div className={styles.formatSelector} style={{ marginTop: "10px", textAlign: "center" }}>
              <label style={{ marginRight: "8px" }}>Formato:</label>
              <select
                value={previewFormat}
                onChange={(e) => setPreviewFormat(e.target.value)}
                style={{ width: "150px" }}
                className={styles.input}
              >
                <option value="feed">Feed (1:1)</option>
                <option value="stories">Stories (9:16)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
