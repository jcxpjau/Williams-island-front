import { ListGroupItem } from "reactstrap";

export const Button = ({ children, className = "", ...props }) => {
  return (
    <ListGroupItem className={`border-0 p-0 ${className}`} {...props}>
      {children}
    </ListGroupItem>
  );
}