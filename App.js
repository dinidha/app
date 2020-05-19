import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useHistory } from "react-router-dom";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
const columns = [
  {
    headerName: "Name",
    field: "name",
    width: 200
  },
  {
    headerName: "Symbol",
    field: "symbol",
    width: 200
  },
  {
    headerName: "Industry",
    field: "industry",
    width: 200
  }
];

// Hard-code for demo. Use fetch inside useEffect to retrieve from API
const rowData = [
  { name: "A Company", symbol: "AAA", industry: "A Industry" },
  { name: "B Company", symbol: "BBB", industry: "B Industry" },
  { name: "C Company", symbol: "CCC", industry: "C Industry" }
];

export default function App() {
  const [stocks, setStocks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // This is where you want to fetch stocks from APIz
    const url = 'http://131.181.190.87:3000/stocks/symbols';

    fetch(url) 
    .then((res) => res.json())
    .then((res) => useStocks(res))
  }, []);

  return (
    <div className="App">
      <div
        className="ag-theme-alpine"
        style={{
          height: "600px",
          width: "600px"
        }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={stocks}
          onRowClicked={row => history.push(`/stock/${row.data.symbol}`)}
        />
      </div>
    </div>
  );
}
