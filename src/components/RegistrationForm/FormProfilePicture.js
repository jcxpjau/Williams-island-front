import React from "react";
import { Button, Col } from "reactstrap";
import { FaUser } from "react-icons/fa";

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
          borderRadius: "50%",
          backgroundColor: "#C3C3C3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="Profile"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        ) : (
          <FaUser size={28} color="#ffffff" />
        )}
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
