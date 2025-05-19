import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Edit(props) {
  const navigate = useNavigate();
  let params = useParams();
  // let [boardData, setBoardData] = useState({});

  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [contents, setContents] = useState('');
  
  let requestUrl = "http://nakja.co.kr/APIs/php7/boardViewJSON.php";
  let parameter = "tname=nboard_news&idx=" + params.idx + "&apikey=c827aaa03d6375722014cbaa333416f2";

  useEffect(function() {
    fetch(requestUrl + "?" + parameter)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        console.log(json);
        // setBoardData(json);

        setWriter(json.name);
        setTitle(json.subject);
        setContents(json.content);
      });

    return () => {
      console.log('useEffect실행 => 컴포넌트 언마운트');
    }
  }, []);


  return (<>
    <header>
      <h2>게시판 - 작성</h2>
    </header>

    <nav>
      <Link to='/list'>목록</Link>
    </nav>

    <article>
      <form onSubmit={(event) => {
        event.preventDefault();

        let i = event.target.idx.value;
        let w = event.target.writer.value;
        let t = event.target.title.value;
        let c = event.target.contents.value;
        console.log(w, t, c);

        // let editBoardData = {no:Number(params.idx), writer:w, title:t, contents:c, date:date};
        // setBoardData(editBoardData);

        fetch('http://nakja.co.kr/APIs/php7/boardEditJSON.php', {
          method: 'POST',
          headers: {
            'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
          },
          body: new URLSearchParams({
            tname: 'nboard_news',
            id: 'jsonAPI',
            name: w,
            subject: t,
            content: c,
            idx: i,
            apikey: 'c827aaa03d6375722014cbaa333416f2',
          }),
        })
        .then((response) => response.json())
        .then((json) => console.log(json));

        navigate('/list');
      }}>
        <input type="hidden" name="idx" value={params.idx} />
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
              <td><textarea name="contents" cols="22" rows="3"
                value={contents}
                onChange={(event) => {
                  setContents(event.target.value);
                }}></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="전송" />
      </form>
    </article>
  </>);
}

export default Edit