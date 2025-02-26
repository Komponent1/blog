import { Injectable } from '@nestjs/common';
import IORedis, { Redis } from 'ioredis';

type RedisConfigType = {
  host: string;
  port: number;
  db?: number;
  isCluseter: boolean;
  commandTimeout?: number;
};
type RedisEventHandlerType = (args: any[]) => void;
enum RedisEventType {
  CONNECT = 'connect',
  ERROR = 'error',

  // PUBSUB
  SUBSCRIBE = 'subscribe',
  MESSAGE = 'message',
}

@Injectable()
export class RedisClient {
  private config: RedisConfigType;
  private client: Redis;

  constructor(config: RedisConfigType, client: Redis) {
    this.config = config;
    this.client = client;
  }

  public getClient(): Redis {
    return this.client;
  }

  public close(): void {
    this.client.disconnect();
  }

  public registerHandler(event: RedisEventType, handler: RedisEventHandlerType): void {
    this.client.on(event, handler);
  }

  public static createClient(config: RedisConfigType, errorHandler?: RedisEventHandlerType): RedisClient {
    const redisClient = new IORedis(config);
    const client = new RedisClient(config, redisClient);

    if (errorHandler) {
      client.registerHandler(RedisEventType.ERROR, errorHandler);
    }

    return client;
  }
}
