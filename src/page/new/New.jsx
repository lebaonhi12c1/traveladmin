import React, { useEffect, useReducer, useState, useRef } from "react";
import {
  destinationReducer,
  tourReducer,
  blogReducer,
} from "../../stateReducers";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import { Editor } from "@tinymce/tinymce-react";
import Loading from "./../../components/Loading";
import { getUpCloudinary, processImages } from "../../cloudinary";
import Notification from "../../components/Notification";
import { convertToValidDirectoryName, useFetchCreate } from "../../hooks";
import defaultimage from "../../assets/th.jpg";
function New({ type }) {
  const env = import.meta.env;
  const [isFetch, setisFetch] = useState({
    isLoading: false,
    isNotification: false,
    isSuccess: false,
    message: "",
  });
  const [validate, setValidate] = useState({
    isValidate: false,
    validateArray: [],
  });
  const [isApply, setIsApply] = useState(false);
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);
  const [imageui, setImageui] = useState(
    "https://tse2.mm.bing.net/th?id=OIP.49JzF-LUDDBCKfQX_aqkdwHaHa&pid=Api&P=0"
  );
  const [destination, dispatchDestination] = useReducer(
    destinationReducer.reducer,
    destinationReducer.initSate
  );
  const [tour, dispatchTour] = useReducer(
    tourReducer.reducer,
    tourReducer.initSate
  );
  const [blog, dispatchBlog] = useReducer(
    blogReducer.reducer,
    blogReducer.initSate
  );
  const [desinationTour, setDestinationsTour] = useState(null);
  const [tourDetination, setTourDestination] = useState("");
  const handleSetImage = (e) => {
    if (e.target.value !== "") {
      setImage(e.target.files[0]);
      const reader = new FileReader();    
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImageui(reader.result);
      };
    } else {
      setImageui(defaultimage);
    }
  };
  useEffect(() => {
    const getData = () => {
      switch (type) {
        case "destination":
          return setData([
            {
              lable: "Name",
              type: "text",
              placeholder: "Enter destination name...",
              state: {
                value: destination.name,
                handlers: (data) =>
                  dispatchDestination({
                    type: "setName",
                    payload: data,
                  }),
              },
            },

            {
              lable: "OpeningDate",
              type: "date",
              placeholder: "Enter destination OpeningDate...",
              state: {
                value: destination.openingDate,
                handlers: (data) =>
                  dispatchDestination({
                    type: "setDate",
                    payload: data,
                  }),
              },
            },
          ]);
        case "tour":
          return setData([
            {
              lable: "Title",
              type: "text",
              placeholder: "Enter tour title...",
              state: {
                value: tour.title,
                handlers: (data) =>
                  dispatchTour({
                    type: "setTitle",
                    payload: data,
                  }),
              },
            },
            {
              lable: "Price",
              type: "number",
              placeholder: "Enter tour price...",
              state: {
                value: tour.price,
                handlers: (data) =>
                  dispatchTour({
                    type: "setPrice",
                    payload: data,
                  }),
              },
            },
            {
              lable: "Level",
              type: "text",
              placeholder: "Enter tour level...",
              state: {
                value: tour.level,
                handlers: (data) =>
                  dispatchTour({
                    type: "setLevel",
                    payload: data,
                  }),
              },
            },
            {
              lable: "AvailableSlots",
              type: "number",
              placeholder: "Enter tour availableSlots...",
              state: {
                value: tour.availableSlots,
                handlers: (data) =>
                  dispatchTour({
                    type: "setAvailableSlots",
                    payload: data,
                  }),
              },
            },
            {
              lable: "Age",
              type: "number",
              placeholder: "Enter tour age...",
              state: {
                value: tour.age,
                handlers: (data) =>
                  dispatchTour({
                    type: "setAge",
                    payload: data,
                  }),
              },
            },
            {
              lable: "Rating",
              type: "number",
              placeholder: "Enter tour rating...",
              state: {
                value: tour.rating,
                handlers: (data) =>
                  dispatchTour({
                    type: "setRating",
                    payload: data,
                  }),
              },
            },
          ]);
        case "blog":
          return setData([
            {
              lable: "Title",
              type: "text",
              placeholder: "Enter blog title...",
              state: {
                value: blog.title,
                handlers: (data) =>
                  dispatchBlog({
                    type: "setTitle",
                    payload: data,
                  }),
              },
            },
            {
              lable: "Tags",
              type: "text",
              placeholder: "Enter blog tags...",
              state: {
                value: blog.tags,
                handlers: (data) =>
                  dispatchBlog({
                    type: "setTags",
                    payload: data,
                  }),
              },
            },
          ]);
        default:
          break;
      }
    };
    getData();
  }, [destination, tour, blog]);
  const editorRef = useRef(null);
  // const log = () => {
  //   if (editorRef.current) {
  //   }
  // };
  const handleApply = async () => {
    setisFetch({ ...isFetch, isLoading: true });
    switch (type) {
      case "destination":
        try {
          const result = await getUpCloudinary(
            `https://api.cloudinary.com/v1_1/${env.VITE_CLOUD_NAME}/image/upload`,
            image,
            `/destination/${convertToValidDirectoryName(destination.name)}`
          );
          if (result) {
            const res = await useFetchCreate(
              `${env.VITE_APP_SERVER_URL}/api/destination`,
              {
                ...destination,
                public_key_image: result.public_id,
                image: result.secure_url,
              }
            );
            setisFetch({
              isNotification: true,
              isLoading: false,
              message: `Create ${res?.name} success`,
              isSuccess: true,
            });
          } else {
            setisFetch({
              isNotification: true,
              isLoading: false,
              message: "Create fail!",
              isSuccess: false,
            });
          }
        } catch (error) {
          setisFetch({
            isNotification: true,
            isLoading: false,
            message: error,
            isSuccess: false,
          });
        }
        break;
      case "tour":
        try {
          const result = await getUpCloudinary(
            `https://api.cloudinary.com/v1_1/${env.VITE_CLOUD_NAME}/image/upload`,
            image,
            `/tour/${convertToValidDirectoryName(tour.title)}`
          );
          if (result) {
            const { content, imageUrls, public_id_cloud } = await processImages(
              editorRef.current.getContent(),
              `/tour/${tour.title}`
            );
            await useFetchCreate(`${env.VITE_APP_SERVER_URL}/api/tour`, {
              ...tour,
              destination:
                tourDetination === "" ? desinationTour[0] : tourDetination,
              content: content,
              public_id: public_id_cloud,
              image: result.secure_url,
              image_public_id: result.public_id,
              images: imageUrls,
            });
            setisFetch({
              isNotification: true,
              isLoading: false,
              message: `Create success`,
              isSuccess: true,
            });
          } else {
            setisFetch({
              isNotification: true,
              isLoading: false,
              message: "Create fail!",
              isSuccess: false,
            });
          }
        } catch (error) {
          setisFetch({
            isNotification: true,
            isLoading: false,
            message: error,
            isSuccess: false,
          });
        }
        break;
      case "blog":
        try {
          const result = await getUpCloudinary(
            `https://api.cloudinary.com/v1_1/${env.VITE_CLOUD_NAME}/image/upload`,
            image,
            `/blog/${convertToValidDirectoryName(blog.title)}`
          );
          if (result) {
            const { content, imageUrls, public_id_cloud } = await processImages(
              editorRef.current.getContent(),
              `/blog/${blog.title}`
            );
            await useFetchCreate(`${env.VITE_APP_SERVER_URL}/api/blog`, {
              ...blog,
              tags: blog.tags.split(' '),
              content: content,
              public_id: public_id_cloud,
              image: result.secure_url,
              image_public_id: result.public_id,
              images: imageUrls,
            });
            setisFetch({
              isNotification: true,
              isLoading: false,
              message: `Create success`,
              isSuccess: true,
            });
          } else {
            setisFetch({
              isNotification: true,
              isLoading: false,
              message: "Create fail!",
              isSuccess: false,
            });
          }
        } catch (error) {
          setisFetch({
            isNotification: true,
            isLoading: false,
            message: error,
            isSuccess: false,
          });
        }
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    const noficationTime = setTimeout(() => {
      isFetch.isNotification &&
        setisFetch({ ...isFetch, isNotification: false });
    }, 2000);
    return () => clearTimeout(noficationTime);
  }, [isFetch.isNotification]);

  const handleValidate = (e) => {
    e.target.value === "" &&
      (!validate.validateArray.filter((item) => item === e.target.name)[0]
        ? setValidate({
            isValidate: true,
            validateArray: [...validate.validateArray, e.target.name],
          })
        : setValidate({
            isValidate: true,
            validateArray: [...validate.validateArray],
          }));
  };

  const handleValidateKeyDown = (e) => {
    setValidate({
      isValidate: false,
      validateArray: validate.validateArray.filter(
        (item) => item !== e.target.name
      ),
    });
  };
  useEffect(() => {
    const getApply = () => {
      switch (type) {
        case "destination":
          destination.name === "" ||
          destination.description === "" ||
          destination.openingDate === "" ||
          image === null ||
          imageui === ""
            ? setIsApply(true)
            : setIsApply(false);
          break;
        case "tour":
          tour.title === "" ||
          tour.level === "" ||
          image === null ||
          imageui === ""
            ? setIsApply(true)
            : setIsApply(false);
          break;
        case "blog":
          blog.title === "" || image === null || imageui === ""
            ? setIsApply(true)
            : setIsApply(false);
          break;
        default:
          break;
      }
    };
    getApply();
  }, [destination, tour, blog, image, imageui]);

  useEffect(() => {
    const getDestinationOption = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/destination`
        );
        const data = await res.json();
        setDestinationsTour(data);
      } catch (error) {
        throw(error)
      }
    };
    getDestinationOption();
  }, []);
  const handleSetDescription = (e) => {
    switch (type) {
      case "destination":
        dispatchDestination({ type: "setDesc", payload: e.target.value });
        break;
      case "tour":
        dispatchTour({ type: "setDesc", payload: e.target.value });
      case "blog":
        dispatchBlog({ type: "setDesc", payload: e.target.value });
        break;
      default:
        break;
    }
  };
  return !data ? (
    <div className="center-element flex items-center justify-center h-screen">
      Loading....
    </div>
  ) : (
    <div className="">
      <div className="ml-[250px] px-4 ">
        <div className="text-black bg-white rounded-md mt-[70px] shadow-lg  flex justify-between items-center px-4">
          <div className="flex justify-center items-center gap-1 uppercase text-[15.75px]">
            <Link to={"/"} className="hover:underline">
              Page main{" "}
            </Link>
            <AiOutlineRight />{" "}
            <Link to={`/${type}s`} className=" py-2 hover:underline">
              {type}s
            </Link>
            <AiOutlineRight /> <div> ADD {type}</div>
          </div>
          <div className="text-[#1c2a59] font-[600] text-[21.75px] py-3 uppercase">
            Add new {type}
          </div>
        </div>
      </div>
      <div className="mt-[14px] ml-[250px] px-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-10 p-4 bg-white shadow-lg justify-center items-center">
            <div className="uppercase font-medium text-[24px]">{type}</div>
            <form className="w-fit p-4 border border-blue-950 flex flex-col gap-4 rounded-md">
              <div className="flex gap-2">
                <label htmlFor="image" className="min-w-[120px]">
                  ChooseImage:
                </label>
                <input type="file" onChange={(e) => handleSetImage(e)} />
              </div>
              {type === "tour" && (
                <div className="flex gap-2">
                  <label htmlFor=" destination" className="min-w-[120px]">
                    Choose destination:
                  </label>
                  <select
                    name="destination"
                    id="destination"
                    className="w-1/2 border border-slate-500 rounded-sm px-2 py-1"
                    onChange={(e) => setTourDestination(e.target.value)}
                  >
                    {desinationTour?.map((item) => (
                      <option value={item.name} className="" key={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {data.map((item, index) => (
                <div className="flex gap-2" key={index}>
                  <label htmlFor={item.lable} className="min-w-[120px]">
                    {item.lable}:
                  </label>
                  <input
                    type={item.type}
                    placeholder={item.placeholder}
                    onChange={(e) => item.state.handlers(e.target.value)}
                    className={`focus-visible:outline-blue-500 focus-visible:outline flex-1 py-1 px-2 rounded-sm border border-slate-400 ${
                      validate.isValidate
                        ? validate.validateArray.filter(
                            (validate) => validate === item.lable
                          )[0]
                          ? "outline outline-red-500"
                          : "outline-none"
                        : ""
                    }`}
                    spellCheck={false}
                    name={`${item.lable}`}
                    onBlur={(e) => handleValidate(e)}
                    onKeyDown={(e) => handleValidateKeyDown(e)}
                  />
                </div>
              ))}
              <div className="flex gap-2">
                <label htmlFor=" destination" className="min-w-[120px]">
                  Description:
                </label>
                <textarea
                  name="Decription"
                  id=""
                  rows="10"
                  className="w-full p-2 focus-visible:outline-blue-500 border border-slate-400 rounded-sm"
                  placeholder="Enter your description..."
                  onChange={handleSetDescription}
                ></textarea>
              </div>
            </form>
          </div>
          <div className="h-[500px] bg-white flex items-center justify-center shadow-lg">
            <img
              src={imageui}
              alt="image"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-white py-4 shadow-lg my-4">
          {type !== "destination" && (
            <Editor
              apiKey="v46bp1jobw1ix6zsno3lj1ve6iofsahu846pzrvkadndep24"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue="<p>This is the initial content of the editor.</p>"
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
          )}
          <button
            className={` duration-200 p-2 px-4 text-white rounded-md w-fit self-center ${
              !isApply
                ? "bg-blue-950  hover:bg-blue-500 active:scale-90 hover:scale-105"
                : "bg-slate-500/50 hover:cursor-no-drop"
            }`}
            onClick={handleApply}
            disabled={isApply ? true : false}
          >
            Apply
          </button>
        </div>
      </div>

      <div className="ml-[250px] mt-[16px]">
        <Footer />
      </div>
      {isFetch.isLoading && (
        <div className="flex items-center justify-center fixed inset-0 bg-slate-950/50 z-[60]">
          <Loading heading="Creating... " />
        </div>
      )}
      {isFetch.isNotification &&
        (isFetch.isSuccess ? (
          <Notification heading={isFetch.message} type="success" />
        ) : (
          <Notification heading={isFetch.message} type="fail" />
        ))}
    </div>
  );
}

export default New;
