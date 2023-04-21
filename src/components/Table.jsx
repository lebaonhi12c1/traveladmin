import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { blogCol, destinationCol,tourCol } from "../tablecontruct";
import Loading from "./Loading";
import { useFetchGetAll } from "../hooks";

export default function DataGridDemo({ type,handler }) {
  const [column, setcolumn] = useState(null);
  const [row, setrow] = useState(null);
  useEffect(() => {
    const getType = async () => {
      switch (type) {
        case "destination":
          setcolumn(destinationCol);
          // console.log(column)
          try {
            const res = await useFetchGetAll(`${import.meta.env.VITE_APP_SERVER_URL}/api/destination/`)
            setrow(res.map(item=>({...item,id:item._id})))
          } catch (error) {
            // console.log(error)
            throw(error)
          }
          break;
        case "tour":
          setcolumn(tourCol);
          try {
            const res = await useFetchGetAll(`${import.meta.env.VITE_APP_SERVER_URL}/api/tour/`)
            // console.log(res)
            setrow(res.map(item=>({...item,id:item._id})))
          } catch (error) {
            console.log(error)
          }
          break;
        case "blog":
          setcolumn(blogCol);
          try {
            const res = await useFetchGetAll(`${import.meta.env.VITE_APP_SERVER_URL}/api/blog/`)
            // console.log(res)
            setrow(res.map(item=>({...item,id:item._id})))
          } catch (error) {
            // console.log(error)
            throw(error)
          }
          break;

        default:
          break;
      }
    };
    getType()
  },[]);
  const getAction =()=>{
    return (
      {
        field: 'action',
        headerName: 'Action',
        width: 200,
        renderCell: params =>(
          <div className=" flex items-center justify-center gap-2">
            <div className="py-1 px-2 bg-blue-500 text-white rounded-sm hover:scale-105 active:scale-90 duration-150 cursor-pointer">Update</div>
            <div className="py-1 px-2 bg-red-500 text-white rounded-sm hover:scale-105 active:scale-90 duration-150 cursor-pointer" onClick={()=>handler(params.row._id)}>Delete</div>
          </div>
        )
      }
    )
  }
  return column ? (
    row ? (
      <Box style={{ height: 426, width: "100%" }}>
        <DataGrid
          rows={row}
          columns={[...column,getAction()]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 6,
              },
            },
          }}
          pageSizeOptions={[6]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    ) : (
      <Loading heading={'Loading...'}/>
    )
  ) : (
    <Loading heading={'Loading...'}/>
  );
}
