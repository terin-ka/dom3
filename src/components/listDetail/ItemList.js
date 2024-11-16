import { useContext } from "react";
import { ListDetailContext } from "../../contexts/listDetail.provider";
import ListName from "./ListName";
import Toolbar from "./Toolbar";
import Item from "./Item";
import TemporaryDrawer from "./TemporaryDrawer";
import { Stack, List }from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ItemList() {
  const { listDetailData } = useContext(ListDetailContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack
      spacing={2}
      direction="column"
      style={{
        margin: "30px 0px 0px 0px",
        padding: "0px 30px",
        display: "flex",
        alignItems: "center", 
      }}
    >
      <ListName />
      <Toolbar />
      <List style={{ width: "100%", marginTop:"0" }}>
        {listDetailData.itemList.map((item) => (
          <Item key={item.id} item={item}></Item>
        ))}
      </List>
      {isSmallScreen && <TemporaryDrawer />}
    </Stack>
  );
}
