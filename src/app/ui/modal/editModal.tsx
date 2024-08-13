"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Paper, TextField } from "@mui/material";
import { SubmitButton } from "../../../app/input/submitButton";
import { update } from "../../crud/update";
import { useInfoContext } from "@/app/context/selectedInfo";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type EditModalProps = {
  open: boolean;
};

export default function EditModal({ open }: EditModalProps) {
  const { selectedInfo } = useInfoContext();
  console.log(selectedInfo?.date);


  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper elevation={3} sx={style}>
          <form action={update}>
            <input type="hidden" name="id" value={selectedInfo?.id || ""} />
            <TextField
              fullWidth
              name="name"
              type="text"
              margin="normal"
              defaultValue={selectedInfo?.name || ""}
            />
            <TextField
              fullWidth
              name="date"
              label="日時"
              type="datetime-local"
              margin="normal"
              defaultValue={selectedInfo?.date || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              name="deadline"
              label="募集期限"
              type="datetime-local"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              name="formUrl"
              type="text"
              margin="normal"
              defaultValue={selectedInfo?.formUrl || ""}
            />
            <Box textAlign="center" mt={2}>
              <SubmitButton option={"編集"} />
            </Box>
          </form>
        </Paper>
      </Modal>
    </div>
  );
}
