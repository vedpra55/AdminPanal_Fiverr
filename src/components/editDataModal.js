/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { toast } from "react-hot-toast";
import useSwr from "swr";

export default function EditDataModal({
  editIcon,
  deleteIcon,
  isOpen,
  setIsOpen,
  id,
  buttonColor,
}) {
  const [isLoadings, setLoading] = useState(false);
  const URL = "http://localhost:3000/api/v1/data";
  const [inputData, setData] = useState({
    addressBook: "",
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    currency: "",
  });

  async function handleEditData() {
    const data = {
      id: id,
      ...inputData,
    };
    setLoading(true);
    const res = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      toast.success("Data Updated");
      setTimeout(() => {
        window.location.reload();
      }, [1000]);
    }
    setLoading(false);
  }

  async function fetchSingleData() {
    const data = {
      id: id,
      ...inputData,
    };
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...inputData,
      [name]: value,
    });
  }

  async function handleDelete() {
    const data = {
      id: id,
    };
    const res = await fetch(URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      toast.success("Data Deleted");
      setTimeout(() => {
        window.location.reload();
      }, [500]);
    }
  }

  const { data, isLoading } = useSwr([id, "singleData"], fetchSingleData);

  useEffect(() => {
    if (!isLoading) {
      const res = data?.data;
      setData({
        addressBook: res.addressBook,
        name: res.name,
        address: res.address,
        city: res.city,
        state: res.state,
        country: res.country,
        postalCode: res.postalCode,
        currency: res.currency,
      });
    }
  }, [data]);

  if (isLoading) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 overflow-y-auto">
        {/* Container to center the panel */}
        <div className="flex min-h-full items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="mx-auto w-[99%] lg:w-[50%] px-5 py-5 rounded bg-white">
            <Dialog.Title className="text-2xl font-semibold">
              Edit Data
            </Dialog.Title>
            <button
              onClick={handleDelete}
              style={{
                background: buttonColor,
              }}
              className="flex items-center justify-center gap-x-1 px-3 py-1 text-xs hover:opacity-70 text-white mt-5"
            >
              <p>Delete Data</p>
              <img className="w-5" src={deleteIcon} alt="icons" />
            </button>
            <div className=" grid grid-cols-12 gap-5 mt-5">
              <div className="col-span-6 flex flex-col gap-y-1">
                <label>Address book balance sheet</label>
                <input
                  value={inputData.addressBook}
                  onChange={(e) => handleInputChange(e)}
                  className="px-3 w-full py-1 border outline-gray-400"
                  name="addressBook"
                />
              </div>
              <div className="col-span-6 flex flex-col gap-y-1">
                <label>Name</label>
                <input
                  value={inputData.name}
                  onChange={(e) => handleInputChange(e)}
                  className="px-3 w-full py-1 border outline-gray-400"
                  name="name"
                />
              </div>
              <div className="col-span-6 flex flex-col gap-y-1">
                <label>Address</label>
                <input
                  value={inputData.address}
                  onChange={(e) => handleInputChange(e)}
                  className="px-3 w-full py-1 border outline-gray-400"
                  name="address"
                />
              </div>
              <div className="col-span-6 flex flex-col gap-y-1">
                <label>City</label>
                <input
                  value={inputData.city}
                  onChange={(e) => handleInputChange(e)}
                  className="px-3 w-full py-1 border outline-gray-400"
                  name="city"
                />
              </div>

              <div className="col-span-6 flex flex-col gap-y-1">
                <label>State</label>
                <input
                  value={inputData.state}
                  onChange={(e) => handleInputChange(e)}
                  className="px-3 w-full py-1 border outline-gray-400"
                  name="state"
                />
              </div>
              <div className="col-span-6 flex flex-col gap-y-1">
                <label>Country</label>
                <input
                  value={inputData.country}
                  onChange={(e) => handleInputChange(e)}
                  className="px-3 w-full py-1 border outline-gray-400"
                  name="country"
                />
              </div>

              <div className="col-span-6 flex flex-col gap-y-1">
                <label>Postal-code</label>
                <input
                  value={inputData.postalCode}
                  onChange={(e) => handleInputChange(e)}
                  className="px-3 w-full py-1 border outline-gray-400"
                  name="postalCode"
                />
              </div>
              <div className="col-span-6 flex flex-col gap-y-1">
                <label>Currency</label>
                <input
                  value={inputData.currency}
                  onChange={(e) => handleInputChange(e)}
                  className="px-3 w-full py-1 border outline-gray-400"
                  name="currency"
                />
              </div>
              <button
                style={{
                  background: buttonColor,
                }}
                onClick={handleEditData}
                className=" flex justify-center gap-x-1 items-center text-white hover:opacity-70 w-full py-1 col-span-12"
              >
                <p>{isLoadings ? "Loading.." : "Edit Data"}</p>
                <img className="w-5" src={editIcon} alt="icons" />
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
