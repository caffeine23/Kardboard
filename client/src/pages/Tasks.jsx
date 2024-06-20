import Navbar from "../components/Navbar";
import TasksPage from "../components/TasksPage";
import { Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

function Tasks() {
  const location = useLocation();
  const { board } = location.state;
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center mt-4">
        <Heading className="text-center">{board.title}</Heading>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <TasksPage boardId={board._id} />
      </div>
    </div>
  );
}

export default Tasks;
