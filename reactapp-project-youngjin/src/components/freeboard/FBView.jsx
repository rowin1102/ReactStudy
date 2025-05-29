import { Link, useParams } from "react-router-dom";
import { firestore } from "../../firestoreConfig";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import '../design/fbstyle.css';

export default function FBView() {
  const { no } = useParams();
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const docRef = doc(firestore, 'freeboards', no);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      if (data) {
        setId(data.id || '');
        setUsername(data.username || '');
        setTitle(data.title || '');
        setContent(data.content || '');
        setDate(data.date || '');
      }
    };
    fetch();
  }, [no]);

  return (
    <div className="fb-wrapper">
      <div className="fb-detail">
        <h2 className="fb-title">{title}</h2>

        <div className="fb-meta">
          <span>작성자: {username}</span>
          <span>작성일: {date}</span>
        </div>

        <div className="fb-content" style={{ whiteSpace: 'pre-wrap' }}>
          {content}
        </div>
      </div>

      <div className="fb-back">
        <Link to="/fbList" className="fb-back-link">목록으로</Link>
      </div>
    </div>
  );
}
