import React, { useCallback } from 'react';
import { Button, TextField } from '@mui/material';

type RequestRewriteFormProps = {
    pattern: string;
    replacement: string;
    onPatternChange: (pattern: string) => void;
    onReplacementChange: (replacement: string) => void;
    onSaveClick: () => void;
};

const RequestRewriteForm: React.FunctionComponent<RequestRewriteFormProps> = ({
    pattern,
    replacement,
    onPatternChange,
    onReplacementChange,
    onSaveClick,
}) => {
    const handlePatternChange = useCallback((event) => {
        onPatternChange(event.target.value);
    }, [onPatternChange]);

    const handleReplacementChange = useCallback((event) => {
        onReplacementChange(event.target.value);
    }, [onReplacementChange]);

    const handleSaveClick = useCallback((event) => {
        onSaveClick();
    }, [onSaveClick]);

    return (
        <>
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
        </>
    );
};

export default RequestRewriteForm;
