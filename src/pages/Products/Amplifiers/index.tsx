import type React from 'react';

import Breadcrumbs, { useBreadcrumbs } from '@/components/common/Breadcrumbs';

const PowerAmplifiersPage: React.FC = () => {
    const { createCategoryBreadcrumbs } = useBreadcrumbs();

    const breadcrumbs = createCategoryBreadcrumbs('Power Amplifiers', 'amplifiers', 'products');

    return (
        <div>
            {/* Breadcrumbs */}
            <Breadcrumbs
                items={breadcrumbs}
                showHome={false}
                separator="→"
                className="amplifiers-breadcrumbs"
            />

            {/* Page content */}
            <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
                <h1>Power Amplifiers</h1>
                <p>High-power amplification solutions</p>
            </div>
        </div>
    );
};

export default PowerAmplifiersPage;
