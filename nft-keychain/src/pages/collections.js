import React, {Fragment} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Typography from "@mui/material/Typography";

function Collections({Logout, SelectDevice, Transfer, error, userID}) {
    console.log('collection userID:', userID);

    const submitHandler = e => {
        e.preventDefault();
        Logout();
    }

    const columns = [
        {field: 'id', headerName: 'ID', width: 90},
        {
            field: 'nftTitle',
            headerName: 'Title',
            width: 300,
        },
        {
            field: 'nftUrl',
            headerName: 'URL',
            width: 1400,
        },
    ];

    // Placeholder data to be replaced with actual data from the database
    const rows = [
        {
            id: 1,
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftUrl: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id: 2,
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftUrl: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id: 3,
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftUrl: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id: 4,
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftUrl: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id: 5,
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftUrl: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id: 6,
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftUrl: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id: 7,
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftUrl: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id: 8,
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftUrl: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id: 9,
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftUrl: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id: 10,
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftUrl: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id: 11,
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftUrl: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id: 12,
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftUrl: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id: 13,
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftUrl: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id: 14,
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftUrl: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id: 15,
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftUrl: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
    ];

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
                    onClick={SelectDevice}
                >SELECT USB
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
                rows={rows}
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