"use client"
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {Paper, TextField} from "@mui/material";
import {SubmitButton} from "../../../app/input/submitButton";
import {update} from "../../crud/update";

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
  open: boolean,
  info: {
    id: number,
    name: string,
    date: string,
    deadline: string,
    formUrl: string
  }
}

export default function EditModal({open,info}: EditModalProps) {
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Paper elevation={3} sx={style}>
          <form action={update}>
            <input type="hidden" name="id" value={info?.id || ""} />
            <TextField
              fullWidth
              name="name"
              label="ボランティア名"
              type="text"
              margin="normal"
              value={info?.name || ""}
            />
            <TextField
              fullWidth
              name="date"
              label="日時"
              type="datetime-local"
              margin="normal"
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
              label="募集フォームのURL"
              type="text"
              margin="normal"
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
