import { Request, Response, NextFunction } from 'express';
import { Article } from "../model";
import { Writable } from 'stream';
import * as file from '../lib/file';

export const getFile = async (path): Promise<any> => {
  try {
    let result = '';
    const stream = new Writable({
      write(chunk, encoding, callback) {
        result += chunk.toString();
        callback();
      }
    });
    /* load file */
    await file.load(path, stream);
    return result;
  } catch (err) {
    throw err;
  }
};

type getArticleQuery = { user: string, article_id: string }
const getArticle = async (req: Request<{}, {}, {}, getArticleQuery>, res: Response, next: NextFunction) => {
  try {
    let article = null;
    const { user, article_id } = req.query;
    try {
      article = (await Article.get(user, { article_id }))[0];
    } catch(err) {
      throw ({
        code: 500,
        msg: 'Error in DB'
      })
    }
    const content = await getFile(article.path);
    
    res.status(200).json({ article, content });
  } catch (err) {
    return next(err);
  }
};

export default getArticle;