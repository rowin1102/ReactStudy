import { useEffect, useRef } from "react";

export default function CommentModal(props) {
  const {onClose, content, setContent, onSubmit, id} = props;
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (<>
    <div
      className="modal d-block"
      tabIndex="-1"
      id={id}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={onSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">댓글 작성</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <textarea
              className="form-control"
              rows={4}
              value={content}
              ref={inputRef}
              onChange={(e) => setContent(e.target.value)}
              placeholder="댓글을 입력하세요."
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              취소
            </button>
            <button type="submit" className="btn btn-primary">
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  </>); 
}