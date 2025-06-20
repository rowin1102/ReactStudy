import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firestore } from "../../firestoreConfig";
import '../design/fbstyle.css';

export default function FBList({formatDate}) {
  const [allData, setAllData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  // 현재 페이지 번호. URL의 파마리머를 읽어서 초기값으로 설정.
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);

  const itemsPerPage = 20;

  useEffect(() => {
    const getCollection = async () => {
      const q = query(collection(firestore, 'freeboards'), orderBy('createAt', 'desc'));
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

  const totalItems = allData.length;
  // 전체 페이지 수
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 현재 페이지의 첫 게시글 인덱스. 
  const startIdx = (currentPage - 1) * itemsPerPage;
  const pageItems = allData.slice(startIdx, startIdx + itemsPerPage);

  // 페이지 번호 리스트
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // 페이지 변경
  const changePage = (page) => {
    setCurrentPage(page);
    setSearchParams({ page: page });
  };

  return (
    <div className="fb-wrapper">
      <div id="fb-nav-container">
        <div id="fb-nav">
          <h2>자유게시판</h2>
          <Link to="/fbWrite" id="fb-write-button">글쓰기</Link>
        </div>
      </div> 
      
      <table className="fb-table">
        <thead>
          <tr>
            <th>작성자</th>
            <th>제목</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {pageItems.map(item => (
            <tr key={item.id}>
              <td>{item.username}</td>
              <td>
                <Link to={`/fbView/${item.id}`} className="fb-title-link">
                  {item.title}
                </Link>
              </td>
              <td>{formatDate(item.createAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="fb-pagination">
        {totalItems > itemsPerPage && pageNumbers.map(page =>
          page === currentPage ? (
            <span key={page} className="fb-current-page">{page}</span>
          ) : (
            <button key={page} onClick={() => changePage(page)}>{page}</button>
          )
        )}
      </div>
    </div>
  );
}
