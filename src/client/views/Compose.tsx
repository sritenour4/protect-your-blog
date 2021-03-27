import * as React from 'react';
import {useHistory} from 'react-router-dom';
import type { ITag } from '../utils/types';

const Compose: React.FC<ComposeProps> = (props) => {
    const history = useHistory();

    // form states
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [selectedTag, setSelectedTag] = React.useState('0');

    // tag state
    const [tags, setTags] = React.useState<ITag[]>([]);

    React.useEffect(() => {
        (async () => {
            const res = await fetch('/api/tags');
            const tags = await res.json();
            setTags(tags);
        })();
    }, []);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const res = await fetch('/api/blogs', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({title, content})
        });
        const blogResult = await res.json();
        
        // if (Number(selectedTag)) {
        const res2 = await fetch('/api/blogtags', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({blogid: blogResult.id, tagid: selectedTag})
        });
        const blogtagResult = await res2.json();
        console.log(blogtagResult);
    // };

        history.push(`/details/${blogResult.id}`);
    }

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
                        <div className="d-flex justify-content-end">
                        <button onClick={handleSubmit} className="btn btn-primary btn-lg mt-3">Write It!</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}

interface ComposeProps { }

export default Compose;