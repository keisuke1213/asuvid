"use client";
import * as React from "react";
import { Typography, Modal, Container, Button, Box } from "@mui/material";
import { deleteInfo } from "@/app/serverAction/deleteInfo";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

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
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
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
            width: { xs: "75%", sm: "80%", md: "60%", lg: "40%" },
            transform: "translate(-50%, -50%)",
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
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={loading}
              onClick={handleDelete}
            >
              削除
            </LoadingButton>

            <Button variant="outlined" onClick={handleClose}>
              キャンセル
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
