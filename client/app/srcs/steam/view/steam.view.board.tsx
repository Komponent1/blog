import React from 'react';
import Image from "next/image";
import { observer } from "mobx-react";
import {GameData} from '../dto/steam.dto.game';
import {useViewData} from '../hooks/steam.hooks.viewData';
import {
  Infobox, Dounutchart, Table, Card, Pagination,
  BgBlurImage,
} from '../components';
import { useAnalyzeTag } from "../hooks/steam.hooks.analyzeTag";
import {useAnalyzeGenres} from '../hooks/steam.hooks.analyzeGenres';
import { TABLE_VIEW_NUM, useGetTable } from "../hooks/steam.hooks.getTable";
import { PlayerSummary } from "../dto/steam.dto.api";
import { Typography } from "../../common/common.components";
import { num2wonComma } from "../utils/steam.util.string";

type Props = {
  owedGameDatas: GameData[];
  playerSummary: PlayerSummary;
};
const SteamViewBoard: React.FC<Props> = observer(({
  owedGameDatas,
  playerSummary,
}) => {
  const {mostPlayedGame, allPlayTime, totalPrice} = useViewData(owedGameDatas);
  const {tagPercentage} = useAnalyzeTag(owedGameDatas);
  const {genrePercentage} = useAnalyzeGenres(owedGameDatas);
  const {
    gameTable, viewData, setDataIndex, sortOrder, sortData,
  } = useGetTable(owedGameDatas);

  return (
    <div className="min-h-screen w-screen grid place-items-center bg-slate-600">
      <BgBlurImage />
      <div className="mt-32 z-30 grid xl:grid-cols-3 grid-cols-1 px-32">
        <div className="xl:col-span-2 text-center xl:text-left text-white text-4xl font-bold content-center">
          {`${playerSummary.personaname} 분석 결과`}
          <Typography type="p" color="text-gray-200">19세 게임은 정상적인 정보를 확인하지 못할 수 있습니다</Typography>
        </div>
        <div>
          <div className="relative bg-slate-300 h-32 w-32 ml-6 flex items-center justify-center border-4 border-slate-600">
            <Image
              src={playerSummary.avatarfull}
              alt="Avatar Logo"
              fill
              className="top-0 left-0 object-cover"
            />
          </div>
        </div>
      </div>
      <div className="z-30">
        <div className="w-screen flex flex-row flex-wrap">
          <div className="flex-1 p-6 md:mt-16 grid grid-cols-1 gap-6 xl:grid-cols-4 auto-rows-auto">
            <Card>
              <Infobox title="총 플레이 타임" information={`${Math.floor(allPlayTime / 60)} 시간`} />
            </Card>
            <Card>
              <Infobox title="보유한 게임 수" information={String(owedGameDatas.length)} />
            </Card>
            <Card bgImage={mostPlayedGame.system_data.header_image}>
              <Infobox title="가장 많이 플레이한 게임" information={`${mostPlayedGame.system_data.name} (${Math.floor(mostPlayedGame.personal_data.playtime_forever / 60)} 시간)`} />
            </Card>
            <Card>
              <Infobox title="총 게임 금액" information={`${num2wonComma(totalPrice / 100)}`} />
            </Card>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 p-6">
          <div>
            {tagPercentage[0] && (
              <Card customClass="mb-6">
                <Dounutchart datas={tagPercentage} totalLabel="가장 많이 플레이한 태그" nameKey="tag" />
              </Card>
            )}
            {genrePercentage[0] && (
            <Card>
              <Dounutchart datas={genrePercentage} totalLabel="가장 많이 플레이한 장르" nameKey="description" />
            </Card>
            )}
          </div>
          <div className="xl:col-span-2">
            <Table datas={viewData} sortData={sortData} />
            <div className="flex justify-center mt-2">
              <Pagination
                sortOrder={sortOrder}
                totalDatasNum={gameTable.length}
                viewNum={TABLE_VIEW_NUM}
                setDataIndex={setDataIndex}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default SteamViewBoard;
