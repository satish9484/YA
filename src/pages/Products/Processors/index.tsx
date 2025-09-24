import type React from 'react';

import Breadcrumbs, { useBreadcrumbs } from '@/components/common/Breadcrumbs';

const SignalProcessorsPage: React.FC = () => {
    const { createCategoryBreadcrumbs } = useBreadcrumbs();

    const breadcrumbs = createCategoryBreadcrumbs('Signal Processors', 'processors', 'products');

    return (
        <div>
            {/* Breadcrumbs */}
            <Breadcrumbs
                items={breadcrumbs}
                showHome={false}
                separator="→"
                className="processors-breadcrumbs"
            />

            {/* Page content */}
            <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
                <h1>Signal Processors</h1>
                <p>Digital signal processing equipment</p>
            </div>
        </div>
    );
};

export default SignalProcessorsPage;
