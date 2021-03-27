import * as React from 'react';
import * as moment from 'moment';
import {IBlog} from '../utils/types';
import { Link } from 'react-router-dom';

const PreviewCard: React.FC<PreviewCardProps> = ({blog}) => {
    return (
      <div className="col-md-4">
          <article className="card shadow my-2">
              <div className="card-body">
                  <h4 className="card-title">{blog.title}</h4>
                  <p className="card-text text-muted mb-2">{blog.name}</p>
                  <p className="card-text">{blog.content.substring(0, 125)} ...</p>
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="card-text text-muted">{moment(blog.created_at).format("MMM Do, YYYY")}</span>
                  <Link className="btn btn-sm btn-primary" to={`/details/${blog.id}`}>Read More!</Link>
                  </div>
              </div>
          </article>
      </div>
    );
}

interface PreviewCardProps {
    blog: IBlog;
 }

export default PreviewCard;