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
  export const WEB_CLIENT_ID: string;
  export const CLOUDINARY_URL: string;
  export const AGORA_APP_ID: string;
  export const AGORA_CHANNEL_NAME: string;
}

type ApiResponse<T, P extends boolean = false, E = {}> = {
  status: boolean;
  statusCode: number;
  data: T;
  message: string;
  error: boolean;
} & E &
  (P extends true ? {pagination: Pagination} : {});

type Route = 'authentication' | 'app';

type PaginationQuery<F = any> = {
  pagination?: {
    limit?: number;
    page?: number;
    pages?: number;
    orderBy?: 'ASC' | 'DESC';
    orderDir?: 'ASC' | 'DESC';
    total?: number;
  };
  filter?: F;
  search?: string;
};
