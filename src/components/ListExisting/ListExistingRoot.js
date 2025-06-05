import React from "react";
import {
  ListGroup,
} from "reactstrap";


export const Root = ({ children, className = "" }) => {
  return <ListGroup className={`text-black ${className}`}>{children}</ListGroup>;
}