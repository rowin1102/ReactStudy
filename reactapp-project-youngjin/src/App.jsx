import {Routes, Route} from 'react-router-dom';

import TopNavi from "./components/navigation/TopNavi";
import Home from "./components/Home";
import Login from './components/members/Login';
import SignUp from './components/members/SignUp';
import Edit from './components/members/Edit';
import FBList from './components/Freeboard/FBList';
import FBView from './components/freeboard/FBView';
import FBWrite from './components/freeboard/FBWrite';
import QnAList from './components/qna/QnAList';
import RList from './components/reference/RList';

import './components/design/bootstrap.min.css';
import './components/design/style.css';
import './components/design/tiny-slider.css';

import { useEffect, useState } from 'react';

const nowDate = () => {
  const date = new Date();

  return date.toISOString().slice(0, 16).replace('T', ' ');
}

const formatDate = (dateStr) => {
  const now = new Date();
  const target = new Date(dateStr);

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
    ? `${year}-${month}-${day} ${hour}:${minute}`
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
      <Route path='/' element={<Home id={id} />} />
      <Route path='/login' element={<Login setId={setId} id={id} />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/edit' element={<Edit id={id} />} />
      <Route path='/fbList' element={<FBList />} />
      <Route path='/fbView/:no' element={<FBView />} />
      <Route path='/fbWrite' element={<FBWrite nowDate={nowDate} formatDate={formatDate} />} />
      <Route path='/qnaList' element={<QnAList />} />
      <Route path='/rList' element={<RList />} />
    </Routes>
  </>); 
}