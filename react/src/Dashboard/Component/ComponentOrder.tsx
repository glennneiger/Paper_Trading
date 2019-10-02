import React, { ReactFragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, Table, TableBody, TableCell, TableHead, TableRow, Typography, Grid, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Slide } from '@material-ui/core';
import HTTPClient from '../../HTTPClient/HTTPClient';
import Order from '../Interface/OrderInterface';
import Utils from '../Utils/Utils';
import { TransitionProps } from 'react-transition-group/Transition';

interface Props {
    token: string;
    signOut: (sessionExpired: boolean) => void;
}

const useStyles: (props?: any) => Record<any, string> = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    valueUp: {
        color: '#43A047',
    },
    valueDown: {
        color: '#FF0000',
    },
}));

const toCommas: (value: string) => string = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ComponentPortfolio: React.FC<Props> = props => {
    const classes = useStyles();
    const [order, setOrder] = React.useState<Order | null>(null);
    const [type, setType] = React.useState<'open' | 'executed' | 'cancelled'>('open');
    const [openCancelDialog, setOpenCancelDialog] = React.useState<boolean>(false);
    const [orderCancelId, setOrderCancelId] = React.useState<number>(0);


    React.useEffect(() => {
        HTTPClient
        .getOrder(props.token)
        .then(response => setOrder(response))
        .catch(error => {
            if (error.response !== undefined) {
                if (error.response.status === 500 && error.response.data.message === 'invalid-token') {
                    props.signOut(true);
                }
            }
            setOrder(null);
        }); 
    }, []);

    const constructTable: () => ReactFragment | null = () => {
        if (order !== null) {
            /* ========= OPEN ========= */
            if (type === 'open') {
                return (
                    <div>
                        <Dialog
                            open={openCancelDialog}
                            keepMounted
                            onClose={() => {setOrderCancelId(0); setOpenCancelDialog(false);}}
                        >
                            <DialogTitle id="alert-dialog-slide-title">Cancel order?</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    Please confirm that you are cancelling? The action cannot be undone. 
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => {setOrderCancelId(0); setOpenCancelDialog(false);}} color="primary">
                                    No
                                </Button>
                                <Button 
                                    onClick={() => {
                                        setOrder(null);
                                        HTTPClient
                                            .postOrderCancel(props.token, orderCancelId)
                                            .then(() => {
                                                HTTPClient
                                                    .getOrder(props.token)
                                                    .then(response => {
                                                        setOrder(response);
                                                        setOpenCancelDialog(false);
                                                    })
                                                    .catch(error => {
                                                        if (error.response !== undefined) {
                                                            if (error.response.status === 500 && error.response.data.message === 'invalid-token') {
                                                                props.signOut(true);
                                                            }
                                                        }
                                                        setOrder(null);
                                                    });
                                            })
                                    }} 
                                    color="primary"
                                >
                                    Yes
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Symbol</TableCell>
                                    <TableCell>Action</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Price Type</TableCell>
                                    <TableCell align="right">Qty #</TableCell>
                                    <TableCell align="right">Limit Price $</TableCell>
                                    <TableCell align="right">Stop Price $</TableCell>
                                    <TableCell align="right">Commission $</TableCell>
                                    <TableCell align="right">Order Date</TableCell>
                                    <TableCell align="right">Cancel</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.open.map(orderElement => (
                                    <TableRow key={orderElement.id}>
                                        <TableCell>
                                            {orderElement.stockSymbol}
                                        </TableCell>
                                        <TableCell>
                                            {orderElement.actionType.toLocaleUpperCase()}
                                        </TableCell>
                                        <TableCell>
                                            {orderElement.statusType.toLocaleUpperCase()}
                                        </TableCell>
                                        <TableCell>
                                            {orderElement.priceType.toLocaleUpperCase()}
                                        </TableCell>
                                        <TableCell align="right">
                                            {orderElement.quantity}
                                        </TableCell>
                                        <TableCell align="right">
                                            {orderElement.limitPrice}
                                        </TableCell>
                                        <TableCell align="right">
                                            {orderElement.stopPrice === null ? 'N/A' : orderElement.stopPrice}
                                        </TableCell>
                                        <TableCell align="right">
                                            {orderElement.commission}
                                        </TableCell>
                                        <TableCell align="right">
                                            {orderElement.orderDate.substring(0, 10)}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                size="small"
                                                color="secondary"
                                                className={classes.button}
                                                onClick={() => {setOrderCancelId(orderElement.id); setOpenCancelDialog(true);}}
                                            >
                                                Cancel
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                );
            }
            /* ========= EXECUTED ========= */
            else if (type === 'executed') {
                return (
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Symbol</TableCell>
                                <TableCell>Action</TableCell>
                                <TableCell>Price Type</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Qty #</TableCell>
                                <TableCell align="right">Price Paid $</TableCell>
                                <TableCell align="right">Commission $</TableCell>
                                <TableCell align="right">Total $</TableCell>
                                <TableCell align="right">Order Date</TableCell>
                                <TableCell align="right">Traded Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {order.executed.map(orderElement => (
                                <TableRow key={orderElement.id}>
                                    <TableCell>
                                        {orderElement.stockSymbol}
                                    </TableCell>
                                    <TableCell>
                                        {orderElement.actionType.toLocaleUpperCase()}
                                    </TableCell>
                                    <TableCell>
                                        {orderElement.priceType.toLocaleUpperCase()}
                                    </TableCell>
                                    <TableCell>
                                        {orderElement.statusType.toLocaleUpperCase()}
                                    </TableCell>
                                    <TableCell align="right">
                                        {orderElement.quantity}
                                    </TableCell>
                                    <TableCell align="right">
                                        {Utils.formatNumber(orderElement.pricePaid)}
                                    </TableCell>
                                    <TableCell align="right">
                                        {orderElement.commission}
                                    </TableCell>
                                    <TableCell align="right">
                                        {Utils.formatNumber(orderElement.total)}
                                    </TableCell>
                                    <TableCell align="right">
                                        {orderElement.orderDate.substring(0, 10)}
                                    </TableCell>
                                    <TableCell align="right">
                                        {orderElement.tradeDate.substring(0, 10)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                );
            }
            /* ========= CANCELLED ========= */
            else if (type === 'cancelled') {
                return (
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Symbol</TableCell>
                                <TableCell>Action</TableCell>
                                <TableCell>Price Type</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Qty #</TableCell>
                                <TableCell align="right">Limit Price $</TableCell>
                                <TableCell align="right">Stop Price $</TableCell>
                                <TableCell align="right">Commission $</TableCell>
                                <TableCell align="right">Order Date</TableCell>
                                <TableCell align="right">Cancelled Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {order.cancelled.map(orderElement => (
                                <TableRow key={orderElement.id}>
                                    <TableCell>
                                        {orderElement.stockSymbol}
                                    </TableCell>
                                    <TableCell>
                                        {orderElement.actionType.toLocaleUpperCase()}
                                    </TableCell>
                                    <TableCell>
                                        {orderElement.priceType.toLocaleUpperCase()}
                                    </TableCell>
                                    <TableCell>
                                        {orderElement.statusType.toLocaleUpperCase()}
                                    </TableCell>
                                    <TableCell align="right">
                                        {orderElement.quantity}
                                    </TableCell>
                                    <TableCell align="right">
                                        {orderElement.limitPrice === null ? 'N/A' : orderElement.limitPrice}
                                    </TableCell>
                                    <TableCell align="right">
                                        {orderElement.stopPrice === null ? 'N/A' : orderElement.stopPrice}
                                    </TableCell>
                                    <TableCell align="right">
                                        {orderElement.commission === null ? 'N/A' : orderElement.stopPrice}
                                    </TableCell>
                                    <TableCell align="right">
                                        {orderElement.orderDate.substring(0, 10)}
                                    </TableCell>
                                    <TableCell align="right">
                                        {orderElement.tradeDate.substring(0, 10)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                );
            }
        }
        return null;
    }

    return (
        <React.Fragment>
            <Grid container direction="row" justify="space-between">
                <Grid itemScope>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        {type.toLocaleUpperCase() + ' '}Order
                    </Typography>
                </Grid>
                <Grid item>
                    <ButtonGroup size="small" color="primary">
                        <Button onClick={() => { setType('open') }}>Open</Button>
                        <Button onClick={() => { setType('executed') }}>Executed</Button>
                        <Button onClick={() => { setType('cancelled') }}>Cancelled</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
            {constructTable()}
            
        </React.Fragment>
    );
}

export default ComponentPortfolio; 