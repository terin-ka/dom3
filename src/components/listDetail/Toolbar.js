import { useContext } from "react";
import { ListDetailContext } from "../../contexts/listDetail.provider";
import { ListOverviewContext } from "../../contexts/listOverview.provider";
import { Stack, Button, Switch } from "@mui/material";
import AddItemButton from "./AddItemButton";

export default function Toolbar() {
  const { listDetailData, showUnresolved, toggleShowUnresolved } =
    useContext(ListDetailContext);
  const { overviewData, setOverviewData } = useContext(ListOverviewContext);

  const handleChange = () => {
    toggleShowUnresolved();
  };

  const handleSaveChanges = () => {
    const updatedData = overviewData.map((list) =>
      list.listId === listDetailData.listId ? { ...list, ...listDetailData } : list
    );
    setOverviewData(updatedData);
  };

  return (
    <Stack spacing={2} direction="row">
      <AddItemButton />
      <Stack spacing={2} direction="row">
        <Button variant="outlined">
          {showUnresolved ? "Unfinished" : "All"}
          <Switch checked={showUnresolved} onChange={handleChange} />
        </Button>
        <Button
          onClick={handleSaveChanges}
          variant="contained"
          color="secondary"
          sx={{
            color: "white",
          }}
        >
          {"Save Changes"}
        </Button>
      </Stack>
    </Stack>
  );
}
