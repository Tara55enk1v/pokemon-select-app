import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import SelectPokemon from "./SelectPokemon";

interface Pokemon {
  name: string;
  sprite: string;
}

const TrainerForm: React.FC = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const isValid =
        firstName.length >= 2 &&
        firstName.length <= 12 &&
        lastName.length >= 2 &&
        lastName.length <= 12 &&
        selectedPokemon.length === 4;

    return (
      <div className="p-8 max-w-lg mx-auto">
        <input type="text" placeholder="First Name" className="border p-2 w-full mb-4" onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" className="border p-2 w-full mb-4" onChange={(e) => setLastName(e.target.value)} />
        <SelectPokemon selected={selectedPokemon} setSelected={setSelectedPokemon} />
        <button disabled={!isValid} className="mt-4 w-full bg-blue-500 text-white p-2 disabled:bg-gray-300" onClick={() => setIsModalOpen(true)}>
          Show Team
        </button>
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md">
              <h2 className="text-xl font-bold">Trainer: {firstName} {lastName}</h2>
              <div className="flex gap-2 mt-4">
                {selectedPokemon.map((p) => (
                  <p className="text-center">
                    <img key={p.name} src={p.sprite} alt={p.name} className="w-16 h-16" />
                    <span className="capitalize">{p.name}</span>
                  </p>
                ))}
              </div>
              <button className="mt-4 bg-red-500 text-white p-2" onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  };
  
  export default TrainerForm;