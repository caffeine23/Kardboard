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

export default function EditBoard({
  isOpen,
  onClose,
  boardName,
  setBoardName,
  boardDesc,
  setBoardDesc,
  handleEdit,
}) {
  const initialRef = useRef();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setBoardName(boardName);
        setBoardDesc(boardDesc);
      }}
      initialFocusRef={initialRef}
    >
      <form onSubmit={handleEdit}>
        <FormControl>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Board</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormLabel>Board Name</FormLabel>
              <Input
                value={boardName}
                onChange={(evt) => setBoardName(evt.target.value)}
                placeholder="Board name"
                ref={initialRef}
              />
              <FormHelperText>Enter the new name of your board.</FormHelperText>
              <FormLabel className="mt-4">Board Description</FormLabel>
              <Input
                value={boardDesc}
                onChange={(evt) => setBoardDesc(evt.target.value)}
                placeholder="Board Description"
              />
              <FormHelperText>
                Enter the new description for your board.
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
                  setBoardName(boardName);
                  setBoardDesc(boardDesc);
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
