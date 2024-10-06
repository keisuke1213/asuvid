"use client";
import * as React from "react";
import { Typography, Modal, Container, Button, Box } from "@mui/material";
import { deleteInfo } from "@/app/serverAction/deleteInfo";

type DeleteModalProps = {
  id: number;
  handleClose: () => void;
  open: boolean;
};

export default function DeleteModal({
  id,
  handleClose,
  open,
}: DeleteModalProps) {
  const handleDelete = async () => {
    await deleteInfo(id);
    handleClose();
  };

  return (
    <Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ zIndex: 2000 }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid",
            borderColor: "primary.main",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            本当に削除しますか？
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" onClick={handleDelete}>
              削除する
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              キャンセル
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
