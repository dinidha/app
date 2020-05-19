import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

const columns = [
  {
    headerName: "Date",
    field: "timestamp",
    width: 200
  },
  {
    headerName: "Open",
    field: "open",
    width: 200
  },
  {
    headerName: "High",
    field: "high",
    width: 200
  },
  {
    headerName: "Low",
    field: "low",
    width: 200
  },
  {
    headerName: "Close",
    field: "close",
    width: 200
  },
  {
    headerName: "Volumes",
    field: "volumes",
    width: 200
  }
];

const rowData = [
  { date: "2020-03-23T14:00:00.000Z", open: 63.37, high: 67.5599, low: 62.09, close: 63.37, volumes: 2989560}
];


export default function Stock() {
  const [stocks, setStocks] = useState([]);
  const { symbol } = useParams();
  const history = useHistory();

  // Used to retrieve symbol from path param
  useEffect(() => {
    // This is where you will need to fetch information about a given stock.
    // Not empty dependency array - you will likely want to change this
    const url = `http://131.181.190.87:3000/stocks/${symbol}`;
     fetch(url)
     .then((res) => res.json())
     .then((res) => setStocks(res))
  }, []);

  return (
    <div>
      <button onClick={() => history.push("/")}>Home</button>
      <p>Stock component with symbol: {symbol}.</p>

      <p>
        You now have access to the symbol for a company and can use this for API
        queries.
      </p>
      <AgGridReact
          columnDefs={columns}
          rowData={stocks}
          onRowClicked={row => history.push(`/stock/${row.data.symbol}`)}
        />
      <p>The rest is up to you. Good luck! :)</p>
    </div>
  );
}
