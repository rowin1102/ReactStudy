import { Link } from "react-router-dom";

function Write(props) {
  return (<>
    <header>
      <h2>게시판 - 작성</h2>
    </header>

    <nav>
      {/* <a href="/list">목록</a> */}
      <Link to='/list'>목록</Link>
    </nav>

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
              <td><textarea name="contents" cols="22" rows="3"></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="전송" />
      </form>
    </article>
  </>);
}

export default Write