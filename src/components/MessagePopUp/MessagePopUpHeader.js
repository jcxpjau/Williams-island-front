import { ModalHeader } from "reactstrap";

export function Header({ toggle, title }) {
  return (
    <ModalHeader
      toggle={toggle}
      className="bg-primary d-flex align-items-center justify-content-center"
    >
      <h3 className="text-white fs-3 fw-bold m-0 w-100 text-center">{title}</h3>
    </ModalHeader>
  );
}