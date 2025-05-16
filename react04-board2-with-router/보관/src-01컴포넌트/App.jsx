function List(props) {
  return (<>
    <header>
      <h2>게시판-목록</h2>
    </header>

    <nav>
      <a href="/write">글쓰기</a>
    </nav>

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
          <tr>
            <td className="cen">1</td>
            <td><a href="/view/1">오늘은 React공부하는 날</a></td>
            <td className="cen">낙짜쌤</td>
            <td className="cen">2030-05-05</td>
          </tr>
        </tbody>
      </table>
    </article>
  </>);
}
        
function View() {
  return (<>
    <header>
      <h2>게시판 - 읽기</h2>
    </header>

    <nav>
      <a href="/list">목록</a>&nbsp;
      <a href="/edit">수정</a>&nbsp;
      <a href="/delete">삭제</a>
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

function Write() {
  return (<>
    <header>
      <h2>게시판 - 작성</h2>
    </header>

    <nav>
      <a href="/list">목록</a>
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

const NotFound = () => {
  return (<>
    <h2>Not Found</h2>
    <p>
      페이지를 찾을 수 없습니다. <br />
    </p>
  </>);
}

function App() {
  return (<>
    <List />
    <View />
    <Write />
    <NotFound />
  </>); 
}

export default App