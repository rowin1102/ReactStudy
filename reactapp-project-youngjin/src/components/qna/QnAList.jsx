import { useEffect, useState } from "react";
import { firestore } from "../../firestoreConfig";
import { collection, deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore";
import QnAEdit from "./QnAEdit";
import QnAComment from "./QnAComment";

export default function QnAList(props) {
  const {formatDate} = props
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const getCollection = async () => {
      const q = query(collection(firestore, 'qna'), orderBy('createAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const dataArray = [];

      querySnapshot.forEach(doc => {
        const info = doc.data();
        dataArray.push({ id: doc.id, ...info });
      });

      setAllData(dataArray);
    };
    getCollection();
  }, []);

  const deleteQnA = async (e, id) => {
    e.preventDefault();
    await deleteDoc(doc(firestore, 'qna', id));
    window.location.reload();
  }

  const loginUserId = JSON.parse(localStorage.getItem("loginID"));

  

  return (<>
    <ul className="list-group mt-3">
      {allData.map(row => (
        <li className="list-group-item" key={row.id}>
          
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold">{row.title}</h5>
            {row.username === loginUserId?.username ? (
            <div>
              <QnAEdit modalId={`editModal-${row.id}`} id={row.id} /> &nbsp;
              <button className="btn btn-outline-danger btn-sm"
                onClick={e => {
                  if(window.confirm('삭제하시겠습니까?')) {
                    deleteQnA(e, row.id);
                    console.log('삭제성공');
                  }
                }}>삭제</button>
            </div>
            ) : ''}
          </div>

          <div className="mt-2 mb-1 text-muted" style={{ fontSize: '0.9rem' }}>
            작성자: {row.username} | 날짜: {formatDate(row.createAt)}
          </div>

          <p className="mb-0" style={{ whiteSpace: 'pre-wrap', fontSize: '1.2rem' }}>
            {row.content}
          </p>
          
          <QnAComment id={row.id} formatDate={formatDate} />
        </li>
      ))}
    </ul>
  </>); 
}