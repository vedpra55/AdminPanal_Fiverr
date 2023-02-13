/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { toast } from "react-hot-toast";

export default function AddDataModal({
  addIcon,
  isOpen,
  setIsOpen,
  buttonColor,
}) {
  const [isLoading, setLoading] = useState(false);
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

  const URL = `${process.env.NEXT_PUBLIC_URL}/api/v1/data`;

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...inputData,
      [name]: value,
    });
  }

  async function handleAddData() {
    setLoading(true);
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });
    if (res.ok) {
      toast.success("New Data Added");
      setTimeout(() => {
        window.location.reload();
      }, [1000]);
    }
    setLoading(false);
  }

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
          <Dialog.Panel className="mx-auto  w-[99%] lg:w-[50%] px-5 py-5 rounded bg-white">
            <Dialog.Title className="text-2xl font-semibold">
              Add Data
            </Dialog.Title>
            <div className=" grid grid-cols-12 gap-5 mt-10">
              <div className="col-span-6 flex flex-col gap-y-1">
                <label>Address book balance sheet</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="px-3 w-full py-1 border outline-gray-400"
                  name="addressBook"
                />
              </div>
              <div className="col-span-6 flex flex-col gap-y-1">
                <label>Name</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="px-3 w-full py-1 border outline-gray-400"
                  name="name"
                />
              </div>
              <div className="col-span-6 flex flex-col gap-y-1">
                <label>Address</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="px-3 w-full py-1 border outline-gray-400"
                  name="address"
                />
              </div>
              <div className="col-span-6 flex flex-col gap-y-1">
                <label>City</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="px-3 w-full py-1 border outline-gray-400"
                  name="city"
                />
              </div>

              <div className="col-span-6 flex flex-col gap-y-1">
                <label>State</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="px-3 w-full py-1 border outline-gray-400"
                  name="state"
                />
              </div>
              <div className="col-span-6 flex flex-col gap-y-1">
                <label>Country</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="px-3 w-full py-1 border outline-gray-400"
                  name="country"
                />
              </div>

              <div className="col-span-6 flex flex-col gap-y-1">
                <label>Postal-code</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="px-3 w-full py-1 border outline-gray-400"
                  name="postalCode"
                />
              </div>
              <div className="col-span-6 flex flex-col gap-y-1">
                <label>Currency</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="px-3 w-full py-1 border outline-gray-400"
                  name="currency"
                />
              </div>
              <button
                style={{
                  background: buttonColor,
                }}
                onClick={handleAddData}
                className="flex justify-center items-center gap-x-5  text-white w-full py-1 col-span-12"
              >
                {isLoading ? "Loading..." : "Add Data"}
                <img className="w-5" src={addIcon} alt="icons" />
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
