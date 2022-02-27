import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Box, Button } from '@mui/material';
import RRList from './request-rewrite-list/RRList';

const propTypes = {

};

console.log('Button', Button);

const App: React.FunctionComponent<InferProps<typeof propTypes>> = () => {
    return (
        <Box
            sx={{
                width: 400,
                minHeight: 400
            }}
        >
            <RRList/>
            <Button variant="contained">Hello World</Button>
        </Box>
    );
};

App.propTypes = propTypes;

export default App;
