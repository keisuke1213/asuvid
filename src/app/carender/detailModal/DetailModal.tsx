"use client";
import * as React from "react";
import { Typography, Link, Modal,Container, Button } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: 'background.paper',
  border: "2px solid #000",
  boxShadow: '24px',
  p: 4,
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
}

type EditModalProps = {
  open: boolean;
  info: Info | null;
  onClose: () => void;
};
 
export default function DetailModal({open,info,onClose}: EditModalProps) {
  
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
          <Typography variant="h5" component="h2">
            {info?.title}
          </Typography>
          <Typography color="textSecondary">{info?.content}</Typography>
          <Typography variant="body2" component="p">
            Deadline: {new Date(info?.deadline!).toLocaleDateString()}
          </Typography>
          {info?.url && (
            <Typography variant="body2" component="p">
              Form URL:{" "}
              <Link href={info.url} target="_blank" rel="noopener">
                {info.url}
              </Link>
            </Typography>
          )}
          <Button onClick={onClose} >閉じる</Button>
        </Container>
      </Modal>
    </div>
  );
}
