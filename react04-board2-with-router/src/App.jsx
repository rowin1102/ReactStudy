// 라우팅 관련 컴포넌트 임포트
import { Routes, Route, useNavigate } from "react-router-dom";

// 모듈화 처리한 컴포넌트 임포트
import List from './components/board/List';
import Write from './components/board/Write';
import View from './components/board/View';
import Edit from "./components/board/Edit";
import NotFound from './components/common/NotFound';
import { useState } from "react";

// 작성일 생성을 위한 함수 정의
const nowDate = () => {
  let dateObj = new Date();
  var year = dateObj.getFullYear();
  var month = ("0" + (1 + dateObj.getMonth())).slice(-2);
  var day = ("0" + dateObj.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
}

function App() {
  // 데이터로 사용할 객체형 배열 생성
  // 작성을 위해 기존 배열ㅇ르 스테이트로 변경한다.
  const [boardData, setBoardData] = useState([
    {no:1, title:'오늘은 React공부하는 날', writer:'낙짜샘', date:'2023-01-01', contents:'React를 뽀개봅시다'},
    {no:2, title:'어제은 JS를 공부했음', writer:'유겸이', date:'2023-03-03', contents:'JS는 할게 너무 많아요'},
    {no:3, title:'내일은 Project해야지', writer:'개똥이', date:'2023-05-05', contents:'Project는 뭘 만들어볼까?'}
  ]);

  // 일련번호 부여를 위한 스테이트 생성(시퀀스와 같은 용도)
  const [nextNo, setNextNo] = useState(4);
  // 작성 완료 후 페이지 이동을 위한 훅 선언
  const navigate = useNavigate();

  return (<>
    {/* 라우팅 처리를 위해 App컴포넌트를 감싸야 하므로 이와같이 App.jsx에서 처리해도 된다.
      하지만 주로 main.jsx에서 처리하는게 좋다. */}
    <Routes>
      {/* 첫 실행시에는 목록이 렌더링 된다. */}
      {/* 데이터로 사용할 배열을 프롭스로 자식컴포넌트로 전달 */}
      <Route path='/' element={<List boardData={boardData} />} />
      <Route path='/list' element={<List boardData={boardData} />} />
      {/* 열람의 경우 게시물의 일련번호를 통해 객체를 선택해야 하므로 중첩라우터로  
        구현하고, 일련번호의 경우 :no로 기술되어 있다. */}
      <Route path='/view'>
        <Route path=':no' element={<View boardData={boardData} setBoardData={setBoardData}
          navigate={navigate} />} />
      </Route>
      {/* Write 컴포넌트로 글쓰기 처리를 위한 모든 스테이트와 관련함수를 프롭스로 전달한다.  */}
      <Route path='/write' element={<Write boardData={boardData} setBoardData={setBoardData}
        nextNo={nextNo} setNextNo={setNextNo} navigate={navigate} nowDate={nowDate} />} />
      <Route path="/edit">
        <Route path=":no" element={<Edit boardData={boardData} setBoardData={setBoardData}
          navigate={navigate} nowDate={nowDate} />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  </>); 
}

export default App