import React, { useContext, useEffect, useState } from "react";
import Context from "../context/Context";
import { useLocation, useNavigate } from "react-router-dom";

const UpperNavbar = () => {
  const { setSearchcategory, theme } = useContext(Context);
  const [search, setSearch] = useState("");
  const Navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {}, [location]);

  const setCategory = (event) => {
    setSearch(event.target.value);
  };

  const searchResults = (event) => {
    if (search.length !== 0) {
      setSearchcategory(search);
      Navigate(`/searchResults/${search}`);
    }
  };

  const searchEnter = (event) => {
    if (event.key === "Enter" && search.length !== 0) {
      setSearchcategory(search);
      Navigate(`/searchResults/${search}`);
    }
  };

  return (
    <>
      <nav
        className={`flex justify-center ${
          theme === "light" ? "bg-white" : "bg-black"
        } fixed ${
          theme === "light" ? "text-black" : "text-white"
        } top-0 items-center h-[60px] w-full z-10`}
      >
        <ul className=" w-full flex justify-between">
          <li className="flex items-center justify-center">
            <div className=" flex justify-center items-center mx-3">
              <img
                src="/images/youtube.png"
                className="w-[75px] cursor-pointer"
                onClick={() => {
                  Navigate("/");
                }}
                alt="Youtube"
              />
            </div>
          </li>

          <li className="flex items-center justify-center">
            <div className="flex justify-center items-center">
              <input
                type="text"
                name="search"
                id="search"
                className={`rounded-l-full cursor-text text-black ${
                  theme === "light" ? "bg-slate-200" : "bg-gray-200"
                } navbarSearch`}
                placeholder="search video..."
                onKeyUp={searchEnter}
                onChange={setCategory}
                value={search}
                autoComplete="off"
              />
              <div
                id="serchButton"
                className="flex justify-center items-center bg-slate-400 rounded-r-full cursor-pointer navbarSearchIcon"
                onClick={searchResults}
              >
                <i className="fa-solid fa-magnifying-glass fa-lg"></i>
              </div>
              <i
                className="fa-solid fa-microphone fa-lg cursor-pointer mx-3 hide"
                title="Speak to Search"
              ></i>
            </div>
          </li>

          <li className="flex items-center justify-center mx-3">
            <div className="flex justify-center items-center">
              <i
                className="fa-solid fa-circle-plus fa-lg mx-2 cursor-pointer hide"
                title="Create"
              ></i>
              <i
                className="fa-solid fa-bell fa-lg mx-2 cursor-pointer hide"
                title="Notifications"
              ></i>
              <div
                className="w-8 h-8 rounded-full flex justify-center items-center mx-3 cursor-pointer"
                title="Account"
              >
                <img src="/images/user.png" alt="user" />
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default UpperNavbar;
