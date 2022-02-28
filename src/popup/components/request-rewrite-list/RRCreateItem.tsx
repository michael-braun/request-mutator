import React, { useCallback, useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Accordion, AccordionDetails, AccordionSummary, Button, TextField } from '@mui/material';
import useSyncedRef from '../../utils/hooks/useSyncedRef';
import { useAppDispatch } from '../../utils/hooks/redux';
import { createRequestRewrite } from '../../store/request-rewrites/actions';

const propTypes = {

};

const RrCreateItem: React.FunctionComponent<InferProps<typeof propTypes>> = () => {
    const [pattern, setPattern] = useState('');
    const [replacement, setReplacement] = useState('');

    const patternRef = useSyncedRef(pattern);
    const replacementRef = useSyncedRef(replacement);

    const handlePatternChange = useCallback((event) => {
        setPattern(event.target.value);
    }, [setPattern]);

    const handleReplacementChange = useCallback((event) => {
        setReplacement(event.target.value);
    }, [setReplacement]);

    const dispatch = useAppDispatch();
    const handleSaveClick = useCallback(() => {
        const patternValue = patternRef.current;
        const replacementValue = replacementRef.current;

        dispatch(createRequestRewrite({
            pattern: patternValue,
            replacement: replacementValue,
        }));
    }, [patternRef, replacementRef, dispatch]);

    return (
        <Accordion>
            <AccordionSummary>
                Erstellen
            </AccordionSummary>
            <AccordionDetails>
                <TextField
                    label="Ersetze"
                    autoComplete="off"
                    fullWidth
                    onChange={handlePatternChange}
                    value={pattern}
                    sx={{
                        mt: 1,
                        mb: 1,
                    }}
                />
                <TextField
                    label="Mit"
                    autoComplete="off"
                    fullWidth
                    onChange={handleReplacementChange}
                    value={replacement}
                    sx={{
                        mt: 1,
                        mb: 1,
                    }}
                />
                <Button
                    variant="contained"
                    onClick={handleSaveClick}
                >
                    Speichern
                </Button>
            </AccordionDetails>
        </Accordion>
    );
};

RrCreateItem.propTypes = propTypes;

export default RrCreateItem;
