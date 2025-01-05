import Link from "next/link";
import { List, ListItemButton } from "@mui/material";
export const LinkSwitch = ({ props }: { props: string }) => {
  if (props === "/admin") {
    return (
      <List>
        <ListItemButton>
          <Link href="/">アプリへ</Link>
        </ListItemButton>
        <ListItemButton>
          <Link href="/carender">カレンダー</Link>
        </ListItemButton>
      </List>
    );
  } else {
    return (
      <List>
        <ListItemButton>
          <Link href="/admin">管理者ページ</Link>
        </ListItemButton>
        <ListItemButton>
          <Link href="/carender">カレンダー</Link>
        </ListItemButton>
      </List>
    );
  }
};
