// 스테이트 사용을 위한 훅 임포트
import { useState } from "react";

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

// 목록에서 사용할 네비게이션
function NavList(props) {
  return (<>
    <nav>
      <a href="/" onClick={function(event) {
        event.preventDefault();
        props.onChangeMode();
      }}>글쓰기</a>
    </nav>
  </>);
}

// 열람의 네비게이션
function NavView(props) {
  return (<>
  {/* 엘리먼트 사이를 띄어쓰기 할때는 &nbsp;를 사용하면 된다. */}
    <nav>
      <a href="/" onClick={function(event) {
        event.preventDefault();
        props.onChangeMode('list');
      }}>목록</a>&nbsp;
      <a href="/" onClick={function(event) {
        event.preventDefault();
        props.onChangeMode('edit');
      }}>수정</a>{" "}
      <a href="/" onClick={function(event) {
        event.preventDefault();
        props.onChangeMode('delete');
      }}>삭제</a>
    </nav>
  </>);
}

// 쓰기의 네비게이션
function NavWrite(props) {
  return (<>
    <nav>
      <a href="/" onClick={function(event) {
        event.preventDefault();
        props.onChangeMode();
      }}>목록</a>
    </nav>
  </>);
}

function ArticleList(props) {
  const lists = [];

  for (let i = 0; i < props.boardData.length; i++) {
    let row = props.boardData[i];
    lists.push(
      <tr key={row.no}>
        <td className="cen">{row.no}</td>
        <td><a href={'/read/' + row.no} onClick={(event) => {
          event.preventDefault();
          props.onChangeMode(row.no);
        }}>{row.title}</a></td>
        <td className="cen">{row.writer}</td>
        <td className="cen">{row.date}</td>
      </tr>
    );
  }

  return (<>
    <article>
      <table id="boardTable">
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {lists}
        </tbody>
      </table>
    </article>  
  </>);
}

function ArticleView(props) {
  return (<>
    <article>
      <table id="boardTable">
        <colgroup>
          <col width="20%" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <th>작성자</th>
            <td>성유겸</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>오늘은 React공부하는 날</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>2023-05-05</td>
          </tr>
          <tr>
            <th>내용</th>
            <td>열심히 해봅시당<br/>열공합시다</td>
          </tr>
        </tbody>
      </table>
    </article>  
  </>);
}

// 작성
function ArticleWrite(props) {
  return (<>
    <article>
    <form>
      <table id="boardTable">
        <tbody>
          <tr>
            <td>작성자</td>
            <td><input type="text" name="writer" /></td>
          </tr>
          <tr>
            <td>제목</td>
            <td><input type="text" name="title" /></td>
          </tr>
          <tr>
            <td>내용</td>
            <td><textarea name="contents" rows="3"></textarea></td>
          </tr>
        </tbody>
      </table>
      <input type="submit" value="전송" />
    </form>
    </article>
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