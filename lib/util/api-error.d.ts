export declare class ApiError extends Error {
  status: number
  constructor(message: string, status: number)
}
