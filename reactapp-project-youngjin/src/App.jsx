import {Routes, Route} from 'react-router-dom';

import Navi from "./components/navigation/Navi";
import Home from "./components/Home";
import Login from './components/members/Login';
import SignUp from './components/members/SignUp';

import './components/design/bootstrap.min.css';
import './components/design/style.css';
import './components/design/tiny-slider.css';

export default function App() {

  return (<>
    <Navi />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  </>); 
}