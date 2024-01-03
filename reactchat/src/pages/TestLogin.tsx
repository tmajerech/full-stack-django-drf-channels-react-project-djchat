import { useAuthServiceContext } from "../context/AuthContext";

const TestLogin = () => {
  const { isLoggedIn, logout } = useAuthServiceContext();
  return (
    <>
      <div>{isLoggedIn.toString()}</div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
};
export default TestLogin;
