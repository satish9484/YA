import type React from 'react';

import Breadcrumbs, { useBreadcrumbs } from '@/components/common/Breadcrumbs';

const EntertainmentPage: React.FC = () => {
    const { createApplicationBreadcrumbs } = useBreadcrumbs();

    const breadcrumbs = createApplicationBreadcrumbs('Entertainment', 'entertainment');

    return (
        <div>
            {/* Breadcrumbs */}
            <Breadcrumbs
                items={breadcrumbs}
                showHome={false}
                separator="→"
                className="entertainment-breadcrumbs"
            />

            {/* Page content */}
            <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
                <h1>Entertainment</h1>
                <p>Clubs, bars, and entertainment venues</p>
            </div>
        </div>
    );
};

export default EntertainmentPage;
