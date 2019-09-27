import React from 'react';
import clsx from 'clsx';
import { CssBaseline, AppBar, Toolbar, IconButton, Typography, Badge, Drawer, Divider, List, Container, Grid, Paper, } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Menu from './Menu';
import WindowDashboard from './Windows/WindowDashboard';
import WindowPortfolio from './Windows/WindowPortfolio';
import WindowTrade from './Windows/WindowTrade';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        background: '#FFFFFF',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    iconButton: {
        color: '#FFFFFF',
    },
    drawerPaper: {
        backgroundImage: 'url(./img/menu.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'left',
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 350,
    },
}));


interface Props {
    setPage: React.Dispatch<React.SetStateAction<string>>;
    id: number;
    token: string;
    firstName: string;
    lastName: string;
}

const Dashboard: React.FC<Props> = props => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [window, setWindow] = React.useState('trade');

    console.log("Dashboard - Render")

    const appBarTitleSelectionHandler: () => string = () => {
        switch (window) {
            case 'dashboard':
                return ('Dashboard');
            case 'portfolio':
                return ('Portfolio');
            case 'quote':
                return ('Stock Quote');
            case 'trade':
                return ('Trade');
            case 'order':
                return ('Current Orders');
            case 'transaction':
                return ('Past Transactions');
            default:
                return ('Dashboard');
        }
    }

    const windowSelectionHandler = () => {
        switch (window) {
            case 'dashboard':
                return (
                    <WindowDashboard
                        setPage={props.setPage}
                        id={props.id}
                        token={props.token}
                        firstName={props.firstName}
                        lastName={props.lastName}
                    />
                );
            case 'portfolio':
                return (
                    <WindowPortfolio
                        setWindow={setWindow}
                        token={props.token}
                    />
                );
            case 'trade':
                return (
                    <WindowTrade
                        setWindow={setWindow}
                        token={props.token}
                    />
                );
            default:
                return (
                    <WindowDashboard
                        setPage={props.setPage}
                        id={props.id}
                        token={props.token}
                        firstName={props.firstName}
                        lastName={props.lastName}
                    />
                );
        };
    };


    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                color="inherit"
                position="absolute"
                className={clsx(classes.appBar, open && classes.appBarShift)}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        {appBarTitleSelectionHandler()}
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton className={classes.iconButton} onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <Menu
                        setWindow={setWindow}
                    />
                </List>
                <Divider />
            </Drawer>
            {windowSelectionHandler()}
        </div>
    );
}

export default Dashboard; 