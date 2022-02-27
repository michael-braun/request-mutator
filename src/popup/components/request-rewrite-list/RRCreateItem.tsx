import React, { useCallback, useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Accordion, AccordionDetails, AccordionSummary, Button, TextField, Typography } from '@mui/material';
import useSyncedRef from '../../utils/hooks/useSyncedRef';
import { useAppDispatch } from '../../utils/hooks/redux';
import { createRequestRewrite } from '../../store/request-rewrites/actions';

const propTypes = {

};

const RrCreateItem: React.FunctionComponent<InferProps<typeof propTypes>> = () => {
    const [pattern, setPattern] = useState('');
    const [replacement, setReplacement] = useState('');
    const [query, setQuery] = useState('');

    const patternRef = useSyncedRef(pattern);
    const replacementRef = useSyncedRef(replacement);
    const queryRef = useSyncedRef(query);

    const handlePatternChange = useCallback((event) => {
        setPattern(event.target.value);
    }, [setPattern]);

    const handleReplacementChange = useCallback((event) => {
        setReplacement(event.target.value);
    }, [setReplacement]);

    const handleQueryChange = useCallback((event) => {
        setQuery(event.target.value);
    }, [setQuery]);

    const dispatch = useAppDispatch();
    const handleSaveClick = useCallback(() => {
        const patternValue = patternRef.current;
        const replacementValue = replacementRef.current;
        const queryValue = queryRef.current;

        dispatch(createRequestRewrite({
            pattern: patternValue,
            replacement: replacementValue,
            query: queryValue,
        }));
    }, [patternRef, replacementRef, queryRef, dispatch]);

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
                <Typography>
                    Wenn die URL folgenden Text enthält:
                </Typography>
                <TextField
                    autoComplete="off"
                    fullWidth
                    onChange={handleQueryChange}
                    value={query}
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
