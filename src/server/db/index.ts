import * as mysql from 'mysql';
import config from '../config';

// table query imports
import Blogs from './queries/blogs';
import Blogtags from './queries/blogtags';
import Tags from './queries/tags';
import Authors from './queries/authors';
import AccessTokens from './queries/accesstokens';

const pool = mysql.createPool(config.mysql);

export const Query = <T = any>(query: string, values?: any) => {
    return new Promise<T>((resolve, reject) => {

        const sql = mysql.format(query, values);
        // console.log(sql); DEBUG

        pool.query(query, values, (err, results) => {
            if(err) {
                reject(err);
            } else {
                resolve(results);
            }            
        });
    });
};

export default {
    Blogs,
    Blogtags, 
    Tags,
    Authors,
    AccessTokens
}