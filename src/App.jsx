import { useState, useEffect, useRef } from "react";
import Card from "./Card.jsx";
import "./App.css";
import TypeKey from "./TypeKey.jsx";

const pokemons = [
  { id: 1, name: "Bulbasaur", type: "Grass", hp: 45, attack: 49 },
  { id: 4, name: "Charmander", type: "Fire", hp: 39, attack: 52 },
  { id: 7, name: "Squirtle", type: "Water", hp: 44, attack: 48 },
  { id: 25, name: "Pikachu", type: "Electric", hp: 35, attack: 55 },
  { id: 6, name: "Charizard", type: "Fire", hp: 78, attack: 84 },
  { id: 9, name: "Blastoise", type: "Water", hp: 79, attack: 83 },
  { id: 3, name: "Venusaur", type: "Grass", hp: 80, attack: 82 },
  { id: 150, name: "Mewtwo", type: "Psychic", hp: 106, attack: 110 },
  { id: 39, name: "Jigglypuff", type: "Normal", hp: 115, attack: 45 },
  { id: 143, name: "Snorlax", type: "Normal", hp: 160, attack: 110 },
  { id: 94, name: "Gengar", type: "Ghost", hp: 60, attack: 65 },
  { id: 131, name: "Lapras", type: "Water", hp: 130, attack: 85 },
  { id: 133, name: "Eevee", type: "Normal", hp: 55, attack: 55 },
  { id: 149, name: "Dragonite", type: "Dragon", hp: 91, attack: 134 },
  { id: 59, name: "Arcanine", type: "Fire", hp: 90, attack: 110 },
  { id: 65, name: "Alakazam", type: "Psychic", hp: 55, attack: 50 },
  { id: 68, name: "Machamp", type: "Fighting", hp: 90, attack: 130 },
  { id: 76, name: "Golem", type: "Rock", hp: 80, attack: 120 },
  { id: 130, name: "Gyarados", type: "Water", hp: 95, attack: 125 },
  { id: 148, name: "Dragonair", type: "Dragon", hp: 61, attack: 84 },
];

function App() {
  const [displayedPokemons, setDisplayedPokemons] = useState(pokemons);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  //Dropdown state for type filter (if implemented as dropdown instead of buttons)
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  // Sort the Pokémon based on the selected filter and update the displayedPokemons state
  function handleSort(type) {
    let sorted = [...displayedPokemons];

    if (type === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === "hp") {
      sorted.sort((a, b) => b.hp - a.hp);
    } else if (type === "attack") {
      sorted.sort((a, b) => b.attack - a.attack);
    }

    setDisplayedPokemons(sorted);
  }

  // Filter the displayedPokemons based on search term and selected type
  const filteredPokemons = displayedPokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? pokemon.type === selectedType : true;
    return matchesSearch && matchesType;
  });

  // Define a mapping of Pokémon types to colors, which can be edited by Card components
  const [colorsByType, setColorsByType] = useState({
    Grass: "#78C850",
    Fire: "#F08030",
    Water: "#6890F0",
    Electric: "#F8D030",
    Psychic: "#F85888",
    Normal: "#bcbcbaff",
    Ghost: "#542f77",
    Dragon: "#7038F8",
    Fighting: "#C03028",
    Rock: "#B8A038",
  });

  const handleSelectType = (type) => {
    // toggle the type selection if the same type is clicked
    setSelectedType((prev) => (prev === type ? null : type));
  };

  const setTypeColor = (type, color) => {
    setColorsByType((prev) => ({ ...prev, [type]: color }));
  };

  return (
    <div className="App">
      <h1>Pokédex Sort!</h1>
      <p>
        Explore the world of Pokémon through search filters! Click on a card to
        see each Pokémon's stats.
      </p>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: 8, width: "100%", maxWidth: 200, marginTop: 20 }}
      />

      {/* Sort by buttons */}
      <button onClick={() => handleSort("name")}>A–Z</button>
      <button onClick={() => handleSort("hp")}>HP (highest to lowest)</button>
      <button onClick={() => handleSort("attack")}>
        Attack (highest to lowest)
      </button>
      <button
        style={{
          backgroundColor: selectedType
            ? colorsByType[selectedType]
            : "#f0f0f0",
          color: selectedType ? "#fff" : "#000",
        }}
        onClick={() => setShowTypeDropdown((prev) => !prev)}
      >
        {selectedType || "Type"}
      </button>
      <div className={`dropdown ${showTypeDropdown ? "open" : ""}`}>
        <TypeKey
          colorsByType={colorsByType}
          selectedType={selectedType}
          onSelectType={(type) => {
            setSelectedType(type);
            setShowTypeDropdown(false);
          }}
        />
      </div>
      <button
        style={{ backgroundColor: "#696969", color: "#fff" }}
        onClick={() => {
          setDisplayedPokemons(pokemons);
          setSelectedType(null);
          setSearchTerm("");
          setShowTypeDropdown(false);
        }}
      >
        Reset
      </button>

      {/* Type color key */}
      {/* <div className="type-key-container">
        <TypeKey colorsByType={colorsByType} selectedType={selectedType} onSelectType={handleSelectType} />
      </div> */}

      <div className="cards-container">
        {filteredPokemons.map((pokemon) => (
          <Card
            key={pokemon.id}
            pokemon={pokemon}
            colorsByType={colorsByType}
            setTypeColor={setTypeColor}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
