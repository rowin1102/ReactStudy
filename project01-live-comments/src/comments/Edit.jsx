import { useState } from "react";

export default function Edit(props) {
  const {boardData, setBoardData, nowDate, no, modalId } = props;

  let vi = boardData.find(item => item.no === no);

  const [writer, setWriter] = useState(vi.writer);
  const [contents, setContents] = useState(vi.contents);

  const handleEdit = (e) => {
    e.preventDefault();

    let w = e.target.writer.value;
    let c = e.target.contents.value;

    let editBoardData = {no:no, writer:w, contents:c, date:nowDate(), like:vi.like}
    let copyBoardData = boardData.map(item => item.no === no ? editBoardData : item);

    setBoardData(copyBoardData);

    const modalEl = document.getElementById(modalId);
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }

  return (<>
    <button className="btn btn-outline-warning btn-sm" data-bs-toggle="modal" 
      data-bs-target={`#${modalId}`}>
      수정
    </button>

    <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleEdit}>
            <div className="modal-header">
              <h5 className="modal-title" id={`${modalId}Label`}>댓글 작성</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* 작성자명 입력 상자 추가 */}
              <div className="mb-3">
                  <label htmlFor="commentAuthor" className="form-label">작성자명</label>
                  <input type="text" className="form-control" id="commentAuthor" name="writer" value={writer}
                    onChange={e => setWriter(e.target.value)}/>
              </div>
              {/*  댓글 입력 상자 */}
              <label htmlFor="commentContent" className="form-label">댓글 내용</label>
              <textarea className="form-control" id="commentContent" rows="3" name="contents"
                value={contents} onChange={e => setContents(e.target.value)}></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
              <button type="submit" className="btn btn-primary">작성</button>
            </div>
          </form>
        </div>
      </div>
    </div>    
  </>); 
}