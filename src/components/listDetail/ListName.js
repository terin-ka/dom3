import { useContext, useState } from "react";
import { ListDetailContext } from "../../contexts/listDetail.provider";
import { UserContext } from "../../contexts/userProviderSimple";
import { Stack, IconButton, Typography, Tooltip } from "@mui/material";
import { Button, TextField, DialogActions, DialogContent, DialogTitle, Dialog} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ListName() {
  const { listDetailData, handlerMap } = useContext(ListDetailContext);
  const { loggedInUser } = useContext(UserContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(listDetailData.name);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlerMap.handleRename({name: name}); 
    handleClose();
  };

  return (
    <Stack spacing={2} direction="row">
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
          sx:{ width: "50%"},
        }}
      >
        <DialogTitle>Update Name</DialogTitle>
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
            onChange={(e) => setName(e.target.value)} // Nastaví nový název
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button type="submit" color="primary">
            Save Changes
          </Button>
        </DialogActions>
    </Dialog>
      <Typography variant={isSmallScreen ? "h2" : "h1"}>{listDetailData.name}</Typography>

      {loggedInUser?.id === listDetailData.owner ? (
        <Tooltip title="Rename" placement="right">
          <IconButton color="primary" onClick={() => setOpen(true)}>
            <EditIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}
    </Stack>
  );
}
