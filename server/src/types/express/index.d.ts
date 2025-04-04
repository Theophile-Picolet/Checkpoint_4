// to make the file a module and avoid the TypeScript error
export type {};

declare global {
  namespace Express {
    export interface Request {
      auth: {
        name: string;
        isAdmin: boolean;
      };
      user: {
        role: string;
        id: number;
        email: string;
      };
    }
  }
}
