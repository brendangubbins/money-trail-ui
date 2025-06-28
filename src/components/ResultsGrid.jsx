import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function ResultsGrid({ results }) {
  const columnDefs = useMemo(() => [
    { headerName: "Name", field: "name", flex: 1 },
    { headerName: "City", field: "city", flex: 1 },
    { headerName: "Amount", field: "amount", flex: 1 },
    { headerName: "Date", field: "date", flex: 1 },
  ], []);

  return (
    <div className="ag-theme-alpine" style={{ height: 300, width: '100%' }}>
      <AgGridReact
        rowData={results}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={5}
      />
    </div>
  );
}
