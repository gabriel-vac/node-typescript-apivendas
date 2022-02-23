declare namespace Express {
  export interface Request {
    // add objeto user no type Request do express
    user: {
      id: string;
    };
  }
}
