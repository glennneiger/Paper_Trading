import React from 'react';
import { Link, Typography } from '@material-ui/core';

const Copyright: () => JSX.Element = () =>  {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://ai-zixun.com/">
                ai-zixun.com
            </Link>
            {' '}{new Date().getFullYear()}{'.'}
        </Typography>
    );
}

export default Copyright;
