import * as React from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import type { ITag } from '../utils/types';

let oldId: number = null;

const Admin: React.FC<AdminProps> = (props) => {
    // routing context
    const history = useHistory();
    const { blogid } = useParams();

    // form states
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [selectedTag, setSelectedTag] = React.useState('0');

    // tags state
    const [tags, setTags] = React.useState<ITag[]>([]);

    React.useEffect(() => {
        (async () => {
            const res = await fetch('/api/tags');
            const tags = await res.json();
            setTags(tags);
        })();
    }, []);
    
    React.useEffect(() => {
        (async () => {
            const res = await fetch(`/api/blogs/${blogid}`);
            const blog = await res.json();
            const res2 = await fetch(`/api/blogtags/${blogid}`);
            const blogtags = await res2.json();
            oldId = blogtags[0].id;

            setTitle(blog.title);
            setContent(blog.content);
            setSelectedTag(blogtags[0].id);
        })();
    }, [blogid]);
   

    const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const res = await fetch(`/api/blogs/${blogid}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });
        const resultBlog = await res.json();
        console.log(resultBlog);
        
        if(oldId !== Number(selectedTag)) {
            const res2 = await fetch(`/api/blogtags/${blogid}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({oldId, newId: selectedTag})
            });
            const resultBlogtag = await res2.json();
            console.log(resultBlogtag);
        }

        history.push(`/details/${blogid}`);
    };

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const res = await fetch(`/api/blogtags/${blogid}`, {
            method: 'DELETE'
        });
        const res2 = await fetch(`/api/blogs/${blogid}`, {
            method: 'DELETE'
        });
        if (res.ok && res2.ok) {
        history.push('/');
        }
    };

    return (
        <main className="container">
            <section className="row">
                <div className="col-12">
                    <form action="" className="form-group border rounded-lg p-3">
                        <label htmlFor="title">Title</label>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            type="text"
                            className="form-control form-control-lg mb-2"
                            placeholder="Example Title"
                        />
                        <label htmlFor="selected tag">Select a Tag</label>
                        <select value={selectedTag} onChange={e => setSelectedTag(e.target.value)} className="form-control form-control-lg">
                            <option disabled value="0">Select a tag...</option>
                            {tags.map(tag => (
                                <option key={`tag-${tag.id}`} value={tag.id}>{tag.name}</option>
                            ))}                            
                        </select>
                        <label htmlFor="content">Content</label>
                        <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            rows={20}
                            className="form-control form-control-lg mb-2"
                            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ...">
                        </textarea>
                        <div className="d-flex justify-content-between">
                            <Link className="btn btn-secondary"to={`/details/${blogid}`}>Go Back</Link>
                            <div>
                            <button onClick={handleEdit} className="btn btn-primary mx-2">Edit It!</button>
                            <button onClick={handleDelete} className="btn btn-outline-danger mx-2">Delete It!</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}

interface AdminProps { }

export default Admin;