import { useState } from 'react'
import './App.css'

function Card({ pokemon }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const typeColors = {
    Grass: '#78C850',
    Fire: '#F08030',
    Water: '#6890F0',
    Electric: '#F8D030',
    Psychic: '#F85888',
    Normal: '#f0f0f0',
    Ghost: '#705898',
    Dragon: '#7038F8',
    Fighting: '#C03028',
    Rock: '#B8A038'
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const bg = typeColors[pokemon.type] || '#fff';

  return (
    <div className={`pokemon-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="card-front" style={{ backgroundColor: bg }}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          alt={pokemon.name}
        />
        <h2>{pokemon.name}</h2>
      </div>
      <div className="card-back">
        <p>Type: {pokemon.type}</p>
        <p>HP: {pokemon.hp}</p>
        <p>Attack: {pokemon.attack}</p>
      </div>
    </div>
  );
}

export default Card;