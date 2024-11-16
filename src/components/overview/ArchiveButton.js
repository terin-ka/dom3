import { useContext, useState } from "react";
import { ListOverviewContext } from "../../contexts/listOverview.provider";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { IconButton, Tooltip } from "@mui/material";

export default function ArchiveButton({ itemId }) {
  const { handlerMap } = useContext(ListOverviewContext);
  const [isFilled, setIsFilled] = useState(false);

  return (
    <Tooltip title="Archive">
      <IconButton
        color="primary"
        onClick={() => {
          handlerMap.handleArchive({ id: itemId });
          setIsFilled(!isFilled);
        }}
      >
        {isFilled ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
    </Tooltip>
  );
}
