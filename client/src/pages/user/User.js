import { useCookies } from "react-cookie";
import Auth from "../../components/Auth";
import './user.scss'

function User({ auth, email }) {
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const signOut = () => {
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };

  return (
    <div className="auth-container">
      {auth ? (
        <div>
          <p>Hello {email}. Not {email}? {<span onClick={signOut}>Log out</span>}</p>
          <form className="d-flex row">
            <label>
              Name
              <input type="text" />
            </label>
            <label>
              Email
              <input type="text" />
            </label>
            <label>
              Shipping Address
              <input type="text" />
            </label>
          </form>
          Order History
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default User;
