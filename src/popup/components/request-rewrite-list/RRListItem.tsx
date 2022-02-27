import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography
} from '@mui/material';
import { getRequestRewrite } from '../../store/request-rewrites/selectors';
import { useAppSelector } from '../../utils/hooks/redux';

const propTypes = {
    id: PropTypes.number.isRequired,
};

const RrListItem: React.FunctionComponent<InferProps<typeof propTypes>> = ({
    id,
}) => {
    const requestRewrite = useAppSelector((state) => getRequestRewrite(state, id));
    console.log('requestRewrite', requestRewrite);

    return (
        <Accordion>
            <AccordionSummary>
                Test
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Test
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
};

RrListItem.propTypes = propTypes;

export default RrListItem;
