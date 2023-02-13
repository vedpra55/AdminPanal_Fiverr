/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSwr from "swr";
import { toast } from "react-hot-toast";

export default function AdminOnly({ user, buttonColor, theme }) {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState(buttonColor);
  const [selectedColorName, setSelectedColorName] = useState(buttonColor);
  const [isLoadings, setLoading] = useState(false);
  const [isLoadingTheme, setIsLoadingTheme] = useState(false);
  const [themeIcons, setThemeIcons] = useState({
    logo: theme.logo,
    loginIcon: theme.loginIcon,
    helpIcon: theme.helpIcon,
    aboutIcon: theme.aboutIcon,
    userIcon: theme.userIcon,
    logoutIcon: theme.logoutIcon,
    homeIcon: theme.homeIcon,
    dataIcon: theme.dataIcon,
    adminIcon: theme.adminIcon,
    addDataIcon: theme.addDataIcon,
    editDataIcon: theme.editDataIcon,
    deleteDataIcon: theme.deleteDataIcon,
    saveIcon: theme.saveIcon,
    makeAdminIcon: theme.makeAdminIcon,
  });

  const makeAdminIcon = theme.makeAdminIcon;
  const saveIcon = theme.saveIcon;

  const URL = `${process.env.NEXT_PUBLIC_URL}/api/v1/allUsers`;
  const MAKE_ADMIN_URL = `${process.env.NEXT_PUBLIC_URL}/api/v1/makeAdmin`;
  const COLOR_CHANGE_URL = `${process.env.NEXT_PUBLIC_URL}/api/v1/theme`;

  async function fetchData() {
    const res = await fetch(URL);
    return res.json();
  }

  const { data, error, isLoading } = useSwr("allUsers", fetchData);

  if (user.role !== "admin") {
    return router.push("/");
  }

  if (error) {
    return (
      <div className="h-96 w-full flex justify-center items-center">
        <h2 className="text-xl font-semibold">Something Goes Wrong</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-96 w-full flex justify-center items-center">
        <h2 className="font-semibold">Loading...</h2>
      </div>
    );
  }

  async function handleMakeAdmin(userId) {
    const data = {
      userId: userId,
      adminId: user.id,
    };

    setLoading(true);

    const res = await fetch(MAKE_ADMIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      toast.success("User Role Updated");
      setTimeout(() => {
        window.location.reload();
      }, [1000]);
    }

    setLoading(false);
  }

  async function handleSaveTheme() {
    const data = {
      buttonColorValue: selectedColor,
      buttonColorName: selectedColorName,
      ...themeIcons,
    };

    setIsLoadingTheme(true);

    const res = await fetch(COLOR_CHANGE_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      toast.success("Button Color Updated");
      setTimeout(() => {
        window.location.reload();
      }, [1000]);
    }
    setIsLoadingTheme(false);
  }

  async function handleChangeInput(e) {
    const { name, value } = e.target;
    setThemeIcons({
      ...themeIcons,
      [name]: value,
    });
  }

  return (
    <div className="">
      <h2 className=" text-3xl font-semibold">Admin Panal</h2>
      <div>
        <div className="grid grid-cols-12 mt-10 text-xs md:text-[16px]">
          <div className=" bg-gray-100 px-5 py-1 border col-span-5 md:col-span-6">
            User Name
          </div>
          <div className="bg-gray-100 px-5 py-1 border col-span-3 md:col-span-3">
            Role
          </div>
          <div className="bg-gray-100 px-5 py-1 border col-span-4 md:col-span-3">
            Action
          </div>
        </div>
        {data.users.map((item) => (
          <React.Fragment key={item._id}>
            <div className="grid grid-cols-12 my-4 text-xs md:text-[16px]">
              <p className="col-span-5 md:col-span-6  px-5">{item.name}</p>
              <p className="col-span-3 px-5">{item.role}</p>
              {item.role !== "admin" ? (
                <button
                  style={{
                    background: buttonColor,
                  }}
                  onClick={() => handleMakeAdmin(item._id)}
                  className="flex justify-center items-center gap-x-1 col-span-4 md:col-span-3 bg-blue-500 w-28 md:w-36 py-1 text-white mx-0 md:mx-5 whitespace-nowrap"
                >
                  <p>{isLoadings ? "Loading..." : "Make Admin"}</p>
                  <img className="w-5" src={makeAdminIcon} alt="icons" />
                </button>
              ) : (
                <div className="col-span-4 md:col-span-3 md:px-5 text- text-black whitespace-nowrap">
                  No Action Required
                </div>
              )}
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
      <div className="mt-10">
        <div className="flex flex-col gap-y-3">
          <label className="font-semibold">Button Color</label>
          <select
            value={selectedColor}
            onChange={(e) => {
              setSelectedColor(e.target.value);
              setSelectedColorName(e.target.name);
              console.log(e.target.id);
            }}
            className="w-56 bg-gray-100 border-gray-200 outline-gray-200 px-5 py-2"
          >
            <option value="#0000FF">blue</option>
            <option value="#FF0000">red</option>
            <option value="#023020">green</option>
          </select>
        </div>
      </div>
      <div className="mt-10">
        <p className="text-xl font-semibold my-5">Icons</p>
        <div className="grid grid-cols-12 gap-5">
          <div className="flex flex-col gap-y-1 col-span-6">
            <label>Logo</label>
            <input
              name="logo"
              onChange={(e) => handleChangeInput(e)}
              className=" border px-5 py-2"
              value={themeIcons.logo}
            />
          </div>
          <div className="flex flex-col gap-y-1 col-span-6">
            <label>Home Icon</label>
            <input
              name="homeIcon"
              onChange={(e) => handleChangeInput(e)}
              className=" border px-5 py-2"
              value={themeIcons.homeIcon}
            />
          </div>
          <div className="flex flex-col gap-y-1 col-span-6">
            <label>Data Icon</label>
            <input
              onChange={(e) => handleChangeInput(e)}
              name="dataIcon"
              className=" border px-5 py-2"
              value={themeIcons.dataIcon}
            />
          </div>
          <div className="flex flex-col gap-y-1 col-span-6">
            <label>Admin Icon</label>
            <input
              name="adminIcon"
              onChange={(e) => handleChangeInput(e)}
              className=" border px-5 py-2"
              value={themeIcons.adminIcon}
            />
          </div>
          <div className="flex flex-col gap-y-1 col-span-6">
            <label>Help Icon</label>
            <input
              name="helpIcon"
              onChange={(e) => handleChangeInput(e)}
              className=" border px-5 py-2"
              value={themeIcons.helpIcon}
            />
          </div>
          <div className="flex flex-col gap-y-1 col-span-6">
            <label>About Icon</label>
            <input
              name="aboutIcon"
              className=" border px-5 py-2"
              onChange={(e) => handleChangeInput(e)}
              value={themeIcons.aboutIcon}
            />
          </div>
          <div className="flex flex-col gap-y-1 col-span-6">
            <label>User Icon</label>
            <input
              name="userIcon"
              className=" border px-5 py-2"
              onChange={(e) => handleChangeInput(e)}
              value={themeIcons.userIcon}
            />
          </div>

          <div className="flex flex-col gap-y-1 col-span-6">
            <label>Login Icon</label>
            <input
              name="loginIcon"
              className=" border px-5 py-2"
              onChange={(e) => handleChangeInput(e)}
              value={themeIcons.loginIcon}
            />
          </div>

          <div className="flex flex-col gap-y-1 col-span-6">
            <label>Logout Icon</label>
            <input
              name="logoutIcon"
              className=" border px-5 py-2"
              onChange={(e) => handleChangeInput(e)}
              value={themeIcons.logoutIcon}
            />
          </div>
          <div className="flex flex-col gap-y-1 col-span-6">
            <label>Add Data Icon</label>
            <input
              name="addDataIcon"
              className=" border px-5 py-2"
              onChange={(e) => handleChangeInput(e)}
              value={themeIcons.addDataIcon}
            />
          </div>
          <div className="flex flex-col gap-y-1 col-span-6">
            <label>Edit Data Icon</label>
            <input
              name="editDataIcon"
              className=" border px-5 py-2"
              onChange={(e) => handleChangeInput(e)}
              value={themeIcons.editDataIcon}
            />
          </div>
          <div className="flex flex-col gap-y-1 col-span-6">
            <label>Delete Data Icon</label>
            <input
              name="deleteDataIcon"
              className=" border px-5 py-2"
              onChange={(e) => handleChangeInput(e)}
              value={themeIcons.deleteDataIcon}
            />
          </div>
          <div className="flex flex-col gap-y-1 col-span-6">
            <label>Make Admin Icon</label>
            <input
              name="makeAdminIcon"
              className=" border px-5 py-2"
              onChange={(e) => handleChangeInput(e)}
              value={themeIcons.makeAdminIcon}
            />
          </div>
          <div className="flex flex-col gap-y-1 col-span-6">
            <label>Save Icon</label>
            <input
              name="saveIcon"
              className=" border px-5 py-2"
              onChange={(e) => handleChangeInput(e)}
              value={themeIcons.saveIcon}
            />
          </div>
        </div>
      </div>
      <button
        style={{
          background: buttonColor,
        }}
        onClick={handleSaveTheme}
        className="flex justify-center items-center w-36 gap-x-1 bg-blue-500 px-3 py-2 text-white mt-10"
      >
        <p>{isLoadingTheme ? "Loading..." : "Save"}</p>
        <img className="w-5" src={saveIcon} alt="icons" />
      </button>
    </div>
  );
}
