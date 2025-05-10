import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import styles from "./Ads.module.css";
import template1 from "./template1.png";
import template2 from "./template2.png";
import template3 from "./template3.png";
import Header from "components/Headers/Header.js";
import { postToSocialMedia } from "./postToSocialMedia";
import { FaCheckCircle, FaInstagram, FaDownload } from "react-icons/fa";
import { getCaptionFromAI } from "./captionAI";
import UserHeader from "components/Headers/UserHeader";

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
  } from "reactstrap";


export default function AdEditor() {
  const [title, setTitle] = useState("Special Offer!");
  const [subtitle, setSubtitle] = useState("Schedule your time");
  const [subtitle2, setSubtitle2] = useState("Limited!");
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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [generating, setGenerating] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);

  const dragData = useRef({ isDragging: false, offsetX: 0, offsetY: 0, type: null });

  const generateCaptionWithAI = async () => {
    setGenerating(true);
    setCaption(""); 
    const suggestion = await getCaptionFromAI({ title, subtitle, subtitle2 });
  
    let i = 0;
    const typingInterval = setInterval(() => {
      setCaption((prev) => prev + suggestion[i]);
      i++;
      if (i >= suggestion.length) {
        clearInterval(typingInterval);
        setGenerating(false);
      }
    }, 40);
  };

    const handleDragStart = (e, type) => {
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;

    let pos;
    if (type === "title") pos = titlePosition;
    else if (type === "subtitle") pos = subtitlePosition;
    else if (type === "subtitle2") pos = subtitle2Position;
    else if (type === "logo") pos = logoPosition;

    dragData.current = {
      isDragging: true,
      offsetX: clientX - pos.x,
      offsetY: clientY - pos.y,
      type,
    };
  };

  const handleDrag = (e) => {
  if (!dragData.current.isDragging) return;

  const clientX = e.clientX ?? e.touches?.[0]?.clientX;
  const clientY = e.clientY ?? e.touches?.[0]?.clientY;
  const { offsetX, offsetY, type } = dragData.current;

  const x = clientX - offsetX;
  const y = clientY - offsetY;

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
  
    const originalBorderRadius = element.style.borderRadius;
    const originalBoxShadow = element.style.boxShadow;
    const originalFilter = element.style.filter;
  
    element.style.borderRadius = "0";
    element.style.boxShadow = "none";
    element.style.filter = "none";
  
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.download = "anuncio.png";
      link.href = canvas.toDataURL();
      link.click();
  
      element.style.borderRadius = originalBorderRadius;
      element.style.boxShadow = originalBoxShadow;
      element.style.filter = originalFilter;
    });
  };

  const handlePostToInstagram = async () => {
    setUploading(true);
    try {
      const element = document.getElementById("ad-preview");
      await postToSocialMedia(element, caption, previewFormat);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error(error);
      alert("Erro ao postar o anúncio.");
    } finally {
      setUploading(false);
      setShowPopup(false);
    }
  };


  return (
    <>
      <UserHeader title = 'Creating Ads' 
          description="In this page you can create an ad"
          buttonText="Create"/>
      <Container className="mt--7" fluid>
        <Row>

          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <h3 style={{ marginTop: "10px"}}>Preview</h3>
              </Row>
              <Row className="justify-content-center">
                <p>Mobile ▼</p>
              </Row>
                <div className={styles.previewWrapper}>
                  <div
                    id="ad-preview"
                    className={styles.adPreview}
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      color: textColor,
                      backgroundColor: bgColor,
                      fontFamily,
                      width: "100%",  
                      maxWidth: previewFormat === "stories" ? "400px" : "500px",
                      aspectRatio: previewFormat === "stories" ? "9 / 16" : "1 / 1",
                      margin: "0 auto",
                    }}
                    onMouseMove={handleDrag}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    onTouchMove={handleDrag}
                    onTouchEnd={handleDragEnd}
                    onTouchCancel={handleDragEnd}
                  >
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="Background"
                        className={styles.backgroundImage}
                      />
                    )}

                    {logoUrl && (
                      <img
                        src={logoUrl}
                        alt="Logo"
                        draggable={false}
                        onMouseDown={(e) => handleDragStart(e, "logo")}
                        onTouchStart={(e) => handleDragStart(e, "logo")}
                        style={{
                          position: "absolute",
                          left: `${logoPosition.x}px`,
                          top: `${logoPosition.y}px`,
                          cursor: "grab",
                          maxWidth: "150px",
                          zIndex: 2,
                        }}
                      />
                    )}

                    <p
                      style={{
                        fontSize: '32px',
                        position: "absolute",
                        left: `${titlePosition.x}px`,
                        top: `${titlePosition.y}px`,
                        cursor: "grab",
                        zIndex: 2,
                      }}
                      onMouseDown={(e) => handleDragStart(e, "title")}
                      onTouchStart={(e) => handleDragStart(e, "title")}
                    >
                      {title}
                    </p>

                    <p
                      style={{
                        position: "absolute",
                        left: `${subtitlePosition.x}px`,
                        top: `${subtitlePosition.y}px`,
                        cursor: "grab",
                        zIndex: 2,
                      }}
                      onMouseDown={(e) => handleDragStart(e, "subtitle")}
                      onTouchStart={(e) => handleDragStart(e, "subtitle")}
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
                        zIndex: 2,
                      }}
                      onMouseDown={(e) => handleDragStart(e, "subtitle2")}
                      onTouchStart={(e) => handleDragStart(e, "subtitle2")}
                    >
                      {subtitle2}
                    </p>
                  </div>
                </div>
              <Col>
                <Row className="justify-content-center" style={{ marginTop: "10px"}}>
                    <label style={{ marginRight: "8px" }}>Formato:</label>
                </Row>
                 <Row className="justify-content-center" style={{ marginTop: "10px"}}>
                    <select
                    value={previewFormat}
                    onChange={(e) => setPreviewFormat(e.target.value)}
                    style={{ width: "150px" }}
                    className={styles.input}
                    >
                    <option value="feed">Feed (1:1)</option>
                    <option value="stories">Stories (9:16)</option>
                  </select>
                 </Row>
              </Col>
                {showSuccessMessage && (
                <div className={styles.successOverlay}>
                  <div className={styles.successPopup}>
                    <FaCheckCircle size={50} color="#2ecc71" />
                    <p>Post enviado com sucesso!</p>
                  </div>
                </div>
              )}
            </Card>
          </Col>

          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                        <h3 className="mb-0">Creating Ads</h3>
                        </Col>
                    </Row>
                </CardHeader>

                <CardBody>
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
                  
                    <h6 className="heading-small text-muted mb-4">
                      Ad Information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                              <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Title
                              </label>

                              <Input 
                                className="form-control-alternative"
                                htmlFor="input-username"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Main Text:"
                              />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                              <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Subtitle 1
                              </label>

                              <Input
                                className="form-control-alternative"
                                htmlFor="input-username"
                                type="text"
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                placeholder="Subtitle 1:"
                                />
                          </FormGroup>
                        </Col>

                        <Col lg="6">
                          <FormGroup>
                            <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Subtitle 2
                              </label>
                            <Input
                              className="form-control-alternative"
                              htmlFor="input-username"
                              type="text"
                              value={subtitle2}
                              onChange={(e) => setSubtitle2(e.target.value)}
                              placeholder="Subtitle 2:"
                            />
                          </FormGroup>
                        </Col>
                            <Col lg="6">
                              <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                >
                                    Font
                                </label>
                              <Input
                              type="select"
                              value={fontFamily}
                              onChange={(e) => setFontFamily(e.target.value)}
                            >
                              <option value="Arial">Arial</option>
                              <option value="'Times New Roman', serif">Times New Roman</option>
                              <option value="'Courier New', monospace">Courier New</option>
                              <option value="'Comic Sans MS', cursive">Comic Sans</option>
                              <option value="Verdana">Verdana</option>
                              <option value="'Open Sans', sans-serif">Open Sans</option>
                            </Input> 

                              </FormGroup>
                            </Col>

                            <Col lg="6">
                              <FormGroup>
                                  <div className={styles.colorRow}>
                                    <label className="form-control-label">
                                      Main Color:
                                      <input
                                        type="color"
                                        value={textColor}
                                        onChange={(e) => setTextColor(e.target.value)}
                                        className={styles.colorInput}
                                      />
                                    </label>
                                    <label className="form-control-label">
                                      Secondary:
                                      <input
                                        type="color"
                                        value={secondaryColor}
                                        onChange={(e) => setSecondaryColor(e.target.value)}
                                        className={styles.colorInput}
                                      />
                                      </label>
                                  </div>
                                
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                            <FormGroup>
                                <label className={styles.label}>Background:</label>
                                <Input type="file" accept="image/*" onChange={handleBackgroundUpload}/>
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <label className={styles.label}>Logo (Top):</label>
                                <Input type="file" accept="image/*" onChange={handleLogoUpload}/>
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                  <div className={styles.botoes}>
                                      <button onClick={downloadImage} className={styles.iconButton}>
                                        <FaDownload size={20} />
                                      </button>

                                      <button onClick={() => setShowPopup(true)} className={styles.iconButton}>
                                        <FaInstagram size={20} color="#C13584" />
                                        </button>
                                  </div>
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
                                            <button onClick={generateCaptionWithAI} disabled={generating} className={styles.aiButton}>
                                              {generating ? "Generating..." : "AI's suggestion? 🤖"}
                                            </button>
                                            <button onClick={() => setShowPopup(false)} className={styles.cancelButton}>
                                              Close
                                            </button>
                                            <button onClick={handlePostToInstagram} disabled={uploading} className={styles.confirmButton}>
                                              {uploading ? "Posting..." : "Post"}
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                              </FormGroup>
                            </Col>
                        </Row>
                      </div> 
                </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
