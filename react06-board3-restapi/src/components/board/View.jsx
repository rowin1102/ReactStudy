import { Link } from "react-router-dom";

function View() {
  return (<>
    <header>
      <h2>게시판 - 읽기</h2>
    </header>

    <nav>
      {/* <a href="/list">목록</a>&nbsp;
      <a href="/edit">수정</a>&nbsp;
      <a href="/delete">삭제</a> */}
      <Link to='/list'>목록</Link> &nbsp;
      <Link to='/edit'>수정</Link> &nbsp;
      <Link to='/delete'>삭제</Link>
    </nav>

    <article>
      <table id="boardTable">
        <colgroup>
          <col width="30%" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <td>작성자</td>
            <td>성유겸</td>
          </tr>
          <tr>
            <td>제목</td>
            <td>오늘은 React공부하는 날</td>
          </tr>
          <tr>
            <td>날짜</td>
            <td>2023-05-05</td>
          </tr>
          <tr>
            <td>내용</td>
            <td>열심히 해봅시다<br />열공합시다</td>
          </tr>
        </tbody>
      </table>
    </article>
  </>);
}

export default View