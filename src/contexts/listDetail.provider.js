import { createContext, useMemo, useState } from "react";
export const ListDetailContext = createContext();

function ListDetailProvider({ children }) {
  const [listDetailData, setListDetailData] = useState({});

  const [showUnresolved, setShowUnresolved] = useState(false);
  const filteredData = useMemo(() => {
    const result = { ...listDetailData };
    if (showUnresolved) {
      result.itemList = result.itemList.filter((item) => !item.resolved);
    }
    return result;
  }, [listDetailData, showUnresolved]);

  const value = {
    listDetailData: filteredData,
    setListData: setListDetailData,
    handlerMap: {
      handleRename: ({ name }) => {
        setListDetailData((current) => {
          current.name = name;
          return { ...current };
        });
      },
      handleCreateItem: ({ name, count = 1 }) => {
        setListDetailData((current) => ({
          ...current,
          itemList: [
            ...current.itemList,
            {
              id: Math.random().toString(),
              name: name,
              count: count,
              resolved: false,
            },
          ],
        }));
      },
      toggleResolveItem: ({ id }) => {
        setListDetailData((current) => {
          const itemIndex = current.itemList.findIndex(
            (item) => item.id === id
          );
          const updatedItem = {
            ...current.itemList[itemIndex],
            resolved: !current.itemList[itemIndex].resolved,
          };
          const newItemList = [
            ...current.itemList.slice(0, itemIndex),
            updatedItem,
            ...current.itemList.slice(itemIndex + 1),
          ];
          return { ...current, itemList: newItemList };
        });
      },
      handleDeleteItem: ({ id }) => {
        setListDetailData((current) => {
          const newItems = current.itemList.filter((item) => item.id !== id);
          return { ...current, itemList: newItems };
        });
      },
      handleDeleteMember: ({ id }) => {
        setListDetailData((current) => {
          const newMembers = current.memberList.filter(
            (memberId) => memberId !== id
          );
          return { ...current, memberList: newMembers };
        });
      },
      handleAddMember: ({ id }) => {
        setListDetailData((current) => {
          if (!current.memberList.includes(id)) {
            return {
              ...current,
              memberList: [...current.memberList, id],
            };
          }
          return current;
        });
      },
    },
    showUnresolved,
    toggleShowUnresolved: () => setShowUnresolved((current) => !current),
  };

  return (
    <ListDetailContext.Provider value={value}>
      {children}
    </ListDetailContext.Provider>
  );
}

export default ListDetailProvider;
