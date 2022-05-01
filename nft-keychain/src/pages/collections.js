import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import '../styles.css';
import Modal from '../Modal';

function Collections({Logout, SelectDevice, Transfer, error, userID}) {
    console.log('collection userID:', userID);

    const [isOpen, setIsOpen] = React.useState(false);

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
                        navigator.clipboard.writeText(params.row.nftKey).then(r => {console.log('Copied key to clipboard: ', params.row.nftKey);});
                    }}
                >GET KEY
                </Button>
            </strong>
        )
    }

    const columns = [
        {field: 'id', headerName: '', width: '50', disableClickEventBubbling: true,},
        {field: 'image', headerName: '', width: 240, height: 240, disableColumnFilter: true, disableClickEventBubbling: true,
            renderCell: (params)=>{
                return (
                    <div>
                        <img src={params.value} alt="nft" className="nft" />
                    </div>
                )}
            },
        {
            field: 'nftTitle',
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

    // Placeholder data to be replaced with actual data from the database
    const rows = [
        {
            id:1,
            image: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600',
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftKey: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id:2,
            image: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600',
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftKey: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id:3,
            image: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600',
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftKey: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id:4,
            image: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600',
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftKey: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id:5,
            image: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600',
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftKey: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id:6,
            image: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600',
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftKey: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id:7,
            image: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600',
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftKey: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id:8,
            image: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600',
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftKey: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id:9,
            image: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600',
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftKey: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id:10,
            image: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600',
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftKey: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id:11,
            image: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600',
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftKey: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id:12,
            image: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600',
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftKey: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id:13,
            image: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600',
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftKey: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id:14,
            image: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600',
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftKey: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
        },
        {
            id:15,
            image: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600',
            nftTitle: 'Bored Ape Yacht Club #5465',
            nftKey: 'https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w600'
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
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                </Modal>
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
            <div style={{height: "91%", width: "100%", display: 'flex'}}>
                <div style={{flexGrow: '1'}}>
                    <DataGrid
                        sx={{mt: '4.3%'}}
                        rowHeight={240}
                        rows={rows}
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