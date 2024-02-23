// 데이터 타입 정의
export interface SnsList {
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

// 컴포넌트 props 타입 정의
export interface ContactInfoProps {
  contact: string;
  snsList: SnsList;
}

export interface GradeBarProps {
  grades: string[];
}


export interface PricingTableItem {
  item: string;
  price: string;
}

export interface PricingTableProps {
  pricing: Array<PricingTableItem>;
}