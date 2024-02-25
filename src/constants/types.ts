// 데이터 타입 정의
export interface SnsList {
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

export interface Pricing {
  item: string;
  price: string;
}

export interface OpenHours {
  days: string;
  openTime: string;
  closeTime: string;
}

// 컴포넌트 props 타입 정의
export interface ContactInfoProps {
  contact: string;
  snsList: SnsList;
}

export interface GradeBarProps {
  grades: string[];
}

export interface PricingTableProps {
  pricing: Array<Pricing>;
}

export interface OpenHoursTableProps {
  openHours: Array<OpenHours>;
}
