import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Box, Button } from '@mui/material';
import { useAppSelector } from '../utils/hooks/redux';
import { getRequestRewriteIds } from '../store/request-rewrites/selectors';

const propTypes = {

};

console.log('Button', Button);

const App: React.FunctionComponent<InferProps<typeof propTypes>> = () => {
    const ids = useAppSelector(getRequestRewriteIds);
    console.log(ids);

    return (
        <Box
            sx={{
                width: 400,
                minHeight: 400
            }}
        >
            <Button variant="contained">Hello World</Button>
        </Box>
    );
};

App.propTypes = propTypes;

export default App;
