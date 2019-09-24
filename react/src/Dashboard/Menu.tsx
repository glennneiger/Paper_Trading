import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import InputIcon from '@material-ui/icons/Input';
import MessageIcon from '@material-ui/icons/Message';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

const useStyles = makeStyles(theme => ({
    listItemIcon: {
        color: '#FFFFFF', 
    },
    listItemText: {
        color: '#FFFFFF', 
    }
}));

interface Props {
    setWindow: React.Dispatch<React.SetStateAction<string>>;
}

const Menu: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <div>
            <div>
                <ListItem button onClick={() => {props.setWindow('dashboard')}}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" className={classes.listItemText} />
                </ListItem>
                <ListItem button onClick={() => {props.setWindow('portfolio')}}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <FormatListBulletedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Portfolio" className={classes.listItemText} />
                </ListItem>
                <ListItem button onClick={() => {props.setWindow('quote')}}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <MessageIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quote" className={classes.listItemText} />
                </ListItem>
                <ListItem button onClick={() => {props.setWindow('trade')}}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <InputIcon />
                    </ListItemIcon>
                    <ListItemText primary="Trade" className={classes.listItemText} />
                </ListItem>
                <ListItem button onClick={() => {props.setWindow('order')}}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <PlaylistAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Order" className={classes.listItemText} />
                </ListItem>
                <ListItem button onClick={() => {props.setWindow('transaction')}}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <PlaylistAddCheckIcon />
                    </ListItemIcon>
                    <ListItemText primary="Transaction" className={classes.listItemText} />
                </ListItem>
            </div>
        </div>
    );
}

export default Menu; 