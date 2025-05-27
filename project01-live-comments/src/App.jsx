import BoardView from "./comments/BoardView";
import CommentBtn from './comments/CommentBtn';
import ModalWindow from "./comments/ModalWindow";
import CommentList from "./comments/CommentList";
import { useState } from "react";

const nowDate = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0'); // 0-based
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;

  // const date = new Date();
  // return date.toISOString().slice(0, 16).replace('T', ' ');
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