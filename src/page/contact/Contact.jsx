import React, { useCallback, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Dinalog from '../../components/Dinalog';
import UpdateContactModal from '../../components/UpdateContactModal';
import Loading from '../../components/Loading';
import Notification from '../../components/Notification';
const col = [
    { field: "id", headerName: "ID", width: 150 },
    {
        field: "name",
        headerName: "Name",
        width: 180,
        editable: true,
    },
    {
        field: "email",
        headerName: 'Email',
        width: 180,
        editable: true,
    },
    {
        field: "subject",
        headerName: "Subject",
        width: 180,
        editable: true,
    },
    {
        field: "message",
        headerName: "Message",
        width: 180,
        editable: true,
    },
    {
        field: "status",
        headerName: "Status",
        width: 180,
        editable: true,
    },
]
const row = [
    {
        id: '1',
        name: 'name',
        email: 'email',
        subject: 'subject',
        message: 'message',
        status: 'noprocess',
        _id: '34543fdgfdgh'
    },

]

function Contact(props) {
    const [dialog, setDialog] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [updateModal, setUpdateModal] = useState(false)
    const [updateValue, setUpdateValue] = useState(null)
    const [contacs, setContacts] = useState(null)
    const [respone,setRespone] = useState({
        loading: false,
        notificatoin: false,
        message: '',
        success: false,
    })
    const getContact = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/contact`)
            const data = await res.json()
            setContacts(data.map(item => ({ ...item, id: item._id })))
        } catch (error) {
            throw error
        }
    }
    useEffect(() => {
        getContact()
    }, [])
    const getAction = () => {
        return {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => (
                <div className=" flex items-center justify-center gap-2">
                    <div
                        className="py-1 px-2 bg-blue-500 text-white rounded-sm hover:scale-105 active:scale-90 duration-150 cursor-pointer"
                        onClick={() => handleOpenModalUpdate(params.row)}
                    >
                        Update
                    </div>
                    <div
                        className="py-1 px-2 bg-red-500 text-white rounded-sm hover:scale-105 active:scale-90 duration-150 cursor-pointer"
                        onClick={() => handleOpenDialog(params.row._id)}
                    >
                        Delete
                    </div>
                </div>
            ),
        };
    };
    const handleUpdate = useCallback(async () => {
        setUpdateModal(false)
        setRespone({...respone,loading: true})
        try {
            const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/contact/update`,{
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateValue)
            })
            const feedback = await res.json()
            feedback.success ? setRespone({loading: false,notificatoin:true,message: feedback.message,success: true}) : setRespone({loading: false,notificatoin:true,message: feedback.message, success: false})
            getContact()
        } catch (error) {
            setRespone({loading: false,notificatoin:true,message: error.toString(), success: false})
        }
    }, [updateValue])
    const handleOpenModalUpdate = value => {
        setUpdateModal(true)
        setUpdateValue(value)
    }
    const handleOpenDialog = id => {
        setDialog(true)
        setDeleteId(id)
    }
    const handleDeleteContact = useCallback(async () => {
        setDialog(false)
        try {
            const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/contact/${deleteId}`,{
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const feedback = await res.json()
            feedback.success ? setRespone({loading: false,notificatoin:true,message: feedback.message,success: true}) : setRespone({loading: false,notificatoin:true,message: feedback.message, success: false})
            getContact()
        } catch (error) {
            setRespone({loading: false,notificatoin:true,message: error.toString(), success: false})
        }
    }, [deleteId])
    useEffect(()=>{
        const time = setTimeout(() => {
            respone.notificatoin && setRespone({...respone,notificatoin: false})
        }, 2000);
        return ()=>clearTimeout(time)
    },[respone.notificatoin])
    return (
        <div className='center-element p-4'>
            <div className='bg-white'>
                <Box style={{ height: 426, width: "100%" }}>
                    {contacs &&
                        (
                            <DataGrid
                                rows={contacs}
                                columns={[...col, getAction()]}
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
                        )
                    }
                </Box>
            </div>
            {dialog && <Dinalog heading={'Are your sure to delete this contact?'} handleAccept={handleDeleteContact} handleOff={() => setDialog(false)} />}
            <UpdateContactModal
                isopen={updateModal}
                value={updateValue}
                handleOff={() => setUpdateModal(false)}
                handleUpdate={handleUpdate}
                handleSetValueUpdate={setUpdateValue}
            />
             {respone.loading && <div className="flex items-center justify-center fixed inset-0 bg-black/20 z-[60]"><Loading heading={'Updating...'}/></div>}
             {respone.notificatoin && (<Notification heading={respone.message} type={'success'}/>)}
        </div>
    );
}

export default Contact;