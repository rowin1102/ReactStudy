import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function Edit(props) {
  const boardData = props.boardData;
  const setBoardData = props.setBoardData;
  const navigate = props.navigate;
  const nowDate = props.nowDate;
  
  let params = useParams();
  console.log('파라미터', params.no);
  let num = Number(params.no);
  
  let vi = props.boardData.reduce((prev, curr) => {
    if(curr.no === Number(params.no)) {
      prev = curr;
    }
    return prev;
  }, {});

  const [title, setTitle] = useState(vi.title);
  const [writer, setWriter] = useState(vi.writer);
  const [contents, setContents] = useState(vi.contents);

  return (<>
    <header>
      <h2>게시판-수정</h2>
    </header>

    <nav>
      <Link to='/list'>목록</Link>
    </nav>

    <article>
      <form onSubmit={(event) => {
        event.preventDefault();

        let t = event.target.title.value;
        let w = event.target.writer.value;
        let c = event.target.contents.value;

        let editBoardData = {no:num, writer:w, title:t, contents:c, date:nowDate()};
        let copyBoardData = [...boardData];

        for(let i=0; i<copyBoardData.length; i++) {
          if(copyBoardData[i].no === num) {
            copyBoardData[i] = editBoardData;
            break;
          }
        }

        setBoardData(copyBoardData);
        navigate('/list');

      }}>
        <table id="boardTable">
          <tbody>
            <tr>
              <td>작성자</td>
              <td><input type="text" name="writer"
                value={writer}
                onChange={(event) => {
                  setWriter(event.target.value);
                }} /></td>
            </tr>
            <tr>
              <td>제목</td>
              <td><input type="text" name="title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }} /></td>
            </tr>
            <tr>
              <td>내용</td>
              <td><textarea name="contents" rows="3"
              value={contents}
                onChange={(event) => {
                  setContents(event.target.value);
                }}></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="수정하기" />
      </form>
    </article>
  </>); 
}

export default Edit