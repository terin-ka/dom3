import { createContext, useState, useMemo } from "react";
export const ListOverviewContext = createContext();

function ListOverviewProvider({ children }) {
  const [overviewData, setOverviewData] = useState([
    {
      listId: "tdl01",
      name: "Nákupní list 1",
      isArchived: false,
      owner: "u1",
      memberList: ["u3", "u2"],
      itemList: [
        { id: "01", name: "Jablko", count: 5, resolved: false },
        { id: "02", name: "Smetana", count: 1, resolved: false },
        { id: "03", name: "Skořice", count: 2, resolved: false },
        { id: "04", name: "Vejce", count: 2, resolved: false },
        { id: "05", name: "Kokosové mléko", count: 2, resolved: false },
        { id: "06", name: "Fazole", count: 2, resolved: false },
      ],
    },
    {
      listId: "tdl02",
      name: "Nákupní list 2",
      isArchived: false,
      owner: "u2",
      memberList: ["u4", "u1"],
      itemList: [
        { id: "01", name: "Brambůrky", count: 5, resolved: false },
        { id: "02", name: "Okurka", count: 1, resolved: false },
        { id: "03", name: "Nanuk", count: 2, resolved: false },
        { id: "04", name: "máslo", count: 2, resolved: false },
      ],
    },
  ]);

  const [showArchived, setShowArchived] = useState(false);
  const filteredData = useMemo(() => {
    if (!Array.isArray(overviewData)) {
      console.error("overviewData is not iterable:", overviewData);
      return [];
    }
    if (showArchived) {
      return overviewData.filter((list) => list.isArchived);
    } else {
      return [...overviewData];
    }
  }, [overviewData, showArchived]);
  /*const filteredData = useMemo(() => {
    if (showArchived) {
      return overviewData.filter((list) => list.isArchived);
    }
    else {
      return [...overviewData];
    }
  }, [overviewData, showArchived]);*/

  const value = {
    overviewData: filteredData,
    setOverviewData: setOverviewData,
    handlerMap: {
      handleCreateList: ({ name, owner }) => {
        setOverviewData((current) => [
            ...current,
            {
              listId: Math.random().toString(),
              name: name,
              isArchived: false,
              owner: owner,
              memberList: [], 
              itemList: [],  
            },
        ]);
      },
      handleDeleteList: ({ id }) => {
        setOverviewData((current) => {
          return current.filter((list) => list.listId !== id);
        });
      },
      handleArchive: ({ id }) => {
        setOverviewData((current) => {
          const index = current.findIndex((list) => list.listId === id);
          const updatedList = {
            ...current[index],
            isArchived: !current[index].isArchived,
          };
          return [
            ...current.slice(0, index),
            updatedList,
            ...current.slice(index + 1),
          ];
        });
      },
    },
    showArchived,
    toggleShowArchived: () => setShowArchived((current) => !current),
  };

  return (
    <ListOverviewContext.Provider value={value}>
      {children}
    </ListOverviewContext.Provider>
  );
}

export default ListOverviewProvider;
