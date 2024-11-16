import { useState } from "react";
import MemberList from "./MemberList";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack, Drawer, Button, Typography } from "@mui/material";

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Stack spacing={3} direction="row">
      <Button variant="outlined" color="primary" onClick={toggleDrawer(true)}>
        <MenuIcon />
        <Typography>Members</Typography>
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <MemberList />
      </Drawer>
    </Stack>
  );
}
