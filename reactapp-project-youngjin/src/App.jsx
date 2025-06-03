import {Routes, Route} from 'react-router-dom';

import TopNavi from "./components/navigation/TopNavi";
import Home from "./components/Home";
import Login from './components/members/Login';
import SignUp from './components/members/SignUp';
import Edit from './components/members/Edit';
import FBList from './components/freeboard/FBList';
import FBView from './components/freeboard/FBView';
import FBWrite from './components/freeboard/FBWrite';
import FBEdit from './components/freeboard/FBEdit';
import QnAControl from './components/qna/QnAControl';
import RList from './components/reference/RList';
import RWrite from './components/reference/RWrite';
import RView from './components/reference/RView';
import REdit from './components/reference/rEdit';
import StartChat from './components/talking/StartChat';
import Chat from './components/talking/Chat';


import './components/design/bootstrap.min.css';
import './components/design/style.css';
import './components/design/tiny-slider.css';

import { useEffect, useState } from 'react';

const formatDate = (timestamp) => {
  const now = new Date();
  const target = timestamp.toDate();

  const pad = (n) => n.toString().padStart(2, '0');

  const isSameDay =
    now.getFullYear() === target.getFullYear() &&
    now.getMonth() === target.getMonth() &&
    now.getDate() === target.getDate();

  const year = target.getFullYear();
  const month = pad(target.getMonth() + 1);
  const day = pad(target.getDate());
  const hour = pad(target.getHours());
  const minute = pad(target.getMinutes());

  return isSameDay
    ? `${hour}:${minute}`
    : `${year}-${month}-${day}`;
};


export default function App() {
  const [id, setId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("loginID");
    if (saved) {
      setId(JSON.parse(saved));
    }
  }, []);

  return (<>
    <TopNavi id={id} setId={setId} />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login setId={setId} id={id} />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/edit' element={<Edit id={id} />} />
      <Route path='/fbList' element={<FBList formatDate={formatDate} />} />
      <Route path='/fbView/:no' element={<FBView formatDate={formatDate} />} />
      <Route path='/fbWrite' element={<FBWrite />} />
      <Route path='/fbEdit/:no' element={<FBEdit />} />
      <Route path='/qnaControl' element={<QnAControl formatDate={formatDate} id={id} />} />
      <Route path='/rList' element={<RList formatDate={formatDate} />} />
      <Route path='/rWrite' element={<RWrite />} />
      <Route path='/rView/:no' element={<RView formatDate={formatDate} />} />
      <Route path='/rEdit/:no' element={<REdit />} />
      <Route path='/startChat' element={<StartChat />} />
      <Route path='/chat' element={<Chat />} />
    </Routes>
  </>); 
}