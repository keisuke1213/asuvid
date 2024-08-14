"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { useInfoContext } from "@/app/context/selectedInfo";
import { deleteInfo } from "../../serverAction/delete";
import { SubmitButton } from "@/app/input/submitButton";

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
    width: "75%"
  },
};

export default function DeleteModal({ open }: { open: boolean }) {
  const router = useRouter();
  const { selectedInfo } = useInfoContext();

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={() => router.push("/")}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            本当に削除しますか？
          </Typography>
          <form action={deleteInfo}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <input type="hidden" name="id" value={selectedInfo?.id || ""} />
              <SubmitButton option={"削除"} />
              <Button variant="outlined">キャンセル</Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
