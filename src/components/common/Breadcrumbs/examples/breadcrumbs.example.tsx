import type React from 'react';

import { AudioOutlined, HomeOutlined, SoundOutlined } from '@ant-design/icons';

import Breadcrumbs from '../index';
import { createBreadcrumbItem } from '../utils/breadcrumbs.utils';

// Example breadcrumb data
const exampleBreadcrumbs = [
    createBreadcrumbItem('home', 'Home', false, '/', <HomeOutlined />, 'Go to home page'),
    createBreadcrumbItem(
        'products',
        'Products',
        false,
        '/products',
        <AudioOutlined />,
        'Browse all products',
    ),
    createBreadcrumbItem(
        'speakers',
        'Speakers',
        false,
        '/products/speakers',
        <SoundOutlined />,
        'View speaker products',
    ),
    createBreadcrumbItem(
        'toa-hx5b',
        'TOA HX-5B',
        true,
        undefined,
        undefined,
        'Current product page',
    ),
];

const BreadcrumbsExample: React.FC = () => {
    const handleItemClick = (item: (typeof exampleBreadcrumbs)[0], index: number) => {
        console.log('Breadcrumb clicked:', item, 'at index:', index);
        // In a real app, you would navigate to the item.link
        if (item.link) {
            // navigate(item.link);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Breadcrumbs Examples</h2>

            {/* Default breadcrumbs */}
            <div style={{ marginBottom: '30px' }}>
                <h3>Default Breadcrumbs</h3>
                <Breadcrumbs items={exampleBreadcrumbs} onItemClick={handleItemClick} />
            </div>

            {/* Compact breadcrumbs */}
            <div style={{ marginBottom: '30px' }}>
                <h3>Compact Breadcrumbs</h3>
                <Breadcrumbs
                    items={exampleBreadcrumbs}
                    variant="compact"
                    separator="slash"
                    onItemClick={handleItemClick}
                />
            </div>

            {/* Detailed breadcrumbs */}
            <div style={{ marginBottom: '30px' }}>
                <h3>Detailed Breadcrumbs</h3>
                <Breadcrumbs
                    items={exampleBreadcrumbs}
                    variant="detailed"
                    separator="arrow"
                    onItemClick={handleItemClick}
                />
            </div>

            {/* Breadcrumbs with home icon */}
            <div style={{ marginBottom: '30px' }}>
                <h3>Breadcrumbs with Home</h3>
                <Breadcrumbs
                    items={exampleBreadcrumbs.slice(1)} // Remove home item since showHome will add it
                    showHome={true}
                    separator="dot"
                    onItemClick={handleItemClick}
                />
            </div>

            {/* Truncated breadcrumbs */}
            <div style={{ marginBottom: '30px' }}>
                <h3>Truncated Breadcrumbs (max 3 items)</h3>
                <Breadcrumbs
                    items={exampleBreadcrumbs}
                    maxItems={3}
                    onItemClick={handleItemClick}
                />
            </div>
        </div>
    );
};

export default BreadcrumbsExample;
