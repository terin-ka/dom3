import { useContext, useState } from "react";
import { ListOverviewContext } from "../../contexts/listOverview.provider";
import { UserContext } from "../../contexts/userProviderSimple";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Stack,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function AddListButton() {
  const { handlerMap } = useContext(ListOverviewContext);
  const {loggedInUser} = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const owner = loggedInUser?.id;
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handlerMap.handleCreateList({ name, owner });
    setName(""); //Vymaže pole po uložení
    handleClose();
  };

  return (
    <Stack spacing={2} direction="row">
      <Button variant="outlined" onClick={handleClickOpen}>
        Add List
        <AddIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>New Shopping List</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit">Confirm</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
