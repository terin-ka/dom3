import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
} from "@mui/material";

export default function DeleteButton({ itemId, handleDelete }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Delete">
        <IconButton
          color="primary"
          onClick={() => {
            handleClickOpen();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Opravdu chcete odstranit tuto položku?</DialogTitle>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Storno
          </Button>
          <Button
            color="primary"
            onClick={() => {
              handleClose();
              handleDelete({ id: itemId });
            }}
          >
            Ano
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
