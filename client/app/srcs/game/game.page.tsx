import React, { useState } from 'react';
import Image from "next/image";
import { useRouter } from "next/router";
import GameList from './game-list.json';
import Navbar from "../common/common.components/common.components.navbar";
import FlipCard from "../main/components/main.components.flipcard";
import Sign from './common/component/sign';

type GameConfig = {
  [key: string]: {
    title: string;
    path: string;
    description: string;
    thumbnail: string;
  }
};
enum SignType {
  NONE = 'none',
  SIGNIN = 'signin',
  SIGNUP = 'signup',
}
const GamePage: React.FC = () => {
  const router = useRouter();
  const [sign, setSign] = useState<SignType>(SignType.NONE);

  return (
    <div className="bg-cover bg-center min-h-screen w-screen bg-linear-to-tr from-slate-600 to-slate-900 pt-32 px-12">
      <Navbar />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4 auto-rows-auto">
        <button type="button" className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4" onClick={() => setSign(SignType.SIGNIN)}>
          <h2 className="text-white">Sign In</h2>
        </button>
        <button type="button" className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4" onClick={() => setSign(SignType.SIGNUP)}>
          <h2 className="text-white">Sign Up</h2>
        </button>

        {Object.values(GameList as GameConfig).map((game) => (
          <FlipCard
            key={game.path}
            front={(
              <div className="">
                <Image
                  key={game.path}
                  src={game.thumbnail}
                  alt={game.title}
                  width={200}
                  height={200}
                  className="object-cover"
                />
                <h2 className="text-white mt-3">{game.title}</h2>
              </div>
          )}
            customClass="group w-64 h-72"
            back={(
              <div className="text-white">
                <p>{game.description}</p>
              </div>
          )}
            onClick={() => router.push(game.path)}
          />
        ))}
      </div>
      {sign !== SignType.NONE && (
        <Sign type={sign} close={() => setSign(SignType.NONE)} />
      )}
    </div>
  );
};

export default GamePage;
