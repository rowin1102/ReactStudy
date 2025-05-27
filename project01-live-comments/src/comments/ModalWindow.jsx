import { useState } from "react";

export default function ModalWindow(props) {
  const { boardData, setBoardData, nextNo, setNextNo, nowDate } = props;
  
  const [writer, setWriter] = useState('');
  const [contents, setContents] = useState('');

  const submitHandle = (e) => {
    e.preventDefault();

    if (writer.trim() !== '' && contents.trim() !== '') {
      let addBoardData = {no:nextNo, writer:writer, contents:contents, date:nowDate(), like:0};
      setBoardData([...boardData, addBoardData]);
      setNextNo(nextNo + 1);
      
      console.log('boardData', addBoardData.no, writer, contents);
      
      setWriter('');
      setContents('');

      const modalEl = document.getElementById('commentModal');
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();
    } else {
      alert("빈 값이 존재합니다.");
    }
  }

  const handleClose = () => {
    setWriter('');
    setContents('');
  };

  return (<>
    <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={submitHandle}>
            <div className="modal-header">
              <h5 className="modal-title" id="commentModalLabel">댓글 작성</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* 작성자명 입력 상자 추가 */}
              <div className="mb-3">
                  <label htmlFor="commentAuthor" className="form-label">작성자명</label>
                  <input type="text" className="form-control" id="commentAuthor" name="writer"
                    placeholder="이름을 입력하세요" value={writer} onChange={e => setWriter(e.target.value)} />
              </div>
              {/*  댓글 입력 상자 */}
              <label htmlFor="commentContent" className="form-label">댓글 내용</label>
              <textarea className="form-control" id="commentContent" rows="3" name="contents"
                placeholder="댓글을 입력하세요" value={contents} onChange={e => setContents(e.target.value)}></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                onClick={handleClose}  >닫기</button>
              <button type="submit" className="btn btn-primary">작성</button>
            </div>
          </form>
        </div>
      </div>
    </div>    
  </>); 
}