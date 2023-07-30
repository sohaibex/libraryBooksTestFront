import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import ActionsCellRenderer from "./ActionsCellRenderer";
import "./MainComponent.css";

const MainComponent = () => {
  const [rowData, setRowData] = useState(null);

  const onGridReady = () => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  };
  return (
    <div className="container">
      <div className="title-container">
        <h1>Books Library</h1>
      </div>
      <div className="ag-theme-alpine grid-container">
        <AgGridReact
          columnDefs={[
            { field: "athlete" },
            { field: "year" },
            {
              field: "Actions",
              minWidth: 175,
              cellRenderer: "ActionsCellRenderer",
            },
          ]}
          defaultColDef={{
            editable: true,
            sortable: true,
            flex: 1,
            minWidth: 100,
            filter: true,
            resizable: true,
          }}
          onGridReady={onGridReady}
          editType={"fullRow"}
          rowData={rowData}
          components={{
            ActionsCellRenderer: ActionsCellRenderer,
          }}
        />
      </div>
    </div>
  );
};

export default MainComponent;
