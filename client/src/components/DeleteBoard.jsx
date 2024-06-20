import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import axios from "axios";

export default function DeleteBoard({
  isOpen,
  onClose,
  board,
  updateTrigger,
  setUpdateTrigger,
}) {
  function handleDelete() {
    axios.delete(`/boards/deleteBoard/${board._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setUpdateTrigger(!updateTrigger);
    onClose();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Warning</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {`Are you sure you want to delete board ${board.title}?
            This will wipe all the contents of the board.
            This action cannot be undone.`}
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
            <Button
              variant="outline"
              colorScheme="green"
              ml={3}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
