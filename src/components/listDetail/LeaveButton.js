import LogoutIcon from '@mui/icons-material/Logout';
import { Stack, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useContext, useState } from "react";
import { ListDetailContext } from "../../contexts/listDetail.provider";
import { UserContext } from '../../contexts/userProviderSimple';

export default function LeaveButton() {
  const { handlerMap } = useContext(ListDetailContext);
  const { loggedInUser } = useContext(UserContext);
  const memberId = loggedInUser?.id;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  

  return (
    <Stack spacing={2} direction="row">
      <Button variant="outlined" onClick={()=>setOpen(true)}>
        Leave
        <LogoutIcon fontSize="medium" style={{paddingLeft: "4px"}}/>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Opravdu chcete odejít z tohoto listu?</DialogTitle>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Storno
          </Button>
          <Button
            color="primary"
            onClick={() => {
              handlerMap.handleDeleteMember({id: memberId});
            }}
          >
            Ano
          </Button>
        </DialogActions>
        </Dialog>
    </Stack>
  );
}
