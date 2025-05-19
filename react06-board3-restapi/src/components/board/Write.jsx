import { Link, useNavigate } from "react-router-dom";

function Write(props) {
  // 페이지 이동을 위한 훅 사용
  const navigate = useNavigate();

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

        // 입력란 폼값 읽어오기
        let w = event.target.writer.value;
        let t = event.target.title.value;
        let c = event.target.contents.value;
        console.log(w, t, c);

        // 작성 API 호출
        /* fetch함수를 통해 post방식으로 요청을 해야하는 경우 두 번째 인수가 필요하다. */
        fetch('http://nakja.co.kr/APIs/php7/boardWriteJSON.php', {
          // 1. 전송방식 설정
          method: 'POST',
          // 2. 헤더설정(컨텐츠 타입, 케릭터셋)
          headers: {
            'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
          },
          /* 3. 작성자가 입력한 폼값을 JSON형식으로 조립하여 전송한다.
            URLSearchParams객체는 JSON형식의 데이터를 쿼리스트링 형식으로 변환해준다. */
          body: new URLSearchParams({
            tname: 'nboard_news',
            id: 'jsonAPI',
            name: w,
            subject: t,
            content: c,
            apikey: 'c827aaa03d6375722014cbaa333416f2',
          }),
        })
        .then((response) => response.json())
        .then((json) => console.log(json));

        // 글쓰기가 완료되면 목록으로 이동한다.
        navigate('/list');
      }}>
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