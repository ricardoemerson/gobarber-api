// Combine with Express more object data into Request interface.
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
