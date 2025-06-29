import { useEffect, useState } from "react";
import { contributionService } from "../../services/service";

export default function StateDropdown({ value, onChange }) {
  const [states, setStates] = useState([]);

  useEffect(() => {
    contributionService.getStates().then(setStates).catch(console.error);
  }, []);

  return (
    <select 
      value={value} 
      onChange={e => onChange(e.target.value)} 
      style={{ 
        height: '2.5rem', 
        fontSize: '1rem', 
        padding: '0 0.25rem', 
        boxSizing: 'border-box'
      }}
    >
      <option label="State" value="" style={{ color: 'rgb(255, 255, 255, 0.3)' }}></option>
      {states.map(state => (
        <option key={state} value={state}>{state}</option>
      ))}
    </select>
  );
}
