// App.js
import { useEffect, useState } from "react";
import Router from "./routes/Router";
import Sidebar from "./components/SideBar/Sidebar";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("fuwari-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  
  return (
    <div className="flex h-screen">
      <Sidebar user={user} setUser={setUser} />
      <div className="flex-1 bg-white">
        <Router user={user} setUser={setUser} />
      </div>
    </div>
  );
}

export default App;