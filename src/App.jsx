import { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import SearchBar from './components/SearchBar';
import { themeAlpine, colorSchemeDark  } from 'ag-grid-community';

const myTheme = themeAlpine.withPart(colorSchemeDark).withParams({ accentColor: 'blue' });

const defaultColDef = {
  editable: true,
  // flex: 1,
  minWidth: 100,
  filter: true,
};

const SAMPLE_DATA = [
  { name: "Alice", city: "New York", amount: 500, date: "2024-01-01" },
  { name: "Bob", city: "Chicago", amount: 300, date: "2024-02-01" },
  { name: "Charlie", city: "San Francisco", amount: 800, date: "2024-03-01" },
];

export default function App() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [results, setResults] = useState(SAMPLE_DATA);

  const columnDefs = useMemo(() => [
    { headerName: 'Entity Type', field: 'entity_tp', flex: 1 },
    { headerName: 'Transaction Date', field: 'transaction_dt', flex: 1 },
    { headerName: 'Sub ID', field: 'sub_id', flex: 1 },
    { headerName: 'Name', field: 'name', flex: 1 },
    { 
      headerName: 'Transaction Amount', 
      field: 'transaction_amt', 
      flex: 1, 
        valueFormatter: params => {
          const value = Number(params.value);
          if (isNaN(value)) return '';
          return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
    },
    { headerName: 'Committee ID', field: 'cmte_id', flex: 1 },
    { headerName: 'City', field: 'city', flex: 1 },
    { headerName: 'Other ID', field: 'other_id', flex: 1 },
    { headerName: 'Amendment Indicator', field: 'amndt_ind', flex: 1 },
    { headerName: 'State', field: 'state', flex: 1 },
    { headerName: 'Transaction ID', field: 'tran_id', flex: 1 },
    { headerName: 'Report Type', field: 'rpt_tp', flex: 1 },
    { headerName: 'Zip Code', field: 'zip_code', flex: 1 },
    { headerName: 'File Number', field: 'file_num', flex: 1 },
    { headerName: 'Transaction PGI', field: 'transaction_pgi', flex: 1 },
    { headerName: 'Employer', field: 'employer', flex: 1 },
    { headerName: 'Memo Code', field: 'memo_cd', flex: 1 },
    { headerName: 'Image Number', field: 'image_num', flex: 1 },
    { headerName: 'Occupation', field: 'occupation', flex: 1 },
    { headerName: 'Memo Text', field: 'memo_text', flex: 1 },
    { headerName: 'Transaction Type', field: 'transaction_tp', flex: 1 },
    { headerName: 'Clean Transaction Date', field: 'transaction_dt_clean', flex: 1 },
  ], []);

  const handleSearch = () => {
    console.log('Searching for:', name, city);
    const filtered = SAMPLE_DATA.filter(item => {
      const matchName = name ? item.name.toLowerCase().includes(name.toLowerCase()) : true;
      const matchCity = city ? item.city.toLowerCase().includes(city.toLowerCase()) : true;
      return matchName && matchCity;
    });
    console.log('Filtered results:', filtered);
    setResults(filtered);
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'sans-serif', padding: '2rem' }}>
      
      <div style={{ justifySelf: 'center' }}>
        <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Search Contributions</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginBottom: '1rem' }}>
          <SearchBar label="Name" value={name} onChange={setName} />
          <SearchBar label="City" value={city} onChange={setCity} />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={results}
          columnDefs={columnDefs}
          theme={myTheme}
          defaultColDef={defaultColDef}
          // pagination={true}
          // paginationPageSize={5}
        />
      </div>
    </div>
  );
}
