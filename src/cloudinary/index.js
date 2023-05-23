import defautlimage from '../assets/th.jpg'
const getDataCloudinary = (image,folder)=>{
    const data = new FormData()
    if(image){
        
        data.append('file',image)
        data.append('upload_preset',"demo_upload")
        // data.append('cloud_name',import.meta.env.VITE_CLOUD_NAME)
        data.append('folder',folder)
        return data
    }
    data.append('file',defautlimage)
    data.append('upload_preset',"demo_upload")
    // data.append('cloud_name',import.meta.env.VITE_CLOUD_NAME)
    data.append('folder',folder)
    return data
    
}
const getUpCloudinary = async(url,image,folder)=>{
    const data = getDataCloudinary(image,folder)
    // console.log(data)

    const res = await fetch(url,{
        method: 'POST',
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        //     // "Access-Control-Allow-Origin":"*",
        // }
        // ,
        body: data
    })
    const result = await res.json()
    return result
}
async function processImages(content,folder_url) {
    const images = content.match(/<img.*?src="(.*?)"/g);
  
    let imageUrls = [];
    // let arrayCloud = [];
    // let newContent=""
    let public_id_cloud=[]
    try{

        if (images) {

        for (let i = 0; i < images.length; i++) {
            const imgUrl = images[i].match(/src="(.*?)"/)[1];
            // console.log(imgUrl)
            // console.log(imgUrl)
            const result = await  getUpCloudinary(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
                imgUrl,
            `/${folder_url}`
            )
    //         console.log(imgUrl)
    //         const data = new FormData()
    //         data.append('file',defautlimage)
    //         data.append('upload_preset',"demo_upload")
    // // data.append('cloud_name',import.meta.env.VITE_CLOUD_NAME)
    //         data.append('folder',folder_url)
    //         const resutl = await fetch( `https://api.cloudinary.com/v1_1/${env.VITE_CLOUD_NAME}/image/upload`,{
    //             method: 'POST',
    //             // headers: {
    //             //     'Content-Type': 'multipart/form-data',
    //             //     // "Access-Control-Allow-Origin":"*",
    //             // }
    //             // ,
    //             body: data
    //         })


            const newImgUrl = result.secure_url; // Lấy đường dẫn của ảnh từ Cloudinary
            // console.log(content)
            content = content.replace(imgUrl, newImgUrl); // Thay đổi đường dẫn của ảnh trong nội dung
            // console.log("===========")
            // console.log(newContent)

            // content = newContent; // Cập nhật nội dung mới
            // console.log("---------------------")
            // console.log(content)
            // arrayCloud.push(result)
            public_id_cloud.push(result.public_id)
            imageUrls.push(newImgUrl); // Thêm đường dẫn của ảnh mới vào mảng
        }
        // console.log("---------------------")
        //     console.log(newContent)

        // Trả về nội dung mới và mảng đường dẫn ảnh
    }
    return { content, imageUrls ,public_id_cloud}; 
    }catch(err){
        return { content, imageUrls ,public_id_cloud}
    }
}


export {getUpCloudinary,processImages}