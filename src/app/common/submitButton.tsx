"use client";
import { LoadingButton } from "@mui/lab";
import { useFormStatus } from "react-dom";
import { FC } from "react";

type SubmitButtonProps = {
  option: string;
};

export const SubmitButton: FC<SubmitButtonProps> = ({option}) => {
  const { pending } = useFormStatus();
  return (
    <LoadingButton
      type="submit"
      variant="contained"
      color="primary"
      loading={pending}
    >
        {option}
    </LoadingButton>
  );
};
