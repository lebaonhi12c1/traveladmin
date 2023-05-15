import React from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { destinationUpdateReducer } from "../../stateReducers";
import { useCallback } from "react";
import FormUpdate from "../../components/FormUpdate";
import { getUpCloudinary } from "../../cloudinary";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import Loading from "../../components/Loading";
import Notification from "../../components/Notification";
import { convertToValidDirectoryName } from "../../hooks";
import { processImages } from "../../cloudinary";
function TourUpdate(props) {
  const params = useParams();
  // const [tour, setTour] = useState({
  //   _id: "",
  //   title: "",
  //   description: "",
  //   price: 0,
  //   destination: "",
  //   image: "",
  //   image_public_id: "",
  //   images: [],
  //   level: "",
  //   availableSlots: 0,
  //   age: 0,
  //   numberOfDay: 0,
  //   rating: 0,
  //   status: "draft",
  //   content: "",
  //   public_id: "",
  // })
  const [tour,setTour] = useState(null)
  const editorRef = useRef()
  const [destination, setDestination] = useState(null)
  const [imageCloud, setImageCloud] = useState(null);
  const [respone,setRespone] = useState({
    loading: false,
    success: false,
    notification: false,
    message: ''
  })
  const inputs = [
    {
      label: "Title",
      type: "text",
      placeholder: 'Enter your content...',
      handler: (e) =>
        setTour({ ...tour, title: e.target.value })
    },
    {
      label: "Price",
      type: "number",
      placeholder: 'Enter your content...',
      handler: (e) =>
        setTour({ ...tour, number: e.target.value })
    },
    {
      label: "Level",
      type: "text",
      placeholder: 'Enter your content...',
      handler: (e) =>
        setTour({ ...tour, level: e.target.value })
    },
    {
      label: "AvailableSlots",
      type: "number",
      placeholder: 'Enter your content...',
      handler: (e) =>
        setTour({ ...tour, availableSlots: e.target.value })
    },
    {
      label: "Age",
      type: "number",
      placeholder: 'Enter your content...',
      handler: (e) =>
        setTour({ ...tour, age: e.target.value })
    },
    {
      label: "NumberOfDay",
      type: "number",
      placeholder: 'Enter your content...',
      handler: (e) =>
        setTour({ ...tour, numberOfDay: e.target.value })
    },
    {
      label: "Rating",
      type: "number",
      placeholder: 'Enter your content...',
      handler: (e) =>
        setTour({ ...tour, rating: e.target.value })
    },
    {
      label: "Image",
      type: "file",
      placeholder: 'Enter your content...',
      handler: (e) => {
        setImageCloud(e.target.files[0]);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.addEventListener("load", () => {
          setTour({ ...tour, image: reader.result })
        });
      },
    },
  ];
  const getTours = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/tour/${params.id}`
      );
      const data = await res.json();
      setTour(
        data,
      )
    } catch (error) {
      console.log(error);
    }
  };
  const getDestination = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/destination`
      );
      const data = await res.json();
      setDestination(data)
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = useCallback(async () => {
    setRespone({...respone,loading: true})
    try {
      if (imageCloud) {
        const cloud = await getUpCloudinary(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME
          }/image/upload`,
          imageCloud,
          `/tour/${convertToValidDirectoryName(tour.title)}`
        );
      }
      const { content, imageUrls, public_id_cloud } = await processImages(
        editorRef.current.getContent(),
        `/tour/${convertToValidDirectoryName(tour.title)}`
      );
      console.log(content)
      const res = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/tour/${params.id
        }`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...tour,
            access_token: JSON.parse(localStorage.getItem("user")).access_token,
            content: content,
            public_id: public_id_cloud,
            images: imageUrls,
          }),
        }
      );

      const feedback = await res.json();;
      setRespone({loading: false,success: true, message: feedback.message,notification:true})
    } catch (error) {
      console.log(error);
      setRespone({loading: false,success: false, message:error.toString(),notification:true})
    }
  }, [tour]);
  useEffect(() => {
    getTours();
    getDestination()
  }, []);
  //   console.log(destinationUpdate)
  const url = useLocation()
  useEffect(()=>{
    const timeout = setTimeout(() => {
      respone.notification && setRespone({...respone,notification: false})
    }, 2000);
    return ()=>clearTimeout(timeout)
  },[respone.notification])
  return (
    <div className="center-element p-4">

      <div className="bg-white rounded-md p-4 mb-3 uppercase flex gap-2 text-blue-950 font-[600]">
        <Link to={`/${url.pathname.split("/")[1]}`}>
          {url.pathname.split("/")[1]}
        </Link>
        <div className="mt-[-2px]">/</div>
        <div>Update Tour</div>
      </div>
      <div className="bg-white p-4 flex flex-col gap-4 rounded-md ">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white flex border border-slate-200 rounded-sm flex-col gap-2  p-4">
           {tour &&  <FormUpdate
              inputs={inputs}
              init={tour}
              type={"tour"}
            />}
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="font-bold">Status</label>
              <select value={tour?.status} name="status" id="status" className="py-2 px-2 border border-slate-200 rounded-sm" onChange={e => setTour({ ...tour, status: e.target.value })}>

                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="font-bold">Destination</label>
              <select value={tour?.destination} name="status" id="status" className="py-2 px-2 border border-slate-200 rounded-sm" onChange={e => setTour({ ...tour, destination: e.target.value })}>
                {destination?.map(item => (
                  <option value={item.name} key={item._id}>{item.name}</option>
                )) ?? 'Loading...'}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="font-bold">Description</label>
              <textarea
                value={tour?.description}
                name="description"
                id="description"
                rows="6"
                className="border border-slate-200 p-2 focus-visible:outline-blue-500"
                placeholder="Enter your content..."
                onChange={(e) =>
                  setTour({ ...tour, description: e.target.value })
                }
              ></textarea>
            </div>
          </div>
          <div className="bg-white  p-4 border border-slate-200 rounded-sm">
            <img
              src={
                tour?.image ??
                "https://img.freepik.com/free-photo/retro-camera_144627-12239.jpg?w=740&t=st=1682173463~exp=1682174063~hmac=15e4a02243ecc1d90de75ccb3be6e35487564ffbdc48b3d050be69e9619dcbb0"
              }
              alt={tour?.title}
              className="object-contain"
            />
          </div>
        </div>
        <div>
          <Editor
            apiKey="v46bp1jobw1ix6zsno3lj1ve6iofsahu846pzrvkadndep24"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={tour?.content}
            init={{
              height: 1000,
              //menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
        <div className="flex w-full justify-center">
          <button className=" self-center py-2 px-4 text-center bg-blue-950 text-white rounded-sm hover:scale-105 active:scale-90 duration-150" onClick={handleSubmit}>
            Update
          </button>
        </div>
      </div>

      {respone.loading && <div className="flex items-center justify-center fixed inset-0 bg-black/20 z-[60]"><Loading heading={'Updating...'}/></div>}
      {respone.notification && (<Notification heading={respone.message} type={'success'}/>)}
    </div>
  );
}

export default TourUpdate;
