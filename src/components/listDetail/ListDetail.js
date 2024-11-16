import { useContext } from "react";
import { UserContext } from "../../contexts/userProviderSimple";
import { ListDetailContext } from "../../contexts/listDetail.provider";
import ItemList from "./ItemList";
import MemberList from "./MemberList";
import { Stack, CircularProgress } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ListDetail() {
  const { listDetailData } = useContext(ListDetailContext);
  const { loggedInUser } = useContext(UserContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (!listDetailData) {
    return <CircularProgress />;
  }

  const isMember =
    listDetailData.memberList.includes(loggedInUser?.id) ||
    loggedInUser?.id === listDetailData.owner;

  return (
    <Stack
      direction="row"
      justifyContent="center"
      spacing={10}
      sx={{
        opacity: isMember ? 1 : 0.5,
        pointerEvents: isMember ? "auto" : "none",
      }}
    >
      {!isSmallScreen && <MemberList />}
      <ItemList />
    </Stack>
  );
}
