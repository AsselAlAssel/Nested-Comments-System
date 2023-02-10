import PostsList from "./components/PostsList";
import { ReactQueryDevtools } from 'react-query/devtools'
import { Route, Routes } from "react-router-dom";
import PostProvider from "./components/PostProvider";
import Login from "./components/Login";
import { useState } from "react";
import { userContext } from "./context/userContext";

function App() {
  const [userData, setUserData] = useState(null)
  return (
    <userContext.Provider value={
      {
        userData,
        setUserData,
        isLogin: false
      }
    } >
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/posts" element={<PostsList />} />
          <Route path="/post/:id" element={<PostProvider />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={true} position="bottom-right" />
      </div >

    </userContext.Provider>



  );

}

export default App;
