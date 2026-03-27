import Circle from './Circle.jsx'

// TypeKey now expects a mapping object `colorsByType`, e.g. { Grass: '#78C850', ... }
// It also accepts `selectedType` and `onSelectType(type)` so the parent can control filtering.
const TypeKey = ({ colorsByType = {}, selectedType = null, onSelectType }) => {
  const types = ["Grass", "Fire", "Water", "Electric", "Psychic", "Normal", "Ghost", "Dragon", "Fighting", "Rock"];

  return (
    <div className="type-key">
        <div
      key="all"
      role={onSelectType ? 'button' : undefined}
      tabIndex={onSelectType ? 0 : undefined}
      onClick={() => onSelectType && onSelectType(null)}
      onKeyDown={(e) => {
        if (onSelectType && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onSelectType(null);
        }
      }}
      className={`type-item ${selectedType === null ? 'active' : ''}`}
    >
      <Circle
  color="white"
  style={{ border: "1px solid black", boxSizing: "border-box" }}
/>
      <span className="type-label">All</span>
    </div>
      {types.map((type) => {
        const active = selectedType === type;
        return (
          <div
            key={type}
            role={onSelectType ? 'button' : undefined}
            tabIndex={onSelectType ? 0 : undefined}
            onClick={() => onSelectType && onSelectType(type)}
            onKeyDown={(e) => { if (onSelectType && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onSelectType(type); } }}
            className={`type-item ${active ? 'active' : ''}`}
          >
            <Circle color={colorsByType[type] || '#ddd'} />
            <span className="type-label">{type}</span>
          </div>
        );
      })}
    </div>
  );
};



export default TypeKey;