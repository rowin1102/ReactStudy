import BoardView from "./comments/BoardView";
import CommentBtn from './comments/CommentBtn';
import ModalWindow from "./comments/ModalWindow";
import CommentList from "./comments/CommentList";
import { useState } from "react";

const nowDate = () => {
  const date = new Date();
  
  return date.toISOString().slice(0, 16).replace('T', ' ');
}

export default function App() {
  const [boardData, setBoardData] = useState([]);
  const [nextNo, setNextNo] = useState(1);

  return (<>
    <div className="container mt-4">
      <BoardView />
      <CommentBtn />
      <ModalWindow boardData={boardData} setBoardData={setBoardData}
        nextNo={nextNo} setNextNo={setNextNo} nowDate={nowDate} />
      <CommentList boardData={boardData} setBoardData={setBoardData} nowDate={nowDate} />
    </div>
  </>); 
}