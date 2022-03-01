import React, { useCallback, useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import {
    Accordion, AccordionActions,
    AccordionDetails,
    AccordionSummary, Box, Button, IconButton, Paper, Popover, Popper, Switch,
    Typography
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { getRequestRewrite } from '../../store/request-rewrites/selectors';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux';
import RequestRewriteForm from '../request-rewrite-form/RequestRewriteForm';
import { deleteRequestRewrite, updateRequestRewrite } from '../../store/request-rewrites/actions';

const handleStopPropagation = (event: { stopPropagation: (() => void) }) => {
    event.stopPropagation();
};

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
        dispatch(deleteRequestRewrite(id));
    }, [id, dispatch]);

    const [anchorElement, setAnchorElement] = useState<HTMLDivElement | null>(null);

    const handleDeleteOpenClick = useCallback((event) => {
        event.stopPropagation();

        setAnchorElement(event.target);
    }, [setAnchorElement]);

    const handeDeleteClose = useCallback(() => {
        setAnchorElement(null);
    }, [setAnchorElement]);

    const handleEnabledChange = useCallback((event) => {
        console.log('change', event.target.checked);
        dispatch(updateRequestRewrite(id, {
            enabled: event.target.checked,
        }));
    }, [dispatch, id]);

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
                    <Switch
                        checked={requestRewrite.enabled}
                        onChange={handleEnabledChange}
                        onClick={handleStopPropagation}
                    />
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
                        onClick={handleDeleteOpenClick}
                    >
                        <DeleteForeverIcon/>
                    </IconButton>
                    <Popover
                        open={!!anchorElement}
                        anchorEl={anchorElement}
                        onClose={handeDeleteClose}
                    >
                        <Box
                            sx={{
                                padding: 2,
                            }}
                        >
                            <Typography>Möchtest Du diese Umleitung wirklich löschen?</Typography>
                            <Box
                                sx={{
                                    textAlign: 'right',
                                    pt: 1,
                                }}
                            >
                                <Button
                                    color="error"
                                    onClick={handleDeleteClick}
                                    variant="contained"
                                >
                                    Löschen
                                </Button>
                            </Box>
                        </Box>
                    </Popover>
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
