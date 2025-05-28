import {Routes, Route} from 'react-router-dom';

import Navi from "./components/navigation/Navi";
import Home from "./components/Home";
import Login from './components/members/Login';
import SignUp from './components/members/SignUp';
import FreeBoard from "./components/board/FreeBoard";
import QnA from "./components/board/QnA";
import Reference from './components/board/Reference';
import Edit from './components/members/Edit';

import './components/design/bootstrap.min.css';
import './components/design/style.css';
import './components/design/tiny-slider.css';
import { useEffect, useState } from 'react';

export default function App() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("loginInfo");
    if (saved) {
      setInfo(JSON.parse(saved));
    }
  }, []);

  return (<>
    <Navi info={info} setInfo={setInfo} />
    <Routes>
      <Route path='/' element={<Home info={info} />} />
      <Route path='/login' element={<Login setInfo={setInfo} info={info} />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/freeboard' element={<FreeBoard />} />
      <Route path='/qna' element={<QnA />} />
      <Route path='/reference' element={<Reference />} />
      <Route path='/edit' element={<Edit />} />
    </Routes>
  </>); 
}