import { NotificationContainer } from "react-notifications";
import Auth from "./components/auth";
import { useSelector } from "react-redux";
import UserProfile from "./components/UserProfile";

function App() {
  const { loggedIn } = useSelector((state) => state.user);

  return (
    <div className="App">
      {loggedIn ? <UserProfile /> : <Auth />}
      <NotificationContainer />
    </div>
  );
}

export default App;
