import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import '../styles.css';
import API from "../API_Interface/API_Interface";
import Modal from '../Modal';

function Collections({Logout, SelectDevice, Transfer, Retrieve, userID}) {

    const submitHandler = () =>{
        console.log("submit");
    }
    console.log('collection userID:', userID);

    const [isOpen, setIsOpen] = React.useState(false);
    const [collection,setCollection] = useState([]);
    const [nftDetails,setNftDetails ]= useState({title:'',url:'',key:''});


    useEffect(() => {
        const api = new API();
        async function getUserNfts() {
            const collectionJSONString = await api.getUserNfts(userID);
            setCollection(collectionJSONString);
            console.log(collectionJSONString);
        }
        getUserNfts();
    }, []);

    useEffect( () => {
        const api = new API();
        async function putUserNfts() {
            await api.putUserNfts(nftDetails.url,nftDetails.title,nftDetails.url,userID);
            console.log(nftDetails.url,nftDetails.title,nftDetails.url,userID);
        }
        putUserNfts();

    }, []);

    const renderGetKeyButton =  (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    onClick={async () => {
                        const key = await Retrieve();
                        navigator.clipboard.writeText(key).then(r => {
                            console.log('Copied key to clipboard: ', key);
                        });
                    }}
                >GET KEY
                </Button>
            </strong>
        )
    }

    const columns = [
        {field: 'id', headerName: '', width: '50', disableClickEventBubbling: true,},
        {field: 'url', headerName: '', width: 240, height: 240, disableColumnFilter: true, disableClickEventBubbling: true,
            renderCell: (params)=>{
                return (
                    <div>
                        <img src={params.value} alt="nft" className="nft" />
                    </div>
                )}
            },
        {
            field: 'title',
            headerName: 'Title',
            headerAlign: 'center',
            width: 300,
            disableClickEventBubbling: true,

        },
        {
            field: 'path',
            headerName: 'Link',
            headerAlign: 'center',
            width: 300,
            disableClickEventBubbling: true,
            renderCell: (params)=>{

                return (
                     <a href={"http://google.com"}>Link to Collection</a>

                )}

        },
        {
            field: 'nftKey',
            headerName: 'Key',
            width: 100,
            headerAlign: 'center',
            align: 'center',
            disableColumnFilter: true,
            disableClickEventBubbling: true,
            renderCell: renderGetKeyButton,
        },
    ];




    return (
        <div style={{height: '100%', width: '100%'}}>
            <Box display="flex" justifyContent="space-evenly" flexDirection="row" alignItems="center" width="100%" mt={2} top={"0"} position={"absolute"}>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => setIsOpen(true)}
                >ADD NFT
                </Button>
                <Modal open={isOpen} onClose={() => setIsOpen(false)} nftDetails={nftDetails} setNftDetails={setNftDetails} submitHandler={submitHandler}>
                </Modal>
                <Button
                    variant="contained"
                    size="large"
                    onClick={Transfer}
                >TRANSFER
                </Button>
                <Button
                    variant="contained"
                    size="large"
                    onClick={Logout}
                >LOGOUT
                </Button>
            </Box>
            <div style={{height: "91%", width: "100%", display: 'flex'}}>
                <div style={{flexGrow: '1'}}>
                    <DataGrid
                        sx={{mt: '4.3%'}}
                        rowHeight={240}
                        rows={collection}
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        columns={columns}
                        autoHeight={false}
                        headerHeight={35}
                        checkboxSelection
                        disableSelectionOnClick
                        pagination={true}
                    />
                </div>
            </div>
        </div>
    );
}
export default Collections;