
import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import '../styles.css';
import API from "../API_Interface/API_Interface";
import Modal from '../Modal';
import axios from 'axios';
import * as crypto from 'crypto-js';



// importing all of the images the web scraper has pulled
function importAll(r) {
    let image_files = {};
    r.keys().map((item, index) => { image_files[item.replace('./', '')] = r(item); });
    return image_files;
}
const image_files = importAll(require.context('../../public/images', false, /\.(png)$/));



function Collections({Logout, SelectDevice, Transfer, error, userID, user}) {
    const [nftDetails, setNftDetails]= useState({title:'',url:'',key:''});
    console.log('collection starts with user set as:', user);
    console.log('nft details:', nftDetails);

    const AxiosConfiguration = () => {
        axios.defaults.withCredentials = false;
        return axios;
    };
    const axiosAgent2 = AxiosConfiguration();

    // calls the web scraper
    const add_nft = (nft_url, nft_title, nft_key) => {
        let url = nft_url.replaceAll('/', '%2F');
        let resized_image_path = nft_title + ".png";
        resized_image_path = resized_image_path.replaceAll('/', '%2F');
    
        axiosAgent2.get(`http://localhost:3001/web_scraper/${url}/${nft_title}`)



// this is the security stuff that should be added on transfer
        let nft_key_to_device = crypto.AES.encrypt(nft_key, user.password); 
        // nft_key_ciphertext.toString() is sent to device
        console.log('this should be stored on device:', nft_key_to_device.toString());

// this is the security stuff that should be added on get key
        let nft_key_from_device = crypto.AES.decrypt(nft_key_to_device, user.password); 
        // _nft_key_ciphertext is restored from device.
        // change the first variable, nft_key_ciphertext.toString(), to whatever you get back from the device
        // _nft_key_ciphertext.toString(crypto.enc.Utf8) is shown to user as their key
        console.log('nft key:', nft_key_from_device.toString(crypto.enc.Utf8));


        

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

    const [isOpen, setIsOpen] = useState(false);
    const [collection, setCollection] = useState([], {});

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
        {field: 'path', headerName: 'NFT', headerAlign: 'center', width: 240, height: 240, disableColumnFilter: true, disableClickEventBubbling: true,
            renderCell: (params)=>{
                return (
                    <div>
                        <img src={process.env.PUBLIC_URL + '/images/' + params.row.path} alt="nft" className="nft" />
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
            // console.log(collectionJSONString);
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