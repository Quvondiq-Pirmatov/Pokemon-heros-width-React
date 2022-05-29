import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import './App.scss';
import { useState } from 'react';

function App() {
  const[pokName, setPokName] = useState("");
  const[pokemon, setPokemon] = useState({
      name: "",
      species: "",
      img: "",
      attack: "",
      defence: "",
      type: ""
  });

  const fetchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokName}`)
    .then((response) => {
      setPokemon({
        name: pokName,
        species: response.data.species.name,
        img: response.data.sprites.front_default,
        attack: response.data.stats[1].base_stat,
        defence: response.data.stats[2].base_stat,
        type: response.data.types[0].type.name
      });
      console.log(response);
    })
    .catch(() => {
      console.error("Xatolik");
    })
  }

  return (
    <>
      <div className="header text-center py-3"><h1>Pokemon Heroes Search</h1></div>

      <div className="searchArea text-center py-4">
        <input className='search px-4' onChange={(event) => { setPokName(event.target.value) }} 
          type="text" 
          placeholder="hero's name"/>
        <button className='btn btn-danger ms-2' onClick={fetchPokemon}>Search</button>
      </div>

      <div className="resultCard text-center py-3">
        <div className="card border">

          <h1>{pokemon.name}</h1>
          <img className='heroImg border' src={pokemon.img} alt="hero's image" />
          <p> Species: {pokemon.species} </p>
          <h3> Attack: {pokemon.attack} </h3>
          <h4> Defence: {pokemon.defence} </h4>
          <p> Type: {pokemon.type} </p>

        </div>
      </div>
    </>
  );
}

export default App;
