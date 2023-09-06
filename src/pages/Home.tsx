import React from 'react'
import { Grid } from '@mui/material';

import Posts from '../components/Posts';
import NavBarTwo from '../components/NavBarTwo';

const Inicio = () => {

    return (
        <div>
            <NavBarTwo />
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                p="20"
            >
                <Grid item xs={12} md={12} lg={8} sx={{ margin: '90px' }}>
                    <Posts />
                </Grid>
            </Grid>
        </div>
    );
}
export default Inicio;