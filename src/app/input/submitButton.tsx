"use client";
import { LoadingButton } from "@mui/lab";
import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <LoadingButton
        type="submit"
        variant="contained"
        color="primary"
        loading={pending}
        >
        送信
        </LoadingButton>
    );
    }