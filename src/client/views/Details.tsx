import * as React from 'react';
import * as moment from 'moment';
import { useParams, Link } from 'react-router-dom';
import type { IBlog, ITag } from '../utils/types';

const Details: React.FC<DetailsProps> = props => {

    const { blogid } = useParams();
    const [blog, setBlog] = React.useState<IBlog>(null);  // {} (a blank object is still considered true)
    const [blogtags, setBlogtags] = React.useState<ITag[]>([]);

    React.useEffect(() => {
        (async () => {
            const res = await fetch(`/api/blogs/${blogid}`);
            const blog = await res.json();
            const res2 = await fetch(`/api/blogtags/${blogid}`);
            const blogtags = await res2.json();

            setBlog(blog);
            setBlogtags(blogtags);
        })();
    }, []);

    return (
        <main className="container">
            <section className="row">
                <div className="col-12">
                    <article className="card shadow my-2">
                        <div className="card-body">
                            <h1 className="card-text text-center">{blog?.title}</h1>
                            <h6 className="card-text text-center text-muted">by <b>{blog?.name}</b> on <i>{moment(blog?.created_at).format("MMM Do, YYYY")}</i></h6>
                            <div className="d-flex flex-wrap justify-content-center align-items-center my-3">
                                {blogtags.map(blogtag => (
                                    <span className="badge badge-pill badge-secondary p-2 mx-2" key={`blogtag-${blogtag.id}`}>{blogtag.name}</span>
                                ))}
                            </div>
                            <div className="card-text px-md-5">{blog?.content.split('\n').map((para, i) => (
                                <p key={`p-block-${i}`}>{para}</p>
                            ))}
                            </div>
                                <div className="mx-md-5 mt-5 d-flex justify-content-between align-items-center">
                                    <Link className="btn btn-outline-primary" to="/">Back to Blogs</Link>
                                    <Link className="btn btn-outline-secondary" to={`/admin/${blogid}`}>Admin Options</Link>
                                </div>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
};

interface DetailsProps { }

export default Details;