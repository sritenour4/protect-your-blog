import { Router } from 'express';
import db from '../db';

const router = Router();

// GET /api/blogtags/1
router.get('/:blogid?', async (req, res) => {
    const blogid = Number(req.params.blogid);

    try {
        const [blogtags] = await db.blogtags.retrieve(blogid);
        res.json(blogtags);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// POST /api/blogtags
// Request Body { blogid: number, tagid: number }
router.post('/', async (req, res) => {
    const newBlogtag = req.body;

    try {
        const result = await db.blogtags.insert(newBlogtag.blogid, newBlogtag.tagid);
        res.json({ msg: 'blogtag inserted', affectedRows: result.affectedRows });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// DELETE /api/blogtags/1
router.delete('/:blogid', async (req, res) => {
    const blogid = Number(req.params.blogid);

    try {
        const result = await db.blogtags.destroy(blogid);
        res.json({ msg: 'blogtag(s) destroyed', affectedRows: result.affectedRows });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// PUT /api/blogtags/1
// Request Body { oldId: number, newId: number }
router.put('/:blogid', async (req, res) => {
    const tags = req.body;
    const blogid = Number(req.params.blogid);

    try {
        const result = await db.blogtags.update(tags.newId, tags.oldId, blogid);
        res.json({ msg: 'blogtag(s) edited', affectedRows: result.affectedRows });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});



export default router;