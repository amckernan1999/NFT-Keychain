
import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import '../styles.css';
import API from "../API_Interface/API_Interface";
import Modal from '../Modal';
import axios from 'axios';

function Collections({Logout, SelectDevice, Transfer, error, userID}) {
    const AxiosConfiguration = () => {
        // axios.defaults.baseURL = `http://localhost:3001`; // this sets axios default for both servers, we don't want that
        axios.defaults.withCredentials = false;
        return axios;
    };
    const axiosAgent2 = AxiosConfiguration();

    // calls the web scraper
    const add_nft = () => {
        let url = "https://foundation.app/@spasi___sohrani/GPSG/15" // url input from add nft button goes here
        url = url.replaceAll('/', '%2F');
    
        axiosAgent2.get(`http://localhost:3001/web_scraper/${url}`)
            .then(nft => nft.data) // this should be the nft title
            .catch(error => (console.log(error)));
    }
    add_nft();



    console.log('collection userID:', userID);

    const [isOpen, setIsOpen] = React.useState(false);
    const [collection,setCollection] = useState([]);

    const submitHandler = e => {
        e.preventDefault();
        Logout();
    };

    const renderGetKeyButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    onClick={() => {
                        navigator.clipboard.writeText("Hello").then(r => {console.log('Copied key to clipboard: ', "hello");});
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


    useEffect(() => {
        const api = new API();
        async function getUserNfts() {
            const collectionJSONString = await api.getUserNfts(userID);
            setCollection(collectionJSONString);
            console.log(collectionJSONString);
        }
        getUserNfts();
    }, []);




    return (
        <div style={{height: '100%', width: '100%'}}>
            <Box display="flex" justifyContent="space-evenly" flexDirection="row" alignItems="center" width="100%" mt={2} top={"0"} position={"absolute"}>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => setIsOpen(true)}
                >ADD NFT
                </Button>
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
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
                >SETTINGS
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