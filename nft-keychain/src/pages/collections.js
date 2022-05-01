import React, {Fragment, useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Typography from "@mui/material/Typography";
import API from "../API_Interface/API_Interface";





function Collections({Logout, SelectDevice, Transfer, error, userID}) {

    const [collection,setCollection] = useState([]);


    const submitHandler = e => {
        e.preventDefault();
        Logout();
    }

    const getKeyButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                        console.log(params.row.col6);
                    }}
                >
                    Get Key
                </Button>
            </strong>
        )
    }

    const columns = [
        {field: 'id', headerName: 'ID', width: 90},
        {
            field: 'title',
            headerName: 'Title',
            width: 300,
        },
        {
            field: 'url',
            headerName: 'URL',
            width: 300,
        },
        {   field:"lol",
            type: "buttons",
            buttons: [{
                name: "save",
                cssClass: "my-class"
            }],
        }
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
        <Fragment>
            <Box display="flex" justifyContent="space-evenly" flexDirection="row" alignItems="center" width="100%" mt={2} top={"0"} position={"absolute"}>
                <Button
                    variant="contained"
                    size="large"
                >ADD NFT
                </Button>
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
            <DataGrid

                rows={collection}
                columns={columns}
                pageSize={10}
                autoHeight={true}
                checkboxSelection
                disableSelectionOnClick
            />
        </Fragment>
    );
}
export default Collections;