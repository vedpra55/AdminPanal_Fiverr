/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/dist/client/router";
import React from "react";

export default function SideBar({ buttonColor, sidebarIcons }) {
  const router = useRouter();
  const tab = parseInt(router.query.tab);

  return (
    <div className="col-span-12 md:col-span-2">
      <div className=" py-10 md:pb-20 h-full items-start px-3 xl:px-10 md:py-6 flex flex-row justify-between md:justify-start md:flex-col gap-y-5  bg-gray-100  shadow-md border-black">
        <button
          style={{
            background: buttonColor,
            color: "white",
            opacity: !tab ? 1 : 0.7,
          }}
          className=" flex items-center justify-center gap-x-2 px-5 py-1  xl:w-36"
          onClick={() => router.push("/")}
        >
          <p>Home</p>
          <img className="w-5" src={sidebarIcons.homeIcon} alt="icons" />
        </button>
        <button
          style={{
            background: buttonColor,
            color: "white",
            opacity: tab === 1 ? 1 : 0.7,
          }}
          className="flex items-center justify-center gap-x-2 px-5 py-1 xl:w-36"
          onClick={() => router.push("/?tab=1")}
        >
          <p>Data</p>
          <img className="w-5" src={sidebarIcons.dataIcon} alt="icons" />
        </button>
        <button
          style={{
            background: buttonColor,
            color: "white",
            opacity: tab === 2 ? 1 : 0.7,
          }}
          className="flex items-center justify-center gap-x-2 px-5 py-1  xl:w-36"
          onClick={() => router.push("/?tab=2")}
        >
          <p>Admin (Only)</p>
          <img className="w-5" src={sidebarIcons.adminIcon} alt="icons" />
        </button>
      </div>
    </div>
  );
}
