import { useContext } from "react";
import { ListOverviewContext } from "../../contexts/listOverview.provider";
import { Switch, Button, Stack } from "@mui/material";

export default function OverviewFilterButton() {
  const { showArchived, toggleShowArchived } = useContext(ListOverviewContext);

  return (
    <Stack spacing={2} direction="row">
      <Button variant="outlined" sx={{ color: "#56949F" }}>
        {showArchived ? "Archived" : "All"}
        <Switch checked={showArchived} onChange={() => toggleShowArchived()} />
      </Button>
    </Stack>
  );
}
