import { useContext } from "react";
import { ListDetailContext } from "../../contexts/listDetail.provider";
import { UserContext } from "../../contexts/userProviderSimple";
import { Stack, List, ListItem, Typography } from "@mui/material";
import AddMemberButton from "./AddMemberButton";
import LeaveButton from "./LeaveButton";
import DeleteButton from "./DeleteButton";

export default function MemberList() {
  const { listDetailData, handlerMap } = useContext(ListDetailContext);
  const { userList, loggedInUser } = useContext(UserContext);
  const owner = userList.find((user) => user.id === listDetailData.owner);

  if (!listDetailData.memberList) {
    return <Stack />;
  }

  return (
    <Stack
      spacing={2}
      direction="column"
      style={{
        margin: "40px 0px 0px 0px",
        padding: "0px 20px 0px 20px",
        borderRight: "2px solid #56949F",
      }}
    >
      <Typography variant="h3">List Owner</Typography>
      <ListItem>
        <Typography variant="body1">{owner.name}</Typography>
      </ListItem>
      <Typography variant="h3">List Members</Typography>
      <List>
        {listDetailData.memberList.map((memberId) => {
          const member = userList.find((user) => user.id === memberId);

          return (
            <ListItem
              key={memberId}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "left",
              }}
            >
              <Typography variant="body1">
                {member ? member.name : `User ID: ${memberId}`}
              </Typography>
              {loggedInUser?.id === listDetailData.owner ? (
                <DeleteButton
                  itemId={memberId}
                  handleDelete={handlerMap.handleDeleteMember}
                />
              ) : (
                ""
              )}
            </ListItem>
          );
        })}
      </List>
      {loggedInUser?.id === listDetailData.owner ? <AddMemberButton /> : ""}
      {listDetailData.memberList.includes(loggedInUser?.id) ? (
        <LeaveButton />
      ) : (
        ""
      )}
    </Stack>
  );
}
