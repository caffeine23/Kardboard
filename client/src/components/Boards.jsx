import { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import CreateBoardButton from "./CreateBoardButton";
import CreateBoardModal from "./CreateBoardModal";
import BoardCard from "./BoardCard";
import axios from "axios";

export default function Boards() {
  const [boardName, setBoardName] = useState("");
  const [boardDesc, setBoardDesc] = useState("");
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resp = await axios.get("/boards/getBoards", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const storedBoards = resp.data || [];
      setBoards(storedBoards);
    }
    fetchData();
  }, [updateTrigger]);

  function handleSubmit(evt) {
    evt.preventDefault();
    const finalBoardName = boardName === "" ? "Untitled Board" : boardName;
    const finalBoardDesc =
      boardDesc === "" ? "No description provided." : boardDesc;
    axios.post(
      "/boards/createBoard",
      { title: finalBoardName, desc: finalBoardDesc },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setBoardName("");
    setBoardDesc("");
    onClose();
    setUpdateTrigger(!updateTrigger);
  }

  return (
    <div className="flex-grow flex flex-col items-center justify-center">
      <div className="flex flex-wrap justify-center items-center w-full mb-4">
        {boards.map((board) => (
          <BoardCard
            key={board._id}
            board={board}
            updateTrigger={updateTrigger}
            setUpdateTrigger={setUpdateTrigger}
          />
        ))}
      </div>
      <CreateBoardButton onOpen={onOpen} />
      <CreateBoardModal
        isOpen={isOpen}
        onClose={onClose}
        boardName={boardName}
        setBoardName={setBoardName}
        boardDesc={boardDesc}
        setBoardDesc={setBoardDesc}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
