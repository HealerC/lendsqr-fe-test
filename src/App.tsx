import "./App.scss";
import { useAppContext } from "./context/context";

function App() {
  const { loggedIn, login, logout } = useAppContext();
  return (
    <div className="App">
      Hello world
      {loggedIn ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}

export default App;
