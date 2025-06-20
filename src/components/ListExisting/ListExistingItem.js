import React from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { ListGroupItem } from "reactstrap";

export const Item = ({
  icon,
  children,
  onEdit,
  onDelete,
  showDelete = true,
  highlight,
}) => {
  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        {icon && <span className="mr-2">{icon}</span>}
        <span
          style={{
            fontWeight: highlight ? "bold" : "normal", 
          }}
        >
          {children}
        </span>
      </div>
      <div>
        {onEdit && (
          <BsPencil size={18} style={{ cursor: "pointer" , fontWeight: highlight ? "bold" : "normal"}} onClick={onEdit} />
        )}
        {showDelete && (
          <BsTrash
            className="ml-4"
            size={18}
            style={{ cursor: "pointer", fontWeight: highlight ? "bold" : "normal" }}
            onClick={onDelete ? onDelete : () => {}}
          />
        )}
      </div>
    </ListGroupItem>
  );
};
