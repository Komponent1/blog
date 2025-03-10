/* eslint-disable react/no-array-index-key */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { SortOrder } from "../hooks/steam.hooks.getTable";

/**
 * totalDatasNum: 총 데이터 수
 * viewNum: 한 페이지에 보여줄 데이터 수
 * setDataIndex: 페이지 이동 함수
 */
const PAGE_VIEW_COUNT = 5;
type Props = {
  totalDatasNum: number;
  viewNum: number;
  setDataIndex: (index: number) => void;
  sortOrder: SortOrder;
};
const Pagenation: React.FC<Props> = ({
  totalDatasNum, viewNum, setDataIndex, sortOrder,
}) => {
  const [current, setCurrent] = useState<number>(1);
  const [currentView, setCurrentView] = useState<number>(0);
  const totalPage = useMemo(() => Math.ceil(totalDatasNum / viewNum), [totalDatasNum, viewNum]);

  const ablePrev = useMemo(() => current > PAGE_VIEW_COUNT, [current]);
  const ableNext = useMemo(
    () => (currentView + 1) * PAGE_VIEW_COUNT < totalPage,
    [totalPage, currentView],
  );

  useEffect(() => {
    setCurrentView(0);
    setCurrent(1);
  }, [sortOrder]);

  const onClick = useCallback((index: number) => {
    setCurrent(index);
    setDataIndex(index);
  }, [setCurrent, setDataIndex]);
  const onClickPrev = useCallback(() => {
    if (!ablePrev) return;
    setCurrent((currentView - 1) * PAGE_VIEW_COUNT + PAGE_VIEW_COUNT);
    setCurrentView(currentView - 1);
    setDataIndex(((currentView - 1) * PAGE_VIEW_COUNT + PAGE_VIEW_COUNT));
  }, [ablePrev, setCurrent, setDataIndex, currentView, setCurrentView]);
  const onClickNext = useCallback(() => {
    if (!ableNext) return;
    setCurrent((currentView + 1) * PAGE_VIEW_COUNT + 1);
    setCurrentView(currentView + 1);
    setDataIndex(((currentView + 1) * PAGE_VIEW_COUNT + 1));
  }, [currentView, setCurrentView, setDataIndex, ableNext]);

  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <button
            type="button"
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
            onClick={onClickPrev}
          >
            <span className="sr-only">Previous</span>
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
          </button>
        </li>
        {Array.from({
          length: Math.min(totalPage - currentView * PAGE_VIEW_COUNT, PAGE_VIEW_COUNT),
        }).map((_, i) => (
          <li key={`page_${i}`}>
            <button
              type="button"
              onClick={() => onClick(currentView * PAGE_VIEW_COUNT + i + 1)}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 
                ${currentView * PAGE_VIEW_COUNT + i + 1 === current ? 'bg-blue-50 text-blue-600' : ''}`}
            >
              {currentView * PAGE_VIEW_COUNT + i + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            onClick={onClickNext}
          >
            <span className="sr-only">Next</span>
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default Pagenation;
