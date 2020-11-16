class HTTPException {
  private message: string;

  private statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default HTTPException;
