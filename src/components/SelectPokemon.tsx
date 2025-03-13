import React, { useState, useEffect } from "react";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/outline";;
import {ChevronDownIcon} from '@heroicons/react/24/solid'

interface Pokemon {
  name: string;
  sprite: string;
}

const SelectPokemon: React.FC<{ selected: Pokemon[]; setSelected: (p: Pokemon[]) => void }> = ({ selected, setSelected }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=100").then(async (res) => {
      const pokemonData = await Promise.all(
        res.data.results.map(async (p: { name: string; url: string }) => {
          const details = await axios.get(p.url);
          return { name: p.name, sprite: details.data.sprites.front_default };
        })
      );
      setPokemonList(pokemonData);
    });
  }, []);

  const handleSelect = (pokemon: Pokemon) => {
    if (selected.length < 4 && !selected.some((p) => p.name === pokemon.name)) {
      setSelected([...selected, pokemon]);
    }
  };

  const handleRemove = (name: string) => {
    setSelected(selected.filter((p) => p.name !== name));
  };

  return (
    <div>
      <div className="relative border p-2 rounded-md flex flex-wrap items-center gap-2 bg-white">
        {selected.map((p) => (
          <p key={p.name} className="flex items-center justify-center bg-gray-200 rounded-full px-4 py-1"> 
            <span className="capitalize">{p.name}</span>
            <XMarkIcon className="h-5 w-5 pt-1 cursor-pointer" onClick={() => handleRemove(p.name)} />
          </p>
        ))}
        <button className="ml-auto" onClick={() => setIsOpen(!isOpen)}>
          <ChevronDownIcon className="h-5 w-5" />
        </button>
      </div>
      {isOpen && (
        <div className="relative bg-white border rounded-md mt-2 max-h-60 overflow-y-auto">
          <input
            type="text"
            placeholder="Search Pokemon..."
            className="w-full p-2 border-b"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          {pokemonList
            .filter((p) => p.name.includes(search))
            .map((p) => (
              <div key={p.name} className="p-2 hover:bg-gray-100 cursor-pointer capitalize" onClick={() => handleSelect(p)}>
                {p.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SelectPokemon;