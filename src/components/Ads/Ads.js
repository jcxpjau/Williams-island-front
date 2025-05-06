import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import styles from "./Ads.module.css";
import template1 from "./template1.png";
import template2 from "./template2.png";
import template3 from "./template3.png";
import Header from "components/Headers/Header.js";

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

  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [logoPosition, setLogoPosition] = useState({ x: 10, y: 10 });
  const textRef = useRef(null);
  const logoRef = useRef(null);
  const dragData = useRef({ isDragging: false, offsetX: 0, offsetY: 0, type: null });

  const handleDragStart = (e, type) => {
    dragData.current = {
      isDragging: true,
      offsetX: e.clientX - (type === "text" ? textPosition.x : logoPosition.x),
      offsetY: e.clientY - (type === "text" ? textPosition.y : logoPosition.y),
      type,
    };
  };

  const handleDrag = (e) => {
    if (!dragData.current.isDragging) return;
    const { offsetX, offsetY, type } = dragData.current;
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    if (type === "text") {
      setTextPosition({ x, y });
    } else if (type === "logo") {
      setLogoPosition({ x, y });
    }
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

  return (
    <div>
      <Header/>
      <div className={styles.teste}>
        <div 
          className={styles.container}
          onMouseMove={handleDrag}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
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
          </div>

          <div className={styles.rightPanel}>
            <h3>Preview</h3>
            <div className={styles.previewDevice}>Mobile ▼</div>
            <div className={styles.formatSelector}>
                <label>Formato:</label>
                <select
                  value={previewFormat}
                  onChange={(e) => setPreviewFormat(e.target.value)}
                  className={styles.input}
                >
                  <option value="feed">Feed (1:1)</option>
                  <option value="stories">Stories (9:16)</option>
                </select>
              </div>
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
                }}
              >
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt="Logo"
                  ref={logoRef}
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

              <div
                ref={textRef}
                onMouseDown={(e) => handleDragStart(e, "text")}
                style={{
                  position: "absolute",
                  left: `${textPosition.x}px`,
                  top: `${textPosition.y}px`,
                  cursor: "grab",
                }}
              >
                <h1>{title}</h1>
                <p>{subtitle}</p>
                <p style={{ color: secondaryColor }}>{subtitle2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      
  );
}
