import React, {useState, useEffect, Fragment} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Collections from '../pages/collections'
import Settings from '../pages/settings'
import Button from "@mui/material/Button";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open' })(
    ({theme, open}) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    })
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

// const TopBar = ({open, handleDrawerOpen, title, collectionsButton, settingsButton, logoutAction}) => {
//     // This component is responsible for rendering the Toolbar that is drawn
//     // at the top of the drawer.

//     return (
//         <Fragment>
//             <AppBar position="fixed" open={open} >
//                 <Toolbar>
//                     {/* <IconButton
//                         color="inherit"
//                         aria-label="open drawer"
//                         onClick={handleDrawerOpen}
//                         edge="start"
//                         sx={{ mr: 2, ...(open && { display: 'none' }) }}
//                     >
//                         <MenuIcon />
//                     </IconButton> */}
//                     <Box justifyContent="center" flex={0.5} component="span">
//                         <Typography variant="h6" noWrap component="div" align="center">
//                             {title}
//                         </Typography>
//                     </Box>
//                     <Box justifyContent="center" flex={0.25} component="span" sx={{ p: 1, border: 1 }}>
//                         <Typography variant="h6" noWrap component="div" align="center">
//                             {collectionsButton}
//                         </Typography>
//                     </Box>
//                     <Box justifyContent="center" flex={0.25} component="span" sx={{p: 1, border: 1 }}>
//                         <Typography variant="h6" noWrap component="div" align="center">
//                             {settingsButton}
//                         </Typography>
//                     </Box>
//                     <Box justifyContent="right" flex={0.25}>
//                         <Typography variant="h7" noWrap component="div" align="right" onClick={() => logoutAction()}>
//                             Logout
//                         </Typography>
//                     </Box>

//                 </Toolbar>
//             </AppBar>
//         </Fragment>
//     )
// };

const PresentationListItems = (props) => {
    return <div>
        {
            props.menuItemTitles.map(title =>
                <ListItem button onClick={() => props.onClick(title)} key={title}>
                    <ListItemText primary={title} key={title}/>
                    {
                        props.selectedItem === title && <ListItemIcon><ChevronRightIcon/></ListItemIcon>
                    }
                </ListItem>
            )
        }
    </div>;
};

const ContainerListItems = (props) => {
    return  <div>
        {
            props.menuItemTitles.map(title =>
                <ListItem button onClick={() => props.onClick(title)} key={title}>
                    <ListItemText primary={title} key={title}/>
                    {
                        props.selectedItem === title && <ListItemIcon><ChevronRightIcon/></ListItemIcon>
                    }
                </ListItem>
            )
        }
    </div>
};

// const findSelectedComponent = (selectedItem) => {
//     const component = [...presentationComponents(),
//                         ...containerComponents()].filter(comp => comp.title === selectedItem);
//     if(component.length === 1)
//         return component[0];

//     console.log("In findSelectedComponent of MakeEligible. Didn't find the component that corresponds to the menu item.")
//     return {
//         title: null,
//         component: null
//     }
// };


export default function MainDrawer({mainPageTitle, collectionsButton, settingsButton, logoutAction}) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [menuSelection, setMenuSelection] = useState('Collections')
    const menuSelect = (menu) => {
        if (menu === "Collections") {
            return <Collections />
        } else if (menu === "Settings") {
            return <Settings />
        }
        else {
            console.log('error selecting menu');
        }
    }

    console.log('in MainDrawer');

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };



    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Fragment>
                <AppBar position="fixed" open={open} >
                    <Toolbar>
                        {/* <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton> */}
                        <Box justifyContent="right" flex={1}>
                            <Typography variant="h6" noWrap component="div" align="left">
                                {mainPageTitle}
                            </Typography>
                        </Box>
                        <Box justifyContent="right" flex={1}>
                            <Typography variant="h7" noWrap component="div" align="right" onClick={() => logoutAction()}>
                                Logout
                            </Typography>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Fragment>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {/* <List>
                    <PresentationListItems selectedItem={selectedItem}
                                           onClick={handleSelectedItem}
                                           menuItemTitles={presentationComponents().map(comp => comp.title)}
                    />
                </List>
                <Divider />
                <List>
                   <ContainerListItems  selectedItem={selectedItem}
                                        onClick={handleSelectedItem}
                                        menuItemTitles={containerComponents().map(comp => comp.title)}
                   />
                </List> */}
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {/* {findSelectedComponent(selectedItem).component} */}
                {menuSelect(menuSelection)}
            </Main>
        </Box>
    );
}