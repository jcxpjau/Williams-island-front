import { ModalFooter, Button } from 'reactstrap';

export function Footer({ label, onClick, color = 'primary' }) {
  return (
    <ModalFooter className="d-flex justify-content-center">
      <Button color={color} onClick={onClick}>
        {label}
      </Button>
    </ModalFooter>
  );
}
