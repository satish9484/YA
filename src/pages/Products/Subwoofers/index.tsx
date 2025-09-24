import type React from 'react';

import Breadcrumbs, { useBreadcrumbs } from '@/components/common/Breadcrumbs';

const SubwoofersPage: React.FC = () => {
    const { createCategoryBreadcrumbs } = useBreadcrumbs();

    const breadcrumbs = createCategoryBreadcrumbs('Subwoofers', 'subwoofers', 'products');

    return (
        <div>
            {/* Breadcrumbs */}
            <Breadcrumbs
                items={breadcrumbs}
                showHome={false}
                separator="→"
                className="subwoofers-breadcrumbs"
            />

            {/* Page content */}
            <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
                <h1>Subwoofers</h1>
                <p>Low-frequency reinforcement systems</p>
            </div>
        </div>
    );
};

export default SubwoofersPage;
