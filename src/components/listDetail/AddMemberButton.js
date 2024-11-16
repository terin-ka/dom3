import { UserContext } from "../../contexts/userProviderSimple";
import { ListDetailContext } from "../../contexts/listDetail.provider";
import { useState, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
} from "@mui/material";

export default function AddMemberButton() {
  const { listDetailData, handlerMap } = useContext(ListDetailContext);
  const { userList } = useContext(UserContext);
  const [memberId, setMemberId] = useState("");
  const [open, setOpen] = useState(false);

  const newUserList = userList.filter((user) => user.id !== listDetailData.owner);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (memberId) {
      handlerMap.handleAddMember({ id: memberId });
      handleClose();
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
          sx: { width: "50%" },
        }}
      >
        <DialogTitle>Add Member</DialogTitle>
        <DialogContent sx={{ pt: 4 }}>
          <Autocomplete
            sx={{ mt: 2 }}
            fullWidth
            disablePortal={false} //umožní rozbalení mimo běžný DOM strom componenty
            options={newUserList}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              setMemberId(newValue ? newValue.id : "");
            }}
            renderInput={(params) => <TextField {...params} label="User" />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button type="submit" color="primary" disabled={!memberId}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Add Member
          <AddIcon />
        </Button>
      </Stack>
    </>
  );
}
