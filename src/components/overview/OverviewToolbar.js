import Stack from "@mui/material/Stack";
import OverviewFilterButton from "./OverviewFillterButton";
import AddListButton from "./AddListButton";

export default function OverviewToolbar() {
  return (
    <Stack spacing={2} direction="row" sx={{ margin: "20px" }}>
      <AddListButton />
      <OverviewFilterButton />
    </Stack>
  );
}
