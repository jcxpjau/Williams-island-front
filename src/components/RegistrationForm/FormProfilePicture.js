import React from "react";
import { Button, Col } from "reactstrap";

export function ProfilePicture({ preview, fileInputRef, handleFileChange }) {
  return (
    <Col
      lg="3"
      className="d-flex flex-column align-items-center justify-content-start py-3"
      style={{ minHeight: "300px" }}
    >
      <label className="form-control-label mb-2">Profile picture</label>
      <div
        style={{
          height: "150px",
          width: "150px",
          overflow: "hidden",
          borderRadius: "50%",
        }}
      >
        <a href="#pablo" onClick={(e) => e.preventDefault()}>
          <img
            alt="Profile"
            className="rounded-circle"
            src={preview}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </a>
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Button
        color="info"
        className="mt-4"
        onClick={() => fileInputRef.current?.click()}
      >
        Add picture
      </Button>
    </Col>
  );
}
