import { useEffect, useState } from "react";
import { firestore } from "../../firestoreConfig";
import { addDoc, collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import CommentModal from "./CommentModal";

export default function QnAComment(props) {
  const {id, formatDate} = props;
  const loginUserId = JSON.parse(localStorage.getItem("loginID"));

  const [comments, setComments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const commentsRef = collection(firestore, 'qna', id, 'comments');
    const q = query(commentsRef, orderBy('createAt', 'desc'));

    const unsubscribe = onSnapshot(q, snapshot => {
      const commentArr = [];
      snapshot.forEach(doc => {
        commentArr.push({ id: doc.id, ...doc.data() });
      });
      setComments(commentArr);
    });

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    const modalId = `commentModal-${id}`;
    const modalEl = document.getElementById(modalId);

    const clearComment = () => setNewComment("");

    if (modalEl) {
      modalEl.addEventListener("hidden.bs.modal", clearComment);
    }

    return () => {
      if (modalEl) {
        modalEl.removeEventListener("hidden.bs.modal", clearComment);
      }
    };
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    const commentsRef = collection(firestore, 'qna', id, 'comments');
    await addDoc(commentsRef, {
      username: loginUserId.username,
      content: newComment,
      createAt: Timestamp.now(),
    });
    setNewComment("");
    setModalOpen(false);
  };

  return (<>
    <div className="mt-3 ps-3 border-start">
      {comments.map(cmt => (
        <div key={cmt.id} className="mb-2">
          <small className="text-muted">
            {cmt.username} | {cmt.createAt ? formatDate(cmt.createAt) : '작성중...'}
          </small>
          <p className="mb-1" style={{ whiteSpace: 'pre-wrap' }}>{cmt.content}</p>
        </div>
      ))}
    </div>

    <div className="text-end mt-3">
      <button className="btn btn-secondary btn-sm" onClick={() => {
        if(!loginUserId) {
          alert('로그인을 해주세요.');
          return;
        }
        setModalOpen(true);
      }}>
        댓글 작성
      </button>
    </div>

    {modalOpen && (
      <CommentModal
        id={`commentModal-${id}`}
        onClose={() => {
          setNewComment("");
          setModalOpen(false);
        }}
        content={newComment}
        setContent={setNewComment}
        onSubmit={handleAddComment}
      />
    )}
  </>); 
}