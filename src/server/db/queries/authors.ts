import { Query } from '../index';

const findOneByEmail = async (email: string) => Query(`SELECT * FROM authors WHERE email = '${email}' LIMIT 1`);

const findOneByID = async (id: number) => Query(`SELECT * FROM authors WHERE id = ${id} LIMIT 1`);

export default {
    findOneByEmail,
    findOneByID
}