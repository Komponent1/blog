import { ScoreResponse, UserResponse } from './dto/game.common.dto';
import { SCORE_SAVE_KEY } from './game.common.constant';

export const getHashKey = (): string | null => {
  if (typeof window === undefined) return null;
  const key = window.localStorage.getItem(SCORE_SAVE_KEY);
  return key;
};
export const saveHashKey = (key: string) => {
  if (typeof window === undefined) return;
  window.localStorage.setItem(SCORE_SAVE_KEY, key);
};
export const saveScore = async ({
  uid,
  gid,
  score,
}: {
  uid: string;
  gid: string;
  score: number;
}) => {
  const response = await fetch(`/seolim/score`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid, gid, score }),
  });
  if (!response.ok) {
    throw new Error('Failed to save score');
  }
};
export const getScore = async (uid: string, gid: string): Promise<ScoreResponse> => {
  const response = await fetch(`/seolim/${uid}/score/${gid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to get score');
  }
  const data = await response.json();
  return data.score;
};
export const createUser = async (nickname: string): Promise<UserResponse> => {
  const response = await fetch(`/seolim/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nickname }),
  });
  if (!response.ok) {
    throw new Error('Failed to create user');
  }
  const data = await response.json();
  return data;
};
