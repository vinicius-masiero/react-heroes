import { ChangeEvent, useState } from "react";
import { Hero } from "./types/hero";
import "./App.css";
import { HEROES } from "./data/mock-heroes";

function App() {
  const [heroes, setHeroes] = useState<Hero[]>(HEROES);
  const [selectedHeroId, setSelectedHeroId] = useState<number | null>(null);

  const selectedHero = heroes.find((hero) => hero.id === selectedHeroId);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedName = event.target.value;
    setHeroes((prevHeroes) =>
      prevHeroes.map((hero) => {
        if (hero.id === selectedHeroId) {
          return { ...hero, name: updatedName };
        }
        return hero;
      }),
    );
  };

  const handleSelectHero = (id: number) => {
    setSelectedHeroId(id);
  };

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl">My heroes</h2>
      <ul className="my-3 flex flex-col gap-2">
        {heroes.map((hero) => (
          <li
            key={hero.id}
            onClick={() => handleSelectHero(hero.id)}
            className="flex cursor-pointer"
          >
            <span className="rounded-l bg-slate-700 p-2 text-white">
              {hero.id}
            </span>
            <span className="w-1/4 rounded-r bg-slate-300 p-2">
              {hero.name}
            </span>
          </li>
        ))}
      </ul>

      {selectedHero && (
        <>
          <h2 className="text-2xl">Details</h2>
          <div>
            <span className="font-bold">ID:</span> {selectedHero.id}
          </div>
          <div className="space-x-2">
            <span className="font-bold">Name:</span>
            <span className="uppercase">{selectedHero.name}</span>
          </div>
          <div className="mt-3 flex flex-col gap-2 border-t">
            <label>Hero name</label>
            <input
              type="text"
              placeholder="Name"
              className="w-1/4 rounded-lg border border-gray-300 p-2"
              value={selectedHero.name}
              onChange={handleNameChange}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
