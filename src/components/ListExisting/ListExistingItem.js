import React from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { ListGroupItem } from 'reactstrap';

export const Item = ({ icon, children, onEdit, onDelete }) => {
  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        {icon && <span className="mr-2">{icon}</span>}
        <span>{children}</span>
      </div>
      <div>
        <BsPencil
          className="mr-4"
          size={18}
          style={{ cursor: 'pointer' }}
          onClick={onEdit}
        />
        <BsTrash
          size={18}
          style={{ cursor: 'pointer' }}
          onClick={onDelete ? onDelete : () => {}}
        />
      </div>
    </ListGroupItem>
  );
};

