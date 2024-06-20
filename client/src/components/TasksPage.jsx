import TaskCardCreate from "./TaskCardCreate";
import TaskCard from "./TaskCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function TasksPage({ boardId }) {
  const [cards, setCards] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const resp = await axios.get(`/cards/getCards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const storedCards = resp.data || [];
      setCards(storedCards);
    }
    fetchData();
  }, [updateTrigger]);

  async function createCard() {
    await axios.post(
      "/cards/createCard",
      { boardId: boardId, title: "New Card" },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setUpdateTrigger(!updateTrigger);
  }

  return (
    <div className="flex-grow flex flex-col items-center justify-center">
      <div className="flex flex-wrap justify-center items-center w-full mb-4">
        <DndProvider backend={HTML5Backend}>
          {cards.map((card) => (
            <TaskCard
              key={card._id}
              card={card}
              updateTrigger={updateTrigger}
              setUpdateTrigger={setUpdateTrigger}
            />
          ))}
        </DndProvider>
      </div>
      <TaskCardCreate createCard={createCard} />
    </div>
  );
}
