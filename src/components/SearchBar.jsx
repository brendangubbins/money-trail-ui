export default function SearchBar({ label, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={{ marginBottom: '0.25rem', fontSize: '0.9rem' }}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          height: '2.5rem',
          fontSize: '1rem',
          padding: '0 0.5rem',
          boxSizing: 'border-box'
        }}
      />
    </div>
  )
}