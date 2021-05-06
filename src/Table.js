import React from "react";

import { useTable, useSortBy} from "react-table";


export default function Table({ columns, data, loading, total }) {




  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    
  } = useTable(
    {
      columns,
      data,
      loading,
      total
    },
    
  
    useSortBy
  );
 

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 100);

  return (
    
    <>
   
      <table  className="table" {...getTableProps()}>
        <thead className= "table__head">
          {headerGroups.map((headerGroup) => (
            <tr className="table__row" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th className= "table__heading"{...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted 
                      ? column.isSortedDesc
                        ? " 🔽" 
                        : " 🔼"
                      : "" }
                      
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
      
        <tbody className="table__body" {...getTableBodyProps()}>
        
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr className="table__row" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className="table__cell"
                      {...cell.getCellProps({
                  
                      })}
                    >
                      {cell.render("Cell")}
                    
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
        
    </>
  )
}
