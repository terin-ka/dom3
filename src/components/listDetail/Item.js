import { useContext } from "react";
import { ListDetailContext } from "../../contexts/listDetail.provider";
import DeleteButton from "./DeleteButton";
import CheckButton from "./CheckButton";
import { ListItem, Stack, Typography } from "@mui/material";

export default function Item({ item }) {
  const { handlerMap } = useContext(ListDetailContext);
  return (
    <ListItem
      sx={{
        boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.16)",
        margin: "20px 0px",
        borderRadius: "15px",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: "700px",
      }}
    >
      <Typography
        variant="body1"
        sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
      >
        {item.name}
      </Typography>
      <Stack direction="row">
        <Typography variant="body1" sx={{ margin: "5px", padding: "5px" }}>
          {item.count}x
        </Typography>
        <CheckButton itemId={item.id} />
        <DeleteButton
          itemId={item.id}
          handleDelete={handlerMap.handleDeleteItem}
        />
      </Stack>
    </ListItem>
  );
}
