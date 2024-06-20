import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Text,
  StackDivider,
  Box,
  IconButton,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import EditBoard from "./EditBoard";
import DeleteBoard from "./DeleteBoard";
import ShareBoard from "./ShareBoard";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export default function BoardCard({ board, updateTrigger, setUpdateTrigger }) {
  const user = useContext(UserContext);
  const ownership =
    board.userId === user.userId ? "Created by you" : "Shared with you";
  const [boardName, setBoardName] = useState(board.title);
  const [boardDesc, setBoardDesc] = useState(board.description);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const {
    isOpen: isOpen3,
    onOpen: onOpen3,
    onClose: onClose3,
  } = useDisclosure();
  function handleEdit(evt) {
    evt.preventDefault();
    const finalBoardName = boardName === "" ? "Untitled Board" : boardName;
    const finalBoardDesc =
      boardDesc === "" ? "No description provided." : boardDesc;
    onClose();
    axios.patch(
      `/boards/updateBoard/${board._id}`,
      {
        title: finalBoardName,
        desc: finalBoardDesc,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setUpdateTrigger(!updateTrigger);
  }

  function shareButton() {
    const owned = board.userId === user.userId;
    if (owned) {
      onOpen3();
    } else {
      alert("You cannot share this board as you are not the owner.");
    }
  }

  return (
    <>
      <Card className="mb-6 mx-4 max-w-md">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Link to={`board/${board._id}`} state={{ board: board }}>
                <Heading size="md">{board.title}</Heading>
              </Link>
            </Flex>
            <Menu>
              <MenuButton
                as={IconButton}
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                icon={<BsThreeDotsVertical />}
              />
              <MenuList>
                <MenuItem onClick={onOpen}>Edit</MenuItem>
                <MenuItem onClick={onOpen2}>Delete</MenuItem>
                <MenuItem onClick={shareButton}>Share</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Board Description
              </Heading>
              <Text pt="2" fontSize="sm" className="break-words">
                {board.description}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {ownership}
              </Heading>
            </Box>
          </Stack>
        </CardBody>
      </Card>
      <EditBoard
        isOpen={isOpen}
        onClose={onClose}
        boardName={boardName}
        setBoardName={setBoardName}
        boardDesc={boardDesc}
        setBoardDesc={setBoardDesc}
        handleEdit={handleEdit}
        board={board}
      />
      <DeleteBoard
        isOpen={isOpen2}
        onClose={onClose2}
        board={board}
        updateTrigger={updateTrigger}
        setUpdateTrigger={setUpdateTrigger}
      />
      <ShareBoard
        isOpen={isOpen3}
        onClose={onClose3}
        boardName={boardName}
        boardId={board._id}
      />
    </>
  );
}
