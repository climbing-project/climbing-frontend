const requestOptions = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
} as const;

type Option = (typeof requestOptions)[keyof typeof requestOptions];

// 데이터 타입 정의
export interface RequestProps {
  option: Option;
  url: string;
  sessionId?: string;
  data?: any;
  onSuccess?: (data: any) => void;
}

export interface GetProps {
  url: string;
  sessionId?: string;
  onSuccess?: (data: any) => void;
}

export interface PostProps {
  url: string;
  data: any;
  sessionId?: string;
  onSuccess?: (data: any) => void;
}
