'use client'

import * as React from 'react';
import {useRouter} from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface Props {
    window?: () => Window;
    highlightClassification?: boolean;
    setHighlightClassification?: React.Dispatch<React.SetStateAction<boolean>>;
    classificationButtonRef?: React.RefObject<HTMLButtonElement>;
}

const drawerWidth = 240;
// const navItems = ['Home', 'Classification', 'Chat', 'About', 'Help', 'Contact'];
const navItems = ['首页', '分类检测', '知识问答', '关于项目', '获取帮助', '联系我们'];

export default function NavBar(props: Props) {
    const {window, highlightClassification = false, setHighlightClassification, classificationButtonRef} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const router = useRouter();

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (path: string) => {
        if (path === '首页') {
            router.push('/');
        } else if (path === '获取帮助') {
            router.push('https://github.com/Jun-Amane/AgriSageLite/wiki');
        } else {
            const pathMap: { [key: string]: string } = {
                '分类检测': 'classification',
                '知识问答': 'chat',
                '关于项目': 'about',
                '联系我们': 'contact'
            };
            router.push(`/${pathMap[path]}`);
        }
    };

    const handleClassificationNavigation = (type: string) => {
        router.push(`/classification?type=${type}`);
        handleClose();
    };

    const handleClassificationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        handleClick(event);
        if (highlightClassification && setHighlightClassification) {
            setHighlightClassification(false);
        }
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{my: 2, fontFamily: "Noto Serif SC"}}>
                AgriSageLite
            </Typography>
            <Divider/>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton
                            sx={{textAlign: 'center'}}
                            onClick={() => item === '分类' ? null : handleNavigation(item)}
                        >
                            <ListItemText primary={item}/>
                        </ListItemButton>
                        {item === '分类' && (
                            <List>
                                <ListItem>
                                    <ListItemButton onClick={() => handleClassificationNavigation('disease')}>
                                        <ListItemText primary="病虫害分类"/>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => handleClassificationNavigation('flower')}>
                                        <ListItemText primary="花卉分类"/>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => handleClassificationNavigation('bird')}>
                                        <ListItemText primary="鸟类分类"/>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        )}
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: {xs: 'none', sm: 'block'},
                            fontFamily: "Noto Serif SC",
                            fontWeight: 800
                        }}
                    >
                        AgriSageLite
                    </Typography>
                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        {navItems.map((item) => (
                            item === '分类检测' ? (
                                <React.Fragment key={item}>
                                    <Button
                                        ref={classificationButtonRef}
                                        id="classification-button"
                                        aria-controls={open ? 'classification-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClassificationClick}
                                        sx={{
                                            color: highlightClassification ? '#fff' : '#000',
                                            backgroundColor: highlightClassification ? '#f50057' : 'transparent',
                                            '&:hover': {
                                                backgroundColor: highlightClassification ? '#ab003c' : 'rgba(0, 0, 0, 0.04)',
                                            },
                                        }}
                                    >
                                        {item}
                                    </Button>
                                    <Menu
                                        id="classification-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'classification-button',
                                        }}
                                    >
                                        <MenuItem
                                            onClick={() => handleClassificationNavigation('disease')}>病虫害分类</MenuItem>
                                        <MenuItem
                                            onClick={() => handleClassificationNavigation('flower')}>花卉分类</MenuItem>
                                        <MenuItem
                                            onClick={() => handleClassificationNavigation('bird')}>鸟类分类</MenuItem>
                                    </Menu>
                                </React.Fragment>
                            ) : (
                                <Button key={item} sx={{color: '#000', fontFamily: ""}}
                                        onClick={() => handleNavigation(item)}>
                                    {item}
                                </Button>
                            )
                        ))}
                    </Box>

                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Toolbar/>
        </Box>
    );
}

