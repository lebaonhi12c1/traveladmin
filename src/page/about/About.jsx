import React from 'react';
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { useState } from 'react';
import Loading from '../../components/Loading';
import Notification from '../../components/Notification';
import { processImages } from "../../cloudinary";
import { useEffect } from 'react';
function About(props) {
    const [respone,setRespone] = useState({
        loading: false,
        notification: false,
        message: ''
    })
    const [about,setAbout] = useState(null)
    const editorRef = useRef()
    const handleSubmit = async()=>{
        setRespone({...respone,loading: true})
        try {
            const { content} = await processImages(
                editorRef.current.getContent(),
                `/about}`
              );
            const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/about`,{
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content,
                    access_token: JSON.parse(localStorage.getItem("user")).access_token,
                })
            })
            setRespone({loading: false,message: 'Success!',notification: true})
        } catch (error) {
            setRespone({loading: false,message: error.toString(),notification: true})
            throw Error(error)
        }
    }
    const getAbout = async()=>{
        try {
            const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/about`)
            const data = await res.json()
            setAbout(data)
        } catch (error) {
            throw new Error(error)
        }
    }
    useEffect(()=>{
        getAbout()
    },[])
    useEffect(()=>{
        const timeout = setTimeout(() => {
            respone.notification && setRespone({...respone,notification: false})
        }, 2000);
        return ()=>clearTimeout(timeout)
    },[respone.notification])
    return (
        <div className='center-element'>
            <div className='p-4 flex flex-col items-center gap-4'>
                <div className='w-full'>
                    <Editor
                        apiKey="v46bp1jobw1ix6zsno3lj1ve6iofsahu846pzrvkadndep24"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={about ? about.content : '<p>Type your content</p>'}
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
                <button className='py-2 px-4 hover:scale-105 active:scale-90 duration-150 rounded-sm bg-blue-900 text-white w-fit' onClick={handleSubmit}>Apply</button>
            </div>
            {respone.loading && <div className="flex items-center justify-center fixed inset-0 bg-black/20 z-[60]"><Loading heading={'Creating...'}/></div>}
            {respone.notification && (<Notification heading={respone.message} type={'success'}/>)}
        </div>
    );
}

export default About;