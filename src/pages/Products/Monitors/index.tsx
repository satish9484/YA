import type React from 'react';

import Breadcrumbs, { useBreadcrumbs } from '@/components/common/Breadcrumbs';

const StageMonitorsPage: React.FC = () => {
    const { createCategoryBreadcrumbs } = useBreadcrumbs();

    const breadcrumbs = createCategoryBreadcrumbs('Stage Monitors', 'monitors', 'products');

    return (
        <div>
            {/* Breadcrumbs */}
            <Breadcrumbs
                items={breadcrumbs}
                showHome={false}
                separator="→"
                className="monitors-breadcrumbs"
            />

            {/* Page content */}
            <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
                <h1>Stage Monitors</h1>
                <p>Stage monitoring solutions for performers</p>
            </div>
        </div>
    );
};

export default StageMonitorsPage;
