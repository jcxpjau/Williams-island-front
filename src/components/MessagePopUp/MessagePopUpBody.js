import { ModalBody } from "reactstrap";

export function Body({ children }) {
  return (
    <ModalBody>
      <div className="fs-5 py-4">{children}</div>
    </ModalBody>
  );
}