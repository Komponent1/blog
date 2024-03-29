import { CreateAxiosDefaults } from 'axios';
import { Tag } from 'Data';
import HttpClient, { Interceptor } from './http';

class TagAPI {
  private http;

  constructor(
    config?: CreateAxiosDefaults<any>,
    interceptor?: Interceptor,
    isServer?: boolean,
    dev?: boolean,
  ) {
    this.http = new HttpClient(config, interceptor, isServer, dev);
  }

  public async getAll() {
    const { tags } = await this.http.get<{ tags: Tag[] }>(
      'api/tags',
    ).then((res) => res.data);

    return tags;
  }
}

export default TagAPI;
