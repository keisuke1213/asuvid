"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Paper, TextField, Button } from "@mui/material";
import { SubmitButton } from "../../common/submitButton";
import { update } from "../../serverAction/update";
import { useInfoContext } from "@/app/context/selectedInfo";
import { useRouter } from "next/navigation";

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
  "@media (max-width: 600px)": {
    width: "75%",
  },
};

type EditModalProps = {
  open: boolean;
};

export default function EditModal({ open }: EditModalProps) {
  const router = useRouter();
  const { selectedInfo } = useInfoContext();

  const handleClose = () => {
    router.push("/");
  };

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
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <SubmitButton option={"編集する"} />
              <Button variant="outlined" onClick={handleClose}>
                キャンセル
              </Button>
            </Box>
          </form>
        </Paper>
      </Modal>
    </div>
  );
}
