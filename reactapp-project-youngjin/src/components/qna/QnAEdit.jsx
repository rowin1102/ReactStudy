import { useEffect, useState } from "react";
import { firestore } from "../../firestoreConfig";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";

export default function QnAEdit(props) {
  const {modalId, id} = props;

  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const qnaEdit = async (collection, p_username, p_title, p_content) => {
    await setDoc(doc(firestore, collection, id), {
      username: p_username,
      title: p_title,
      content: p_content,
      createAt: Timestamp.now(),
    });
    console.log('수정성공');
  }

  const submitHandle = async (e) => {
    e.preventDefault();
    await qnaEdit('qna', username, title, content);
    alert('수정되었습니다.');

    setTitle('');
    setContent('');
    
    const modalEl = document.getElementById(modalId);
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
    window.location.reload();
  }

  useEffect(() => {
    const fetch = async () => {
      const docRef = doc(firestore, 'qna', id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      if (data) {
        setUsername(data.username || '');
        setTitle(data.title || '');
        setContent(data.content || '');
      }
    };
    fetch();

    const modalEl = document.getElementById(modalId);

    const handleClearForm = () => {
      setTitle(title);
      setContent(content);
    };

    modalEl.addEventListener('hidden.bs.modal', handleClearForm);

    return () => {
      modalEl.removeEventListener('hidden.bs.modal', handleClearForm);
    };
  }, [id]);

  return (<>
    <button className="btn btn-outline-warning btn-sm" data-bs-toggle="modal" 
      data-bs-target={`#${modalId}`}>
      수정 </button>

    <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
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
                    value={username || ''} readOnly />
              </div>

              <div className="mb-3">
                <label htmlFor="commentTitle" className="form-label">제목</label>
                <input type="text" className="form-control" id="commentTitle" name="title"
                  placeholder="제목을 입력하세요" value={title}
                  onChange={e => setTitle(e.target.value)}/>
              </div>

              <label htmlFor="commentContent" className="form-label">질문 내용</label>
              <textarea className="form-control" id="commentContent" rows="3" name="content"
                placeholder="질문을 입력하세요" value={content}
                onChange={e => setContent(e.target.value)}></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-bs-dismiss="modal">취소</button>
              <button type="submit" className="btn btn-primary">수정</button>
            </div>
          </form>
        </div>
      </div>
    </div> 
  </>); 
}