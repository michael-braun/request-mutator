import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { useAppSelector } from '../../utils/hooks/redux';
import { getRequestRewriteIds } from '../../store/request-rewrites/selectors';
import { Box } from '@mui/material';
import RRListItem from './RRListItem';

const propTypes = {

};

const RrList: React.FunctionComponent<InferProps<typeof propTypes>> = () => {
    const ids = useAppSelector(getRequestRewriteIds);

    return (
        <Box>
            {ids.map((id) => (
                <RRListItem
                    key={id}
                    id={id as number}
                />
            ))}
        </Box>
    );
};

RrList.propTypes = propTypes;

export default RrList;
