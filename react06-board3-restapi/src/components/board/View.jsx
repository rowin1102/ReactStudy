import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function View(props) {
  // 중첩된 라우팅에서 일련번호를 읽어오기 위한 훅
  let params = useParams();
  console.log('idx', params.idx);

  // 열람 API는 JSON 객체이므로 빈 객체를 초기값으로 지정
  let [boardData, setBoardData] = useState({});
  // API 요청 주소
  let requestUrl = "http://nakja.co.kr/APIs/php7/boardViewJSON.php";
  // 파라미터(쿼리스트링)
  let parameter = "tname=nboard_news&idx=" + params.idx + "&apikey=c827aaa03d6375722014cbaa333416f2";

  // 1차 렌더링 후 열람API 요청
  useEffect(function() {
    fetch(requestUrl + "?" + parameter)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        console.log(json);
        // 스테이트 변경 및 리렌더링
        setBoardData(json);
      });

    return () => {
      console.log('useEffect실행 => 컴포넌트 언마운트');
    }
  }, []);

  return (<>
    <header>
      <h2>게시판 - 읽기</h2>
    </header>

    <nav>
      <Link to='/list'>목록</Link> &nbsp;
      <Link to={'/edit/' + params.idx}>수정</Link> &nbsp;
      <Link to='/delete'>삭제</Link>
    </nav>

    <article>
      <table id="boardTable">
        <colgroup>
          <col width="20%" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <td>작성자</td>
            {/* 내용 출력은 JSON객체이므로 각 Key를 통해 접근하면 된다. */}
            <td>{boardData.name}</td>
          </tr>
          <tr>
            <td>제목</td>
            <td>{boardData.subject}</td>
          </tr>
          <tr>
            <td>날짜</td>
            <td>{boardData.regdate}</td>
          </tr>
          <tr>
            <td>내용</td>
            {/* HTML 태그가 그대로 출력됨. React는 보안적인 문제로 태그를 화면에
              그대로 출력하는 것이 디폴트 설정이다. */}
            {/* <td>{boardData.content}</td> */}
            {/* 마크업이 적용된 상태로 출력됨 */}
            <td dangerouslySetInnerHTML={{__html: boardData.content}}></td>
          </tr>
        </tbody>
      </table>
    </article>
  </>);
}

export default View