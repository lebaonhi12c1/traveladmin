import { useEffect } from "react";

const useFetchCreate =async (url,data)=>{
    const res = await fetch(
        url,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              ...data,
              "access_token":JSON.parse(localStorage.getItem('user')).access_token
            }
          ),
        }
      );
      return res.json()
}
const useFetchGetAll = async (url)=>{
  const res = await fetch(url)
  return res.json()
}


const useFetchDelete = async(url,handler)=>{
  handler((pre)=>({...pre,isLoading: true}))
  try {
    const res = await fetch(url,{
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                access_token: JSON.parse(localStorage.getItem('user')).access_token
            }
        )
    })
    const feedback = await res.json()
    handler({message: feedback.message, success: true,isLoading: false,isNotification: true})
    window.location.reload(true)
   } catch (error) {
    handler({message: error, success: false,isLoading: false,isNotification: true})
   }
}

const useCloseNofication = (value,handler)=>{
  useEffect(() => {
    const noficationTime = setTimeout(() => {
      value &&
        handler(pre=>({...pre,isNotification: false}));
    }, 2000);
    return () => clearTimeout(noficationTime);
  }, [value]);
}

const convertToValidDirectoryName = (dirName)=> {
  // Loại bỏ các ký tự không phù hợp
  const validDirName = dirName.replace(/[^\w\-]+/g, '_');

  // Chuyển tất cả các ký tự in hoa thành ký tự thường
  return validDirName.toLowerCase();
}

// Sử dụng hàm convertToValidDirectoryName() để đổi tên thư mục không hợp lệ thành tên hợp lệ
// const invalidDirName = 'My Directory !';
// const validDirName = convertToValidDirectoryName(invalidDirName);


export {useFetchCreate,useFetchGetAll, useFetchDelete,useCloseNofication,convertToValidDirectoryName}