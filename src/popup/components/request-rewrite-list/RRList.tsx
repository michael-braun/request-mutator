import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { useAppSelector } from '../../utils/hooks/redux';
import { getRequestRewriteIds } from '../../store/request-rewrites/selectors';
import { Accordion, AccordionDetails, AccordionSummary, Box, TextField, Typography } from '@mui/material';
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
            <Accordion>
                <AccordionSummary>
                    Erstellen
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                        label="Ersetze"
                        autoComplete="off"
                    />
                    <TextField
                        label="Mit"
                        autoComplete="off"
                    />
                    <Typography>
                        Wenn die URL folgenden Text enthält:
                    </Typography>
                    <TextField
                        label="Wo"
                        autoComplete="off"
                    />
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

RrList.propTypes = propTypes;

export default RrList;
