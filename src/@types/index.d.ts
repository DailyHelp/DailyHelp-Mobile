declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.avif';
declare module '*.gif';
declare module '*.mp4';

declare module '@env' {
  export const BASE_URL: string;
  export const STORAGE_ENCRYPTION_KEY: string;
  export const GOOGLE_API_KEY: string;
}

type ApiResponse<T> = {
  status: boolean;
  statusCode: number;
  data: T;
  message: string;
  error: boolean;
};

type Route = 'authentication' | 'app';
