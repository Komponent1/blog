import React from 'react';
import Image from "next/image";
import { observer } from "mobx-react";
import {GameData} from '../dto/steam.dto.game';
import {useViewData} from '../hooks/steam.hooks.viewData';
import {Infobox} from '../components';
import { STEAM_LOGO_RATIO } from "../../common/common.constant/common.constant.imageRatio";

type Props = {
  owedGameDatas: GameData[];
};
const SteamViewBoard: React.FC<Props> = observer(({
  owedGameDatas,
}) => {
  const {mostPlayedGame, allPlayTime, mostPlayedTag} = useViewData(owedGameDatas);
  return (
    <div className="bg-gradient-to-tr from-slate-600 to-slate-900 min-h-screen w-screen grid place-items-center">
      <div className="absolute top-2">
        <Image src="/steam-logo.png" alt="Steam Logo" layout="fixed" width={1000} height={1000 * STEAM_LOGO_RATIO} className="-rotate-12" />
      </div>
      <div className="absolute bg-gradient-to-tr from-slate-600 to-slate-900 h-screen w-screen grid place-items-center opacity-90" />
      <div className="z-50">
        <div className="w-screen flex flex-row flex-wrap">
          <div className="flex-1 p-6 md:mt-16 grid grid-cols-1 gap-6 xl:grid-cols-3 auto-rows-auto">
            <Infobox title="총 플레이 타임" information={`${Math.floor(allPlayTime / 60)} 시간`} />
            <Infobox title="보유한 게임 수" information={String(owedGameDatas.length)} />
            <Infobox title="가장 많이 플레이한 게임" information={mostPlayedGame.system_data.name} />
            <Infobox title="가장 많이 플레이한 게임 타임" information={`${Math.floor(mostPlayedGame.personal_data.playtime_forever / 60)} 시간`} />
            {mostPlayedTag[0] && (
              <Infobox title="가장 많이 플레이한 태그" information={mostPlayedTag[0].tag} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
export default SteamViewBoard;