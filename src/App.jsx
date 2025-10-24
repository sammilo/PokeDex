import { useState } from 'react'
import './App.css'

export default function App() {
  const [imageData, setImageData] = useState(null); 
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [banList, setBanList] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  function randPokemon() {
    setLoading(true);
    setError(null);
    const randomId = Math.floor(Math.random() * 1025) + 1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        setImageData(data.sprites.front_default);
        setName(data.name);
        setType(data.types[0].type.name);
        setHeight(data.height);
        setWeight(data.weight);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }

  return (
    <>
      <div className="container">
        <h1 className="title">PokeDex</h1>
        <button onClick={randPokemon} disabled={loading}>
          {loading ? 'Loading...' : 'Get Random Pokémon'}
        </button>
        {error && <p>Error: {error.message}</p>}
        {imageData && !loading && (
          <div>
            <img src={imageData} alt="Random Pokémon" />
          </div>
        )}
        <h2 className="name">{name}</h2>
        <div className="attributes">
          <button>{type}</button>
          <button>{height} dm</button>
          <button>{weight} hg</button>
        </div>
      </div>
    </>
  )
}