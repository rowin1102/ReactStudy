export default function regist(props) {

  return (<>
    <div id="signup-container">
      <h2 id="signup-title">회원가입</h2>
      <form id="signup-form">
        <table id="signup-table">
          <tbody>
            {/* 아이디 */}
            <tr>
              <th><label htmlFor="signup-username">아이디</label></th>
              <td>
                <input type="text" id="signup-username" name="username" required />
                <button type="button" id="signup-check-username">중복확인</button>
              </td>
            </tr>

            {/* 비밀번호 */}
            <tr>
              <th><label htmlFor="signup-password">비밀번호</label></th>
              <td><input type="password" id="signup-password" name="password" required /></td>
            </tr>

            {/* 비밀번호 확인 */}
            <tr>
              <th><label htmlFor="signup-password-confirm">비밀번호 확인</label></th>
              <td><input type="password" id="signup-password-confirm" name="passwordConfirm" required /></td>
            </tr>

            {/* 이름 */}
            <tr>
              <th><label htmlFor="signup-name">이름</label></th>
              <td><input type="text" id="signup-name" name="name" required /></td>
            </tr>

            {/* 이메일 */}
            <tr>
              <th><label htmlFor="signup-email-id">이메일</label></th>
              <td>
                <div id="signup-email-container">
                  <input type="text" id="signup-email-id" name="emailId" required />
                  <span>@</span>
                  <input type="text" id="signup-email-domain" name="emailDomain" required />
                  <select
                    id="signup-email-select"
                    onChange={(e) => {
                      const domain = e.target.value;
                      if (domain) document.getElementById('signup-email-domain').value = domain;
                    }}
                  >
                    <option value="">선택</option>
                    <option value="naver.com">naver.com</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="hanmail.net">hanmail.net</option>
                    <option value="nate.com">nate.com</option>
                  </select>
                </div>
              </td>
            </tr>

            {/* 휴대전화번호 */}
            <tr>
              <th><label htmlFor="signup-phone">휴대전화번호</label></th>
              <td><input type="tel" id="signup-phone" name="phone" required /></td>
            </tr>

            {/* 우편번호 */}
            <tr>
              <th><label htmlFor="signup-postcode">우편번호</label></th>
              <td>
                <input type="text" id="signup-postcode" name="postcode" required />
                <button type="button" id="signup-find-postcode">우편번호 찾기</button>
              </td>
            </tr>

            {/* 기본주소 */}
            <tr>
              <th><label htmlFor="signup-address">기본주소</label></th>
              <td><input type="text" id="signup-address" name="address" required /></td>
            </tr>

            {/* 상세주소 */}
            <tr>
              <th><label htmlFor="signup-detail-address">상세주소</label></th>
              <td><input type="text" id="signup-detail-address" name="detailAddress" /></td>
            </tr>

            {/* 제출 */}
            <tr>
              <td colSpan="2" style={{ textAlign: 'center' }}>
                <button type="submit" id="signup-submit">회원가입</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  </>); 
}