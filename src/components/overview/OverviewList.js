import { ListOverviewContext } from "../../contexts/listOverview.provider";
import { UserContext } from "../../contexts/userProviderSimple";
import { useContext } from "react";
import ShoppingList from "./ShoppingList";
import Grid2 from "@mui/material/Grid2";

export default function OverviewList() {
  const { overviewData } = useContext(ListOverviewContext);
  const { loggedInUser } = useContext(UserContext);

  if (!loggedInUser)
    return <Grid2 container spacing={4} justifyContent="center" />;

  const filteredList = overviewData.filter(
    (list) =>
      list.owner === loggedInUser.id ||
      list.memberList.includes(loggedInUser.id)
  );

  return (
    <Grid2 container spacing={4} justifyContent="center">
      {filteredList.map((list) => (
        <ShoppingList key={list.listId} list={list} />
      ))}
    </Grid2>
  );
}
