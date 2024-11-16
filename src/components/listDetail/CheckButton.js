import { useState, useEffect, useContext } from "react";
import { ListDetailContext } from "../../contexts/listDetail.provider";
import Checkbox from "@mui/material/Checkbox";

export default function CheckButton({ itemId }) {
  const { listDetailData, handlerMap } = useContext(ListDetailContext);
  const [checked, setChecked] = useState(false);
  const item = listDetailData.itemList.find((item) => item.id === itemId);

  useEffect(() => {
    if (item) {
      setChecked(item.resolved);
    }
  }, [item]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    handlerMap.toggleResolveItem({ id: itemId });
  };

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}
