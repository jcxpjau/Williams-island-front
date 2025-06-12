import { Modal } from "reactstrap";

export function Root({ isOpen, toggle, children }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered className="modal-lg">
      {children}
    </Modal>
  );
}
