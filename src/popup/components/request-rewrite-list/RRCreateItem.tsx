import React, { useCallback, useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Accordion, AccordionDetails, AccordionSummary, Button, TextField } from '@mui/material';
import useSyncedRef from '../../utils/hooks/useSyncedRef';
import { useAppDispatch } from '../../utils/hooks/redux';
import { createRequestRewrite } from '../../store/request-rewrites/actions';
import RequestRewriteForm from '../request-rewrite-form/RequestRewriteForm';

const propTypes = {

};

const RrCreateItem: React.FunctionComponent<InferProps<typeof propTypes>> = () => {
    const [pattern, setPattern] = useState('');
    const [replacement, setReplacement] = useState('');

    const patternRef = useSyncedRef(pattern);
    const replacementRef = useSyncedRef(replacement);

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
                <RequestRewriteForm
                    pattern={pattern}
                    replacement={replacement}
                    onPatternChange={setPattern}
                    onReplacementChange={setReplacement}
                    onSaveClick={handleSaveClick}
                />
            </AccordionDetails>
        </Accordion>
    );
};

RrCreateItem.propTypes = propTypes;

export default RrCreateItem;
