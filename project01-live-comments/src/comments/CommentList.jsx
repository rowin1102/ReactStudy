import Edit from "./Edit";

export default function CommentList(props) {
  const { boardData, setBoardData, nowDate } = props;

  return (<>
    {/* 댓글 목록 출력 */}
    <ul className="list-group mt-3">
      {boardData.map(row => (
        <li className="list-group-item" key={row.no}>
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
                <strong>{row.writer}</strong> <small className="ms-2">{row.date}</small>
            </div>
            <div>
                <button className="btn btn-outline-success btn-sm"
                  onClick={() => {
                    const update = boardData.map(
                      item => item.no === row.no ? { ...item, like: item.like + 1 } : item);
                      setBoardData(update);
                  }}>좋아요 ({row.like})</button>
                <Edit boardData={boardData} setBoardData={setBoardData} no={row.no} nowDate={nowDate}
                  modalId={`editModal-${row.no}`} />
                <button className="btn btn-outline-danger btn-sm" onClick={e => {
                  e.preventDefault();
                  if(window.confirm('삭제할까요?')) {
                    const newBoardData = boardData.filter(item => item.no != row.no);
                    setBoardData(newBoardData);
                  }
                }}>삭제</button>
            </div>
          </div>
          <p className="mt-2 mb-0" style={{whiteSpace: 'pre-wrap'}}>
            {row.contents}
          </p>
        </li>
      ))}
    </ul>    
  </>); 
}