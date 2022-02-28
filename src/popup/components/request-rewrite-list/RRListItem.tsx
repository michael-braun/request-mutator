import React, { useCallback, useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import {
    Accordion, AccordionActions,
    AccordionDetails,
    AccordionSummary, Box, IconButton,
    Typography
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { getRequestRewrite } from '../../store/request-rewrites/selectors';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux';
import RequestRewriteForm from '../request-rewrite-form/RequestRewriteForm';
import { deleteRequestRewrite, updateRequestRewrite } from '../../store/request-rewrites/actions';
const propTypes = {
    id: PropTypes.number.isRequired,
};

const RrListItem: React.FunctionComponent<InferProps<typeof propTypes>> = ({
    id,
}) => {
    const requestRewrite = useAppSelector((state) => getRequestRewrite(state, id));
    console.log('requestRewrite', requestRewrite);

    const dispatch = useAppDispatch();

    const handlePatternChange = useCallback((pattern: string) => {
        dispatch(updateRequestRewrite(id, {
            pattern,
        }));
    }, [id, dispatch]);

    const handleReplacementChange = useCallback((replacement: string) => {
        dispatch(updateRequestRewrite(id, {
            replacement,
        }));
    }, [id, dispatch]);

    const handleDeleteClick = useCallback((event) => {
        event.stopPropagation();
        dispatch(deleteRequestRewrite(id));
    }, [id, dispatch]);

    if (!requestRewrite) {
        return null;
    }

    return (
        <Accordion>
            <AccordionSummary>
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                    }}
                >
                    <Typography
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        Test
                    </Typography>
                    <IconButton
                        onClick={handleDeleteClick}
                    >
                        <DeleteForeverIcon/>
                    </IconButton>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <RequestRewriteForm
                    pattern={requestRewrite.pattern}
                    replacement={requestRewrite.replacement}
                    onPatternChange={handlePatternChange}
                    onReplacementChange={handleReplacementChange}
                />
            </AccordionDetails>
        </Accordion>
    );
};

RrListItem.propTypes = propTypes;

export default RrListItem;
