import { Request, Response } from 'express';

class PingController {
  public async ping(request: Request, response: Response): Promise<Response> {
    return response.status(200).json({
      PING: 'PONG',
    });
  }
}

export default PingController;
