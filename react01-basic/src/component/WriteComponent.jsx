function WriteComponent(props) {
  /* JSX는 HMTL과 유사한 문법을 사용하지만, XML 문법을 따르므로 반드시 쌍(Pair)를 이뤄야 한다.
    따라서 <input>태그도 종료태그를 사용하거나 self-closing을 해줘야 한다.
    Ex) <input /> 혹은 <input></input> */
  return (<>
    <header>
      <h2>게시판 - 작성</h2>
    </header>
    <nav>
      <a href="/" onClick={(event) => {
        event.preventDefault();
        props.changeMode('list');
      }}>목록</a>
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
              {/* br태그도 self-closing으로 표현해야 한다. */}
              <td><textarea name="contents" cols="22" rows="3"></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="전송" />
      </form>
    </article>
  </>);
}

export default WriteComponent;