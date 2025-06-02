import { useEffect, useState } from "react";
import { firestore } from "../../firestoreConfig";
import { Link, useSearchParams } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import '../design/fbstyle.css';

export default function ReferenceList(props) {
  const {formatDate} = props;

  const [allData, setAllData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);

  const itemsPerPage = 10;
  const pagesPerGroup = 5;
  const maxPages = 10;

  useEffect(() => {
    const getCollection = async () => {
      const q = query(collection(firestore, 'reference'), orderBy('createAt', 'desc'));
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
  const totalPages = Math.min(Math.ceil(totalItems / itemsPerPage), maxPages);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const pageItems = allData.slice(startIdx, startIdx + itemsPerPage);

  const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);
  const startPage = currentGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const changePage = (page) => {
    setCurrentPage(page);
    setSearchParams({ page: page });
  };

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (<>
    <div className="fb-wrapper">
      <div id="fb-nav-container">
        <div id="fb-nav">
          <h2>Free Board</h2>
          <Link to="/rWrite" id="fb-write-button">글쓰기</Link>
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
                <Link to={`/rView/${item.id}`} className="fb-title-link">
                  {item.title}
                </Link>
              </td>
              <td>{formatDate(item.createAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="fb-pagination">
        {startPage > 1 && (
          <button onClick={() => changePage(startPage - 1)}>&laquo;</button>
        )}

        {pageNumbers.map((page) =>
          page === currentPage ? (
            <span key={page} className="fb-current-page">{page}</span>
          ) : (
            <button key={page} onClick={() => changePage(page)}>{page}</button>
          )
        )}

        {endPage < totalPages && (
          <button onClick={() => changePage(endPage + 1)}>&raquo;</button>
        )}
      </div>
    </div>
  </>); 
}