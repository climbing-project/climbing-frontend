import { Dispatch, SetStateAction } from "react";
import { GymData, SimpleGymData } from "../gyms/types";

// 주소 데이터
export const sampleAddress = [
  { id: 1, info: "잠실" },
  { id: 2, info: "잠실2동" },
  { id: 3, info: "잠실1동" },
  { id: 4, info: "송파동" },
  { id: 5, info: "송파2동" },
  { id: 6, info: "송파1동" },
];

// 데이터 타입 정의
// export interface GymCardInfo {
//   // 썸네일 요약된 gym 정보
//   id: number;
//   thumbnailSrc: string;
//   address: string;
//   name: string;
//   latestSettingDay: string;
//   likeNumber: number;
// }

// 컴포넌트 props 타입 정의
export interface DropItem {
  id: number;
  info: string;
}

export interface DropDownProps {
  dropItems: Array<DropItem>;
  prefixIcon?: JSX.Element; // list왼쪽 react-icon 컴포넌트 태그
  highlightWord?: String; // 강조 문구 있을 시, 강조 표시
  highlightIndex?: number; // 강조할 행은 강조표시
  setHighlightIndex?: Dispatch<SetStateAction<number>>;
  width?: string; // search컴포넌트 없이 dropdown 단독으로 쓸때만 사용
  fontSize?: string;
  useLocation?: boolean;
  handleClick?: (arg: unknown) => unknown;
}

export interface CurrentLocationBtnProps {
  fontSize?: string;
}

export interface GymListBannerProps {
  searchWord?: string;
  sortingType?: string;
}

export interface LazyLoadingItemsProps {
  searchWord?: string;
  sortingType?: string;
}

export interface SearchBannerProps {
  searchWord?: string;
}

export interface SearchProps {
  dataList: Array<DropItem>;
  width?: string;
  height?: string;
  fontSize?: string;
  placeholder?: string;
  postfixIcon?: JSX.Element; // 검색창에 표시되는 아이콘
  onSubmit?: (event: any) => any; // 엔터 클릭시 발생되는 이벤트
  useLocation?: boolean; // 현재 위치로 검색
  searchWord?: string;
  border?: string;
}

export interface CardProps {
  width?: string;
  height?: string;
  cardInfo: SimpleGymData;
}
