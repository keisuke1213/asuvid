"use client";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useRouter } from "next/navigation";
import { useInfoContext } from "../context/selectedInfo";

const options = ["編集", "削除"];

const ITEM_HEIGHT = 48;

type Info = {
  id: number;
  name: string;
  date: string;
  deadline: string;
  formUrl: string;
};

export default function MenuIcon({ info }: { info: Info }) {
  const { setSelectedInfo } = useInfoContext();

  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option: string) => {
    if (option === "編集") {
      router.push(`/displayInfo/${info.id}/edit`);
      setSelectedInfo(info);
    } else if (option === "削除") {
      router.push(`/displayInfo/${info.id}/delete`);
      setSelectedInfo(info);
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
