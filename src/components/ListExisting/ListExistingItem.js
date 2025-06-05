import React from "react";
import {
  ListGroupItem,
} from "reactstrap";
import { BsPencil } from "react-icons/bs";

export const Item = ({ icon, children, onEdit }) => {
  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        {icon && <span className="mr-2">{icon}</span>}
        <span>{children}</span>
      </div>
      <BsPencil size={18} style={{ cursor: "pointer" }} onClick={onEdit} />
    </ListGroupItem>
  );
}