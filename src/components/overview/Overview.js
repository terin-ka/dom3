import { ListOverviewContext } from "../../contexts/listOverview.provider";
import { UserContext } from "../../contexts/userProviderSimple";
import { useContext } from "react";
import { Stack, Grid2, Typography } from "@mui/material";
import OverviewToolbar from "./OverviewToolbar";
import ShoppingList from "./ShoppingList";

export default function Overview() {
  const { overviewData } = useContext(ListOverviewContext);
  const { loggedInUser } = useContext(UserContext);

  if (!loggedInUser)
    return <Grid2 container justifyContent="center">
      <Typography variant="h2">Nejprve se prosím přihlaste</Typography>
    </Grid2>;

  const filteredList = overviewData.filter(
    (list) =>
      list.owner === loggedInUser.id ||
      list.memberList.includes(loggedInUser.id)
  );

  return (
    <Stack direction="column" alignItems="center">
      <OverviewToolbar />
      <Grid2 container spacing={4} justifyContent="center">
        {filteredList.map((list) => (
          <ShoppingList key={list.listId} list={list} />
        ))}
      </Grid2>
    </Stack>
  );
}
