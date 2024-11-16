import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ModalDialog({
  show,
  handleCancelClose,
  handleOkClose,
  title,
  body,
  cancelCaption,
  okCaption,
}) {
  return (
    <>
      <Modal show={show} onHide={handleCancelClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelClose}>
            {cancelCaption}
          </Button>
          <Button variant="primary" onClick={handleOkClose}>
            {okCaption}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
