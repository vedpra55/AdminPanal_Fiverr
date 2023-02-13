/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

export default function NavBar({
  navIcons,
  user,
  status,
  logout,
  login,
  buttonColor,
}) {
  const [showHelp, setShowHelp] = useState(false);
  const [showUser, setShowUser] = useState(false);

  return (
    <header className="mb-5">
      <nav className="flex justify-between items-center px-5 md:px-10   ">
        <div className="flex items-center gap-x-[4.5rem]">
          <img className="w-24 my-5" src={navIcons.logo} alt="logo" />
        </div>
        <div className="flex items-center gap-x-5 py-6 px-5 md:px-10">
          <div className=" relative bg-gray-100  border ">
            <button
              style={{
                background: buttonColor,
                color: "white",
              }}
              className=" hover:bg-gray-100  w-20 py-1 border flex gap-x-1 items-center justify-center"
              onClick={() => setShowHelp(!showHelp)}
            >
              <p>Help</p>
              <img className="w-5" src={navIcons.helpIcon} alt="icons" />
            </button>
            {showHelp && (
              <button
                style={{
                  background: buttonColor,
                  color: "white",
                }}
                className="absolute flex items-center justify-center gap-x-1 border top-7 h-10 inset-0 hover:bg-gray-100  w-20 py-1"
              >
                <p>About</p>
                <img className="w-5" src={navIcons.aboutIcon} alt="icons" />
              </button>
            )}
          </div>
          <div className="relative bg-gray-100  border">
            <button
              onClick={() => setShowUser(!showUser)}
              style={{
                background: buttonColor,
                color: "white",
              }}
              className=" w-28 py-1 flex gap-x-1 items-center justify-center"
            >
              <p>{user?.name ? user.name : "username"}</p>
              <img className="w-5" src={navIcons.userIcon} alt="icons" />
            </button>
            {showUser &&
              (status === "authenticated" ? (
                <button
                  style={{
                    background: buttonColor,
                    color: "white",
                  }}
                  onClick={logout}
                  className="flex justify-center gap-x-1 items-center w-28 py-1 inset-0 h-10 absolute top-7 border"
                >
                  <p>Logout</p>
                  <img className="w-5" src={navIcons.logoutIcon} alt="icons" />
                </button>
              ) : (
                <button
                  style={{
                    background: buttonColor,
                    color: "white",
                  }}
                  onClick={login}
                  className="flex justify-center items-center gap-x-1 absolute inset-0 h-10  top-7 border w-28 py-1"
                >
                  <p> Login</p>
                  <img className="w-5" src={navIcons.loginIcon} alt="icons" />
                </button>
              ))}
          </div>
        </div>
      </nav>
      <hr />
    </header>
  );
}
