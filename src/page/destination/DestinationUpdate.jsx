import React from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { destinationUpdateReducer } from "../../stateReducers";
import { useCallback } from "react";
import FormUpdate from "../../components/FormUpdate";
import { getUpCloudinary } from "../../cloudinary";
function DestinationUpdate(props) {
  const params = useParams();
  const [destinationUpdate, dispatchDestinationUpdate] = useReducer(
    destinationUpdateReducer.reducer,
    destinationUpdateReducer.initSate
  );
  const [imageCloud, setImageCloud] = useState(null);
  const inputs = [
    {
      label: "Name",
      type: "text",
      placeholder: "Enter your content...",
      handler: (e) =>
        dispatchDestinationUpdate({ type: "setName", payload: e.target.value }),
    },
    {
      label: "OpeningDate",
      type: "date",
      handler: (e) =>
        dispatchDestinationUpdate({ type: "setDate", payload: e.target.value }),
    },
    {
      label: "Image",
      type: "file",
      handler: (e) => {
        setImageCloud(e.target.files[0]);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.addEventListener("load", () => {
          dispatchDestinationUpdate({
            type: "setImage",
            payload: reader.result,
          });
        });
      },
    },
  ];
  const getDestination = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/destination/${params.id}`
      );
      const data = await res.json();
      dispatchDestinationUpdate({ type: "setName", payload: data.name });
      dispatchDestinationUpdate({ type: "setDesc", payload: data.description });
      dispatchDestinationUpdate({ type: "setDate", payload: data.openingDate });
      dispatchDestinationUpdate({ type: "setImage", payload: data.image });
      dispatchDestinationUpdate({ type: "setStatus", payload: data.status });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = useCallback(async () => {
    try {
      if (imageCloud) {
        const cloud = await getUpCloudinary(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUD_NAME
          }/image/upload`,
          imageCloud,
          `/destination/${destinationUpdate.name}`
        );
        console.log(cloud)
      }
      const res = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/destination/${
          params.id
        }`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...destinationUpdate,
            access_token: JSON.parse(localStorage.getItem("user")).access_token,
          }),
        }
      );

      const feedback = await res.json();
      console.log(feedback);
    } catch (error) {
      console.log(error);
    }
  }, [destinationUpdate]);
  useEffect(() => {
    getDestination();
  }, []);
  console.log(destinationUpdate)
  return (
    <div className="center-element p-4">
      <div className="bg-white p-4 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white flex border border-slate-200 rounded-sm flex-col gap-2  p-4">
            <FormUpdate
              inputs={inputs}
              init={destinationUpdate}
              type={"destination"}
            />
             <div className="flex flex-col gap-2">
              <label htmlFor="description" className="font-bold">Status</label>
              <select value={destinationUpdate.status} name="status" id="status" className="py-2 px-2 border border-slate-200 rounded-sm" onChange={e=>dispatchDestinationUpdate({type: 'setStatus',payload: e.target.value})}>
               
                <option value="publish">Publish</option>
                <option value="draft">Draft</option>
                <option value="hello">Hello</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="font-bold">Description</label>
              <textarea
                value={destinationUpdate.description}
                name="description"
                id="description"
                rows="6"
                className="border border-slate-200 p-2 focus-visible:outline-blue-500"
                placeholder="Enter your content..."
                onChange={(e) =>
                  dispatchDestinationUpdate({
                    type: "setDesc",
                    payload: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </div>
          <div className="bg-white  p-4 border border-slate-200 rounded-sm">
            <img
              src={
                destinationUpdate?.image ??
                "https://img.freepik.com/free-photo/retro-camera_144627-12239.jpg?w=740&t=st=1682173463~exp=1682174063~hmac=15e4a02243ecc1d90de75ccb3be6e35487564ffbdc48b3d050be69e9619dcbb0"
              }
              alt={destinationUpdate.name}
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex w-full justify-center">
          <button className=" self-center py-2 px-4 text-center bg-blue-950 text-white rounded-sm hover:scale-105 active:scale-90 duration-150" onClick={handleSubmit}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default DestinationUpdate;
