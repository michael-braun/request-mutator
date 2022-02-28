import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Box } from '@mui/material';
import RRList from './request-rewrite-list/RRList';

const propTypes = {

};

const App: React.FunctionComponent<InferProps<typeof propTypes>> = () => {
    return (
        <Box
            sx={{
                width: 400,
                minHeight: 400
            }}
        >
            <RRList/>
        </Box>
    );
};

App.propTypes = propTypes;

export default App;
