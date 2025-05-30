import { useEffect, useState } from "react";
import { firestore } from "../../firestoreConfig";

import '../design/modal.css';
import { addDoc, collection, Timestamp } from "firebase/firestore";

export default function QnAModalWindow(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const submitHandle = async e => {
    e.preventDefault();
    console.log('username', props.id?.username);

    if(content.trim() !== '' && title.trim() !== '') {
      await addDoc(collection(firestore, 'qna'), {
        username: props.id?.username,
        title,
        content,
        createAt: Timestamp.now(),
      });
  
      alert('질문이 작성되었습니다.');
      
      setTitle('');
      setContent('');
      
      const modalEl = document.getElementById('commentModal');
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();
      window.location.reload();
    } else {
      alert('빈 값이 존재합니다.');
      setTitle('');
      setContent('');
    }
  }

  useEffect(() => {
    const modalEl = document.getElementById('commentModal');

    const handleClearForm = () => {
      setTitle('');
      setContent('');
    };

    modalEl.addEventListener('hidden.bs.modal', handleClearForm);

    return () => {
      modalEl.removeEventListener('hidden.bs.modal', handleClearForm);
    };
  }, []);

  return (<>
    <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={submitHandle}>
            <div className="modal-header">
              <h5 className="modal-title" id="commentModalLabel">QnA</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                  <label htmlFor="commentAuthor" className="form-label">작성자</label>
                  <input type="text" className="form-control" id="commentAuthor" name="username"
                    value={props.id?.username || ''} readOnly />
              </div>

              <div className="mb-3">
                <label htmlFor="commentTitle" className="form-label">제목</label>
                <input type="text" className="form-control" id="commentTitle" name="title"
                  placeholder="제목을 입력하세요" value={title} onChange={e => setTitle(e.target.value)}/>
              </div>

              <label htmlFor="commentContent" className="form-label">질문 내용</label>
              <textarea className="form-control" id="commentContent" rows="3" name="content"
                placeholder="질문을 입력하세요" value={content} onChange={e => setContent(e.target.value)}></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-bs-dismiss="modal">취소</button>
              <button type="submit" className="btn btn-primary">작성</button>
            </div>
          </form>
        </div>
      </div>
    </div>  
  </>); 
}