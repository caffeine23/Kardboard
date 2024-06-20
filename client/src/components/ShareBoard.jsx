import { useRef, useState } from "react";
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
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";

export default function ShareBoard({ isOpen, onClose, boardName, boardId }) {
  const initialRef = useRef();
  const [username, setUsername] = useState("");
  const [shareStatus, setShareStatus] = useState(null);

  async function handleShare(evt) {
    evt.preventDefault();
    setShareStatus("Loading");

    try {
      const response = await axios.patch(
        `/boards/shareBoard/${boardId}`,
        { username },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setShareStatus(response.status);
    } catch (error) {
      if (error.response && error.response.status) {
        setShareStatus(error.response.status);
      } else {
        setShareStatus("Error");
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <form onSubmit={handleShare}>
        <FormControl>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Share {boardName}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormLabel>Username</FormLabel>
              <Input
                value={username}
                onChange={(evt) => setUsername(evt.target.value)}
                placeholder="Username"
                ref={initialRef}
              />
              {shareStatus === null && (
                <FormHelperText>
                  Enter the name of the user with whom you wanna share the board{" "}
                  {boardName}.
                </FormHelperText>
              )}
              {shareStatus === "Loading" && (
                <FormHelperText>
                  <Spinner />
                </FormHelperText>
              )}
              {shareStatus === 200 && (
                <FormHelperText>
                  {boardName} shared successfully.
                </FormHelperText>
              )}
              {shareStatus === 400 && (
                <FormHelperText>
                  {boardName} is already shared with this user.
                </FormHelperText>
              )}
              {shareStatus === 500 && (
                <FormHelperText>
                  Error sharing board {boardName}.
                </FormHelperText>
              )}
              {shareStatus === 403 && (
                <FormHelperText>
                  Invalid username. No user goes by that name.
                </FormHelperText>
              )}
              {shareStatus === 401 && (
                <FormHelperText>
                  Only the owner can share the board.
                </FormHelperText>
              )}
              {shareStatus === "Error" && (
                <FormHelperText>An unexpected error occurred.</FormHelperText>
              )}
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
              <Button variant="outline" colorScheme="red" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </FormControl>
      </form>
    </Modal>
  );
}
