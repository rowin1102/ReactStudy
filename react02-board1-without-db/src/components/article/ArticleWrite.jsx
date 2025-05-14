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

export default ArticleWrite