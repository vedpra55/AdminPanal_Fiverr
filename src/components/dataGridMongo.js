/* eslint-disable @next/next/no-img-element */
import { DataGrid } from "@mui/x-data-grid";
import AddDatatModal from "./addDataModal";
import { useState } from "react";
import useSwr from "swr";
import EditDataModal from "./editDataModal";

export default function DataGridMongo({ buttonColor, dataIcons }) {
  const [isModal, setModal] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [rowId, setRowId] = useState(null);
  const URL = `${process.env.NEXT_PUBLIC_URL}/api/v1/data`;

  const columns = [
    {
      id: "4554",
      field: "addressBook",
      headerName: "Address book balance sheet",
      width: 180,
      editable: true,
    },
    { id: "4sadasd4", field: "name", headerName: "Name", width: 120 },
    { id: "yerbcdf5s", field: "address", headerName: "Address ", width: 120 },
    {
      id: "4dsf54sd5f",
      field: "city",
      headerName: "City",
      width: 120,
    },
    {
      id: "4dsf54f",
      field: "state",
      headerName: "State",
      width: 120,
    },
    {
      id: "4sdsf78f",
      field: "country",
      headerName: "Country ",
      width: 120,
    },
    {
      id: "4a8sf78f",
      field: "postalCode",
      headerName: "Postal-code",
      width: 120,
    },
    {
      id: "4a89sf78f",
      field: "currency",
      headerName: "Currency",
      width: 120,
    },
    {
      id: "5a89sf78f",
      field: "createdAt",
      headerName: "Created-on-date",
      width: 120,
    },
    {
      id: "787a89sf78f",
      field: "Actions",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <div>
          <button
            style={{
              background: buttonColor,
            }}
            className=" flex justify-center items-center gap-x-1 text-white px-3 py-1"
            onClick={() => {
              setRowId(params.id);
              setOpen(true);
            }}
          >
            <p>Edit</p>
            <img className="w-5" src={dataIcons.editIcon} alt="icons" />
          </button>
        </div>
      ),
    },
  ];

  async function fetchData() {
    const res = await fetch(URL);
    return res.json();
  }

  const { data, error, isLoading } = useSwr("data", fetchData);

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

  return (
    <div className=" h-96 w-full">
      <AddDatatModal
        addIcon={dataIcons.addIcon}
        buttonColor={buttonColor}
        isOpen={isModal}
        setIsOpen={setModal}
      />
      <button
        onClick={() => setModal(true)}
        className=" flex items-center justify-center gap-x-1 mb-5  text-white px-5 py-1"
        style={{
          background: buttonColor,
        }}
      >
        <p>Add Data</p>
        <img className="w-5" src={dataIcons.addIcon} alt="icons" />
      </button>
      <DataGrid
        experimentalFeatures={{ newEditingApi: true }}
        editMode="row"
        rows={data.data}
        columns={columns}
        getRowId={(rows) => rows._id}
        onCellEditStart={(rowId) => setRowId(rowId)}
        onRowEditStop={(r) => console.log(r)}
      />
      {isOpen && (
        <EditDataModal
          editIcon={dataIcons.editIcon}
          deleteIcon={dataIcons.deleteIcon}
          buttonColor={buttonColor}
          setIsOpen={setOpen}
          isOpen={isOpen}
          id={rowId}
        />
      )}
    </div>
  );
}
