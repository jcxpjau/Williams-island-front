import React from "react";
import { Row } from "reactstrap";

export function Section({ title, children }) {
  return (
    <>
      <h6 className="heading-small text-muted mb-4">{title}</h6>
      <div className="pl-lg-4">
        <Row>{children}</Row>
      </div>
      <hr className="my-4" />
    </>
  );
}
