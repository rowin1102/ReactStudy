// 스테이트 사용을 위한 훅 임포트
import { useState } from "react";

// 모듈화 한 컴포넌트 임포트
import NavList from './components/navigation/NavList';
import NavView from './components/navigation/NavView';
import NavWrite from './components/navigation/NavWrite';
import ArticleList from './components/article/ArticleList';
import ArticleView from './components/article/ArticleView';
import ArticleWrite from './components/article/ArticleWrite';

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
  const boardData = [
    {no:1, title:'오늘은 React공부하는 날', writer:'낙짜샘', date:'2023-01-01', contents:'React를 뽀개봅시다'},
    {no:2, title:'어제은 JS를 공부했음', writer:'유겸이', date:'2023-03-03', contents:'JS는 할게 너무 많아요'},
    {no:3, title:'내일은 Project해야지', writer:'개똥이', date:'2023-05-05', contents:'Project는 뭘 만들어볼까?'}
  ];
  const [mode, setMode] = useState('list');
  let articleComp, navComp, titleVar;

  if(mode === 'list') {
    titleVar = '게시판-목록(props)';
    navComp = <NavList onChangeMode = {() => {
      setMode('write');
    }} />
    articleComp = <ArticleList boardData = {boardData} 
    onChangeMode = {(no) => {
      console.log('선택한 게시물 번호:', no);
      setMode('view');
    }} />
  } else if(mode === 'view') {
    titleVar = '게시판-읽기(prorps)';
    navComp = <NavView onChangeMode = {(pmode) => {
      setMode(pmode);
    }} />
    articleComp = <ArticleView />
  } else if(mode === 'write') {
    titleVar = '게시판-읽기(prorps)';
    navComp = <NavWrite onChangeMode = {() => {
      setMode('list');
    }} />
    articleComp = <ArticleWrite />
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