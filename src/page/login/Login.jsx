import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login(props) {
  const router = useNavigate()
  const [login, setLogin] = useState(false);
  const [infologin, setInforlogin] = useState({
    username: "",
    password: "",
  });
  const handleLogin = async() => {
    setLogin(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/employee/auth/login`,{
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        }
        ,
        body: JSON.stringify({
          ...infologin
        })
      })
      const user = await res.json()
      localStorage.setItem('user',JSON.stringify(user))
      router('/')
      setLogin(false)
    } catch (error) {
      setLogin(false)
      
    }
  };
  const handleSetValue = (type, value) => {
    switch (type) {
      case "username":
        setInforlogin({ ...infologin, username: value});
        break;
      case "password":
        setInforlogin({ ...infologin, password: value});
        break;
      default:
        break;
    }
  };
  const handleKeyDownLogin = (e)=>{
    e.key === 'Enter' && handleLogin()
  }
  return (
    <div className="fixed inset-0 bg-blue-950 flex items-center justify-center">
      <div className="w-[600px] h-[500px] bg-white rounded-md shadow-lg flex flex-col  items-center p-10 gap-4 justify-center">
        <div className=" text-[24px] uppercase text-blue-950">Login</div>
        <div className="flex flex-col gap-4 items-center justify-center border border-blue-950 p-4 rounded-md">
          <div className="flex items-center gap-4">
            <label htmlFor="username" className="min-w-[100px]">
              Username:
            </label>
            <input
              type="text"
              placeholder="Enter your username..."
              className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent focus-visible:outline-blue-500 focus-visible:outline focus-within:border-none"
              onChange={e=> handleSetValue("username",e.target.value)}
              spellCheck= {false}
            />
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="password" className="min-w-[100px]">
              Password:
            </label>
            <input
              type="password"
              placeholder="Enter your password..."
              className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent focus-visible:outline-blue-500 focus-visible:outline focus-within:border-none"
              onChange={e => handleSetValue("password",e.target.value)}
              spellCheck= {false}
              onKeyDown={handleKeyDownLogin}
            />
          </div>
        </div>
        {login ? (
          <button
            className="inline-flex items-center justify-center px-4 text-white bg-blue-950 rounded-md gap-x-3 py-2 disabled:cursor-not-allowed disabled:opacity-70"
            disabled
            aria-label="button-loading"
          >
            <div className="w-6 h-6 border-2 border-white rounded-full animate-spin border-t-transparent"></div>
            <span>Loading...</span>
          </button>
        ) : (
          <button
            className="inline-flex items-center justify-center px-4 py-2 font-sans font-semibold tracking-wide text-white bg-blue-950 rounded-md hover:bg-blue-500 active:scale-90 duration-200"
            onClick={handleLogin}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;
