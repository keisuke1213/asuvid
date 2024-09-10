"use client";
import * as React from "react";
import { Typography, Link, Modal, Container, Button } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: "24px",
  p: 4,
  border: "1px solid rgba(0, 0, 0, 0.4)",
  borderRadius: "8px",
  "@media (max-width: 600px)": {
    width: "75%",
  },
};

type Info = {
  id: string;
  infoId: number;
  title: string;
  content: string;
  deadline: string;
  url: string;
  start: string;
};

type EditModalProps = {
  open: boolean;
  info: Info | null;
  onClose: () => void;
};

export default function DetailModal({ open, info, onClose }: EditModalProps) {
  
    const removeLeadingZero = (dateString: string | undefined) => {
      if(dateString === undefined) return "";
      const date = new Date(dateString);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${month}/${day}`;
    };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ zIndex: 1500 }}
        BackdropProps={{
          style: { backgroundColor: "rgba(255,255,255,0.1)", zIndex: 1500 },
        }}
      >
        <Container sx={style}>
          <Typography variant="h6" component="h6">
            {info?.title}
          </Typography>
          <Typography variant="body1" component="p" sx={{ mt: 2 }}>
            締め切り: {removeLeadingZero(info?.deadline)}
          </Typography>
        </Container>
      </Modal>
    </div>
  );
}
