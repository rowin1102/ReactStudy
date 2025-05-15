// 스테이트 사용을 위한 훅 임포트
import { useState } from "react";

// 모듈화 한 컴포넌트 임포트
import NavList from './components/navigation/NavList';
import NavView from './components/navigation/NavView';
import NavWrite from './components/navigation/NavWrite';
import NavEdit from './components/navigation/NavEdit';
import ArticleList from './components/article/ArticleList';
import ArticleView from './components/article/ArticleView';
import ArticleWrite from "./components/article/ArticleWrite";
import ArticleEdit from "./components/article/ArticleEdit";

// 페이지가 없을때 임시로 사용하기 위한 컴포넌트
function ReadyComp() {
  return (<>
    <h3>컴포넌트 준비중입니다</h3>
    <a href="/">Home바로가기</a>
  </>);
}

// 헤더 컴포넌트는 모든 페이지에서 공통으로 사용된다.
function Header(props) {
  console.log('props', props.title);

  return (<>
    <header>
      <h2>{props.title}</h2>
    </header>
  </>);
}

function App() {
  // 게시판의 데이터로 사용할 객체형 배열
  /* 작성을 위해 기존의 객체형 배열을 스테이트로 변환한다. 데이터의 추가, 삭제가
    있을때 새로운 렌더링이 되어야 하기 때문이다. */
  const [boardData, setBoardData] = useState([
    {no:1, title:'오늘은 React공부하는 날', writer:'낙짜샘', date:'2023-01-01', contents:'React를 뽀개봅시다'},
    {no:2, title:'어제은 JS를 공부했음', writer:'유겸이', date:'2023-03-03', contents:'JS는 할게 너무 많아요'},
    {no:3, title:'내일은 Project해야지', writer:'개똥이', date:'2023-05-05', contents:'Project는 뭘 만들어볼까?'}
  ]);

  const [mode, setMode] = useState('list');
  // 선택한 게시물의 일련변호를 저장. 첫 실행시에는 선택한 게시물이 없으므로 null로 초기화
  const [no, setNo] = useState(null);
  /* 새로운 게시물 작성시 사용할 시퀀스(Sequence) 용도의 스테이트 생성. 
    이미 3개의 게시물이 있으므로 초기값은 4로 설정한다. */
  const [nextNo, setNextNo] = useState(4);
  
  // 선택할 게시물의 객체를 저장할 변수 추가("{no:1, title:'오늘은'"와 같은 객체 저장)
  let articleComp, navComp, titleVar, selectRow;

  if(mode === 'list') {
    titleVar = '게시판-목록(props)';
    navComp = <NavList onChangeMode = {() => {
      setMode('write');
    }} />
    articleComp = <ArticleList boardData = {boardData} 
      onChangeMode = {(no) => {
        console.log('선택한 게시물 번호:', no);
        // 화면을 '열람'으로 전환
        setMode('view');
        // 선택한 게시물의 일련번호로 스테이트 변경
        setNo(no);
    }} />
  } else if(mode === 'view') {
    titleVar = '게시판-읽기(prorps)';
    navComp = <NavView onChangeMode = {(pmode) => {
      setMode(pmode);
    }} />

    console.log('현재no:', no, typeof(no));

    // 선택한 게시물의 일련번호와 일치하는 객체를 검색하기 위해 반복
    for(let i=0; i<boardData.length; i++) {
      if(no === boardData[i].no) {
        // 일치하는 게시물이 있다면 변수에 저장
        selectRow = boardData[i];
      }
    }
    // 선택한 게시물의 프롭스를 통해 자식 컴포넌트로 전달
    articleComp = <ArticleView selectRow = {selectRow} />
  } else if(mode === 'write') {
    titleVar = '게시판-읽기(prorps)';

    navComp = <NavWrite onChangeMode = {() => {
      setMode('list');
    }} />

    articleComp = <ArticleWrite writeAction = {(t, w, c) => {
      // 3개의 값을 받을 수 있는 함수를 정의하여 프롭스로 전달
      console.log('App.jsx', t, w, c);

       if(t !== '' && w !== '' && c !== '') {
         // 작성일을 Date객체를 통해 생성
         let dateObj = new Date();
         // 현재년도
         var year = dateObj.getFullYear();
         // getMonth() : 0~11까지를 반환하므로 +1 해야 현재월을 구할 수 있다.
         var month = ("0" + (1 + dateObj.getMonth())).slice(-2);
         var day = ("0" + dateObj.getDate()).slice(-2);
         /* 월과 일이 한자리인 경우에는 01과 같이 생성되고 두자리인 경우에는 012와 같이 생성되므로
           끝에서 두자리만 잘라낸다. 이때 slice(-2)를 사용한다. */
         // 0000-00-00 형식으로 날짜를 생성한다.
         let nowDate = year + '-' + month + '-' + day;
   
         /* 스테이트 배열에 추가할 객체를 생성한다. 일련번호를 스테이트로 선언ㅇ한 nextNo를
           사용하고, 작성폼에서 입력한 값ㅇ르 받아서 구성한다. */
         let addBoardData = {no:nextNo, title:t, writer:w, contents:c, date:nowDate};
   
         // 추가방법1(권장)
         // 스프레드 연산자로 복사본 배열을 하나 생성한다.
         let copyBoardData = [...boardData];
         // 복사된 배열에 새로운 객체를 추가한다.
         copyBoardData.push(addBoardData);
         // 복사된 배열을 통해 스테이트를 변경한다.
         setBoardData(copyBoardData);
   
         /* 배열의 복사본을 만들면 메모리에는 새로운 배열이 하나 추가된다. 복사본에 데이터를
          추가한 후 이를 통해 State를 변경한다. 그러면 새롭게 생성된 배열의 참조값을 통해
          State를 변경했으므로 React는 변화를 감지하여 새로운 렌더링을 하게 된다.
          JS는 얕은참조라는 개념을 통해 객체의 변화를 감지하도록 설계되어 있어 이와 같이 
          처리하는 것이다. */

         // 추가방법2(비추천)
         // boardData.push(addBoardData);
         // console.log(boardData);
         // setBoardData(boardData);
   
         // 일련번호로 사용하는 스테이트를 1 증가
         setNextNo(nextNo+1);
         // 글쓰기가 완료되면 화면을 '목록'으로 전환
         setMode('list');
       } else {
        alert('빈값이 존재합니다.');
      }
    }} />
  } else if(mode === 'delete') {
    // 삭제1(권장)
    // 새로운 빈 배열 생성
    let newBoardData = [];

    // 데이터의 갯수만큼 반복
    for(let i=0; i<boardData.length; i++) {
      // 삭제하려는 게시물이 아닌것만 새로운 배열에 추가한다.
      if(no != boardData[i].no) {
        // 새로운 배열에는 삭제하려는 게시물이 추가되지 않는다.
        newBoardData.push(boardData[i]);
      }
    }
    // 새로운 배열을 통해 스테이트를 변경하면 리렌더링이 된다.
    setBoardData(newBoardData);
    
    // 삭제2(비권장)
    // for(let i=0; i<boardData.length; i++) {
    //   if(no === boardData[i].no) {
    //     boardData.splice(i, 1);
    //   }
    // }
    // setBoardData(newBoardData);
    
    // 삭제가 완료되면 리스트로 전환한다. 
    setMode('list');
  } else if(mode === 'edit') {
      titleVar = '게시판 - 수정(props)';

      navComp = <NavEdit
        onChangeMode = {() => {
          // 목록으로 전환하는 기능
          setMode('list');
        }}
        onBack = {() => {
          // 열람으로 전환하는 기능
          setMode('view');
          setNo(no);
        }} />

      // 데이터의 갯수만큼 반복해서 수정할 게시물 선택
      for(let i=0; i<boardData.length; i++) {
        if(no === boardData[i].no) {
          selectRow = boardData[i];
        }
      }

      // 수정할 게시물을 자식 컴포넌트로 전달
      articleComp = <ArticleEdit selectRow = {selectRow} />
  } else {
    navComp = <ReadyComp />
    articleComp = '';
  }

  return (<>
    <Header title={titleVar} />
    {/* mode의 변화에 따라 다른 컴포넌트를 렌더링한다. */}
    {navComp}
    {articleComp}
  </>);
}

export default App