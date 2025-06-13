import React from "react";
import { Row } from "reactstrap";

export function Section({ title, children, rightContent }) {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6 className="heading-small text-muted m-0">{title}</h6>
        {rightContent && <div>{rightContent}</div>}
      </div>
      <div className="pl-lg-4">
        <Row>{children}</Row>
      </div>
      <hr className="my-4" />
    </>
  );
}
