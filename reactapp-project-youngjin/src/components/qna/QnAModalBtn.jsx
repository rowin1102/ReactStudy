
export default function QnAModalBtn(props) {
  const loginUserId = JSON.parse(localStorage.getItem('loginID'))?.username;

  const handleClick = (e) => {
    e.preventDefault();
    console.log('아이디', loginUserId);
    if(!loginUserId) {
      alert('로그인을 해주세요.');
    } else {
      const modalEl = document.getElementById('commentModal');
      const modal = new window.bootstrap.Modal(modalEl);
      modal.show();
    }
  }


  return (<>
    <div className="d-flex justify-content-center" style={{ marginTop: '100px' }}>
      <button className="btn btn-primary btn-lg" onClick={e => handleClick(e)}>
      질문하기</button>
    </div>
  </>); 
}