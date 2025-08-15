import { type FC } from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

interface BreadcrumbItem {
    name: string;
    link?: string;
    isActive: boolean;
}

interface BreadCrumbsProps {
    list: BreadcrumbItem[];
}

const BreadCrumbs: FC<BreadCrumbsProps> = ({ list }) => {
    return (
        <div className="breadcrumbs-grp">
            <ul className="breadcrumbsList">
                {list.map((item, index) => (
                    <li key={index}>
                        {item.isActive && item.link ? (
                            <Link to={item.link}>
                                <h4>{item.name}</h4>
                            </Link>
                        ) : (
                            <h4>{item.name}</h4>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BreadCrumbs;
