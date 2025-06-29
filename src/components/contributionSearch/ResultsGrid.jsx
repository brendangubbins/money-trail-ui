import React, { useMemo, useEffect, useState, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';

import { themeAlpine, colorSchemeDark  } from 'ag-grid-community';

import SearchBar from './SearchBar';
import StateDropdown from './StateDropdown';
import contributionService from '../../services/service';

const myTheme = themeAlpine.withPart(colorSchemeDark).withParams({ accentColor: 'blue' });

const defaultColDef = {
  editable: true,
  minWidth: 100,
  filter: true,
};

export default function ResultsGrid() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [results, setResults] = useState([]);

  const gridRef = useRef(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const response = await contributionService.getContributions({});
        setResults(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    initializeData();
  }, []);

  const autoSizeStrategy = useMemo(() => {
    return {
      type: 'fitCellContents'
    };
  }, []);

  const columnDefs = useMemo(() => [
    { headerName: 'Name', field: 'name', minWidth: 200 },
    { headerName: 'Clean Transaction Date', field: 'transaction_dt_clean' },
    { 
      headerName: 'Transaction Amount', 
      field: 'transaction_amt', 
        valueFormatter: params => {
          const value = Number(params.value);
          if (isNaN(value)) return '';
          return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
    },
    { headerName: 'Entity Type', field: 'entity_tp' },
    { headerName: 'City', field: 'city' },
    { headerName: 'State', field: 'state' },
    { headerName: 'Zip Code', field: 'zip_code' },
    { headerName: 'Transaction PGI', field: 'transaction_pgi' },
    { headerName: 'Amendment Indicator', field: 'amndt_ind' },
    { headerName: 'Employer', field: 'employer' },
    { headerName: 'Occupation', field: 'occupation' },
    { headerName: 'Transaction Date', field: 'transaction_dt', hide: true },
    { headerName: 'Sub ID', field: 'sub_id', hide: true },
    { headerName: 'Committee ID', field: 'cmte_id', hide: true },
    { headerName: 'Other ID', field: 'other_id', hide: true },
    { headerName: 'Transaction ID', field: 'tran_id', hide: true },
    { headerName: 'Report Type', field: 'rpt_tp', hide: true },
    { headerName: 'File Number', field: 'file_num', hide: true },
    { headerName: 'Memo Code', field: 'memo_cd', hide: true },
    { headerName: 'Image Number', field: 'image_num', hide: true },
    { headerName: 'Memo Text', field: 'memo_text', hide: true },
    { headerName: 'Transaction Type', field: 'transaction_tp', hide: true },
  ], []);

  const handleSearch = async () => {
    console.log('Searching for:', name, city, state);

    const data = await contributionService.getContributions({ 'name': name, 'city': city, 'state': state });
    setResults(data);
  };

  const onButtonExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  return (
    <div style={{ margin: '1rem 1rem' }}>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <SearchBar label="Name" value={name} onChange={setName} />
          <SearchBar label="City" value={city} onChange={setCity} />
          <StateDropdown label="State" value={state} onChange={setState} />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={onButtonExport}
          >
            Export CSV
          </button>
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div style={{ height: 400, width: '100%' }}>
        <AgGridReact
          ref={gridRef}
          rowData={results}
          columnDefs={columnDefs}
          theme={myTheme}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={50}
          autoSizeStrategy={autoSizeStrategy}
        />
      </div>

    </div>
  );
}
