import { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

export default function CreateBoardModal({
  isOpen,
  onClose,
  boardName,
  setBoardName,
  boardDesc,
  setBoardDesc,
  handleSubmit,
}) {
  const initialRef = useRef();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setBoardName("");
        setBoardDesc("");
      }}
      initialFocusRef={initialRef}
    >
      <form onSubmit={handleSubmit}>
        <FormControl>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create new board</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormLabel>Board Name</FormLabel>
              <Input
                value={boardName}
                onChange={(evt) => setBoardName(evt.target.value)}
                placeholder="Board name"
                ref={initialRef}
              />
              <FormHelperText>Enter the name of your new board.</FormHelperText>
              <FormLabel className="mt-4">Board Description</FormLabel>
              <Input
                value={boardDesc}
                onChange={(evt) => setBoardDesc(evt.target.value)}
                placeholder="Board Description"
              />
              <FormHelperText>
                Enter the description for your new board (optional).
              </FormHelperText>
            </ModalBody>

            <ModalFooter>
              <Button
                variant="outline"
                colorScheme="green"
                mr={3}
                type="submit"
              >
                Submit
              </Button>
              <Button
                variant="outline"
                colorScheme="red"
                onClick={() => {
                  onClose();
                  setBoardName("");
                  setBoardDesc("");
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </FormControl>
      </form>
    </Modal>
  );
}
