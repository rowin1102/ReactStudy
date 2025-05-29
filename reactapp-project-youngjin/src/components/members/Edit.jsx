import { useRef } from "react";
import { firestore } from "../../firestoreConfig";
import { Link } from "react-router-dom";

export default function Edit(props) {
  const {info} = props;

  const zipRef = useRef(null);
  const addrRef = useRef(null);
  const detailRef = useRef(null);

  const submitEdit = async(e) => {
    
  }

  const handlePostcodeSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = "";

        if (data.userSelectedType === "R") {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (zipRef.current) zipRef.current.value = data.zonecode;
        if (addrRef.current) addrRef.current.value = addr;
        if (detailRef.current) detailRef.current.focus();
      },
    }).open();
  };

  return (<>
    <div id="signup-page-container">
      <form id="signup-form" onSubmit={submitEdit}>
        <input type="hidden" name="collection" value='members' />
        <h2 id="signup-form-title">회원가입</h2>
        <table id="signup-form-table">
          <tbody>
            <tr>
              <td><label htmlFor="signup-username">아이디</label></td>
              <td style={{ display: 'flex', alignItems: 'center', gap: '10px'}}>
                <button type="button" id="signup-id-check-button">중복확인</button>
              </td>
            </tr>
            <tr>
              <td><label htmlFor="signup-password">비밀번호</label></td>
              <td><input type="password" id="signup-password" name="password"/></td>
            </tr>
            <tr>
              <td><label htmlFor="signup-password-confirm">비밀번호 확인</label></td>
              <td><input type="password" id="signup-password-confirm" name="passwordConfirm" /></td>
            </tr>
            <tr>
              <td><label htmlFor="signup-name">이름</label></td>
              <td><input type="text" id="signup-name" name="name" /></td>
            </tr>
            <tr>
              <td><label htmlFor="signup-email-id">이메일</label></td>
              <td>
                <input type="text" id="signup-email-id" name="emailId" />@ &nbsp;
                <input type="text" id="signup-email-domain" name="emailDomain" />
                <select id="signup-email-select">
                  <option value="custom">직접입력</option>
                  <option value="naver.com">naver.com</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="hanmail.net">hanmail.net</option>
                  <option value="daum.net">daum.net</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label htmlFor="signup-phone">휴대전화</label></td>
              <td><input type="text" id="signup-phone-first" name="firstPhone" maxLength="3" />-
              <input type="text" id="signup-phone-middle" name="middlePhone" maxLength="4" />-
              <input type="text" id="signup-phone-last" name="lastPhone" maxLength="4" /></td>
            </tr>
            <tr>
              <td><label htmlFor="signup-zipcode">우편번호</label></td>
              <td>
                <input type="text" id="signup-zipcode" name="zipcode" />
                <button type="button" id="signup-zipcode-search-button" 
                  onClick={handlePostcodeSearch}>우편번호 찾기</button>
              </td>
            </tr>
            <tr>
              <td><label htmlFor="signup-address">기본주소</label></td>
              <td><input type="text" id="signup-address" name="address" ref={addrRef} /></td>
            </tr>
            <tr>
              <td><label htmlFor="signup-detail-address">상세주소</label></td>
              <td><input type="text" id="signup-detail-address" name="detailAddress" ref={detailRef} /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit" id="signup-submit-button">회원가입</button>
        <p id="signup-login-link">이미 계정이 있으신가요? <Link to="/login">로그인</Link></p>
      </form>
    </div>
  </>); 
}