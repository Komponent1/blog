/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useCallback, useState } from 'react';
import { createUser, login, saveHashKey } from '../game.common.score';

type Props = {
  type: 'signin' | 'signup';
  close: Function;
};
const Sign: React.FC<Props> = ({type, close}) => {
  const [nickname, setNickname] = useState('');
  const [pw, setPw] = useState('');
  const onSubmit = useCallback(() => {
    if (nickname === '' || pw === '') return;
    if (type === 'signup') {
      createUser(nickname, pw).then((user) => {
        saveHashKey(user.uid);
        close();
      }).catch(() => {
        /** 가입 실패 처리 */
      });
    } else {
      login(nickname, pw).then((user) => {
        saveHashKey(user.uid);
        close();
      }).catch(() => {
        /** 로그인 실패 처리 */
      });
    }
  }, [nickname, pw, close, type]);
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto h-screen w-screen flex items-center justify-center backdrop-filter backdrop-blur-sm"
      onClick={() => close()}
    >
      <form className="bg-gray-900 w-1/2 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4">
          <input
            className="shadow-sm appearance-none border rounded-sm w-full p-3 text-gray-700 leading-tight focus:ring-3 transform transition hover:scale-105 duration-300 ease-in-out"
            id="signin_id"
            type="text"
            value={nickname}
            placeholder="계정명"
            onChange={(e) => setNickname(e.target.value)}
          />
          <input
            className="shadow-sm appearance-none border rounded-sm w-full p-3 text-gray-700 leading-tight focus:ring-3 transform transition hover:scale-105 duration-300 ease-in-out"
            id="signin_pw"
            type="password"
            value={pw}
            placeholder="비밀번호"
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onSubmit();
              }
            }}
          />
        </div>
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={() => onSubmit()}
            className="bg-linear-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded-sm focus:ring-3 transform transition hover:scale-105 duration-300 ease-in-out"
            type="button"
          >
            {type === 'signup' ? '가입' : '로그인'}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Sign;
