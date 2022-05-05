
import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import '../styles.css';
import API from "../API_Interface/API_Interface";
import Modal from '../Modal';
import axios from 'axios';



// importing all of the images the web scraper has pulled
function importAll(r) {
    let image_files = {};
    r.keys().map((item, index) => { image_files[item.replace('./', '')] = r(item); });
    console.log('len:', Object.keys(image_files).length);
    return image_files;
}
const image_files = importAll(require.context('../web_scraper/images', false, /\.(png)$/));
console.log('len:', Object.keys(image_files).length);
console.log(image_files);
// console.log(image_files['123.png']);



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


        let resized_image_path = nft_title + ".png";
        // let resized_image_path = '/' + nft_title + '.png';


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


    console.log('collection userID:', userID);

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



    // <img src={process.env.PUBLIC_URL + params}
    // <img src={process.env.PUBLIC_URL + '/images/1.png'}
    // <img src={image_files[params]}
    // <img src={image_files['1.png']}
    
    const g = "51.png";

    console.log('this', collection);
    console.log('end');
    console.log('that', image_files, image_files['11.png']);
    console.log('end that');

    const columns = [
        {field: 'id', hide: true, width: '50', disableClickEventBubbling: true,},
        {field: 'path', headerName: 'NFT', headerAlign: 'center', width: 240, height: 240, disableColumnFilter: true, disableClickEventBubbling: true,
            renderCell: (params)=>{
                console.log('\nimage files', image_files, '\nparams', params,'\nimage files[paramms]', image_files[params.row], 'asdfa', '\nparams.row.path', params.row.path);
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