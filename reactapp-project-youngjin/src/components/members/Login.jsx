import { Link } from 'react-router-dom';
import '../design/login.css';

const Login = () => {
  return (
    <div id="login-page-container">
      <form id="login-form">
        <h2 id="login-form-title">로그인</h2>
        <table id="login-form-table">
          <tbody>
            <tr>
              <td><label htmlFor="login-username">아이디</label></td>
              <td><input type="text" id="login-username" name="username" /></td>
            </tr>
            <tr>
              <td><label htmlFor="login-password">비밀번호</label></td>
              <td><input type="password" id="login-password" name="password" /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit" id="login-submit-button">로그인</button>
        <p id="login-signup-link">계정이 없으신가요? <Link to="/signup">회원가입</Link></p>
      </form>
    </div>
  );
};

export default Login;