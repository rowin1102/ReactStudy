import { Link, useParams } from "react-router-dom";

function View(props) {
  /* useParams 훅 : 컴포넌트를 라우팅 처리할때 중첩된 구조내에서 :no와 같이 사용된 파라미터의
      값을 읽어올 수 있는 훅 */
  var params = useParams();
  console.log('파라미터', params.no);

  /* 데이터 배열의 크기만큼 반복하여 조건에 맞는 객체를 찾은 후 반환한다.
    빈 객체를 초기값으로 사용했으므로, 배열의 크기인 N만큼 반복하게 된다.
    prev의 첫번째 값은 빈 객체. curr의 첫 번째값은 데이터 배열의 0번 요소 */
  let vi = props.boardData.reduce((prev, curr) => {
    if(curr.no === Number(params.no)) {
      prev = curr;
    }
    return prev;
  }, {});

  const number = Number(params.no);
  let currIndexNum;
  
  for(let i=0; i<props.boardData.length; i++) {
    if(props.boardData[i].no === number) {
      currIndexNum = i;
      break;
    }
  }

  let nextView = (currIndexNum + 1 < props.boardData.length) ? props.boardData[currIndexNum+1].no : number;
  let prevView = (currIndexNum - 1 >= 0) ? props.boardData[currIndexNum-1].no : number;

  return (<>
    <header>
      <h2>게시판 - 읽기</h2>
    </header>

    <nav>
      {/* <a href="/list">목록</a>&nbsp;
      <a href="/edit">수정</a>&nbsp;
      <a href="/delete">삭제</a> */}
      <Link to='/list'>목록</Link> &nbsp;
      <Link to={'/edit/' + number}>수정</Link> &nbsp;
      <Link to='/delete' onClick={e => {
        e.preventDefault();
        if(window.confirm('삭제할까요?')) {
          const newBoardData = props.boardData.filter(item => item.no != number);
          props.setBoardData(newBoardData);
          props.navigate('/list');
        }
      }}>삭제</Link>
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
            <td>{vi.writer}</td>
          </tr>
          <tr>
            <td>제목</td>
            <td>{vi.title}</td>
          </tr>
          <tr>
            <td>날짜</td>
            <td>{vi.date}</td>
          </tr>
          <tr>
            <td>내용</td>
            <td>{vi.contents}</td>
          </tr>
        </tbody>
      </table>
      <Link to={'/view/' + prevView}>이전글</Link> &nbsp;
      <Link to={'/view/' + nextView}>다음글</Link>
    </article>
  </>);
}

export default View