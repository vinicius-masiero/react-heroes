import { useState, useRef, useEffect } from "react";
import { Hero } from "../types/hero";
import { Link } from "react-router-dom";
import { useMessages } from "../context/MessageContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function HeroesList() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const fetched = useRef(false);
  const { addMessage } = useMessages();

  useEffect(() => {
    if (!fetched.current) {
      fetch(`${apiUrl}/heroes`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setHeroes(data);
          addMessage("Heroes loaded");
        });
      fetched.current = true;
    }
  }, [addMessage]);

  const deleteHero = async (hero: Hero) => {
    try {
      const response = await fetch(`${apiUrl}/heroes/${hero.id}`, {
        method: "DELETE",
      });

      if (!response.ok)
        throw new Error("Request failed:" + response.statusText);

      setHeroes((prevHeroes) => prevHeroes.filter((h) => h.id !== hero.id));
      addMessage(`Hero ${hero.name} deleted`);
    } catch (error) {
      console.log(error);
      addMessage("Failed to delete hero");
    }
  };

  return (
    <>
      <div className="flex gap-3">
        <h2 className="text-2xl">My heroes</h2>
        <Link to="/heroes/create" className="btn">
          Create new hero
        </Link>
      </div>
      <ul className="my-3 flex flex-col gap-2">
        {heroes.map((hero) => (
          <Link
            to={`/heroes/${hero.id}`}
            key={hero.id}
            className="flex cursor-pointer"
          >
            <span className="rounded-l bg-slate-700 p-2 text-white">
              {hero.id}
            </span>
            <div className="flex w-full justify-between rounded-r bg-slate-300 p-2">
              <span>{hero.name}</span>
              <span
                className="cursor-pointer rounded-md bg-red-800 px-1 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  deleteHero(hero);
                }}
              >
                Delete hero
              </span>
            </div>
          </Link>
        ))}
      </ul>
    </>
  );
}
