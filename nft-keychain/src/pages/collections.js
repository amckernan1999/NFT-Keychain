
import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import '../styles.css';
import API from "../API_Interface/API_Interface";
import Modal from '../Modal';
import axios from 'axios';

function Collections({Logout, SelectDevice, Transfer, error, userID}) {
    const [nftDetails,setNftDetails ]= useState({title:'',url:'',key:''});

    const AxiosConfiguration = () => {
        // axios.defaults.baseURL = `http://localhost:3001`; // this sets axios default for both servers, we don't want that
        axios.defaults.withCredentials = false;
        return axios;
    };
    const axiosAgent2 = AxiosConfiguration();

    // calls the web scraper
    const add_nft = (nft_url, nft_title, nft_key) => {
        let url = "https://foundation.app/@spasi___sohrani/GPSG/15" // url input from add nft button goes here
        url = nft_url.replaceAll('/', '%2F');
        let resized_image_path = '../web_scraper/images/'+nft_title+'.png'
        resized_image_path = resized_image_path.replaceAll('/', '%2F');

        console.log('add_nft:', nft_title, nft_url, nft_key, resized_image_path);
        console.log('url:', url);
    
        axiosAgent2.get(`http://localhost:3001/web_scraper/${url}/${nft_title}`)

        // do something security related with the key here i supposed

        const api = new API();
        async function putUserNft() {
          api.putUserNft(url, nft_title, resized_image_path, userID)
              .then( () => {
                console.log('nft titled', nft_title, 'added to users collection');
                // maybe can add some error checking later
              });
        }
        putUserNft();
    }

    // const api = new API();
    // async function getUserNfts() {
    //     const collectionJSONString = await api.getUserNfts(userID);
    //     setCollection(collectionJSONString);
    //     console.log(collectionJSONString);
    // }
    // getUserNfts();


    console.log('collection userID:', userID);

    const [isOpen, setIsOpen] = useState(false);
    const [collection, setCollection] = useState([]);

    const submitHandler = e => {
        e.preventDefault();
        Logout();
    };

    const renderGetKeyButton = () => {
        return (
            <strong>
                <Button
                    className='button'
                    onClick={() => {
                        navigator.clipboard.writeText("Hello").then(r => {console.log('Copied key to clipboard: ', "hello");});
                    }}
                >GET KEY
                </Button>
            </strong>
        )
    }

    const columns = [
        {field: 'id', hide: true, width: '50', disableClickEventBubbling: true,},
        {field: 'url', headerName: 'NFT', headerAlign: 'center', width: 240, height: 240, disableColumnFilter: true, disableClickEventBubbling: true,
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
            align: 'center',
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
        <div className='container'>
            <Box display="flex" justifyContent="space-evenly" flexDirection="row" alignItems="center" width="100%" mt={2} top={"0"} position={"absolute"}>
                <Button
                    className='button'
                    variant="contained"
                    size="large"
                    onClick={() => setIsOpen(true)}
                >ADD NFT
                </Button>
                <Modal open={isOpen} onClose={() => setIsOpen(false)} nftDetails={nftDetails} setNftDetails={setNftDetails} submitHandler={submitHandler} add_nft={add_nft}>
                </Modal>
                <Button
                    className='button'
                    variant="contained"
                    size="large"
                    onClick={Transfer}
                >TRANSFER
                </Button>
                <Button
                    className='button'
                    variant="contained"
                    size="large"
                >DELETE
                </Button>
                <Button
                    className='button'
                    variant="contained"
                    size="large"
                    onClick={Logout}
                >LOGOUT
                </Button>
            </Box>
            <div style={{height: '91%', width: '100%', display: 'flex'}}>
                <div style={{flexGrow: '1'}}>
                    <DataGrid
                        style={{backgroundColor: '#9eadbc', borderColor: '#000000'}}
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