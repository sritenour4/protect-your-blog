import * as React from 'react';
import PreviewCard from '../components/PreviewCard';
import {IBlog} from '../utils/types';

const Home: React.FC<HomeProps> = (props) => {
    
    const [blogs, setBlogs] = React.useState<IBlog[]>([]);
    
    React.useEffect(() => {
        (async () => {
            const res = await fetch('/api/blogs');
            const blogs = await res.json();
            setBlogs(blogs);
        })();
    }, []);

    return (
        <main className="container">
            <section className="row">
                {blogs.map(blog => (
                    <PreviewCard key={`blog-preview-${blog.id}`} blog={blog}/>                    
                ))}
            </section>
        </main>
    );
};

interface HomeProps {}

export default Home;