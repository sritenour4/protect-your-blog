import {Query} from '../';

/*  Stored Procedure:

    spBlogTags(blog_id INT)
        SELECT tags.id, tags.name FROM blogtags
	    JOIN tags ON tags.id = blogtags.tagid
	    WHERE blogid = blog_id;
*/
const retrieve = (blogid: number) => Query('CALL spBlogTags(?)', [blogid]);

const insert = (blogid: number, tagid: number) => Query('INSERT INTO blogtags (blogid, tagid) VALUES (?, ?)', [blogid, tagid]);

const destroy = (blogid: number) => Query('DELETE FROM blogtags WHERE blogid = ?', [blogid]);

const update = (newTagid: number, oldTagid: number, blogid: number) => Query('UPDATE blogtags SET tagid = ? WHERE blogid = ? AND tagid = ?', [newTagid, blogid, oldTagid]);

export default {
    retrieve, 
    insert,
    destroy,
    update
}