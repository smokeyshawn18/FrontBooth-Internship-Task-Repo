export interface ApiResponse<T = any> {
  success: boolean;
  code: number;
  data: T;
  message?: string;
}

export interface Post {
  userId: string;
  id: string;
  title: string;
  body: string;
}
