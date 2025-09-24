import type React from 'react';

import Breadcrumbs, { useBreadcrumbs } from '@/components/common/Breadcrumbs';

const WorshipSpacesPage: React.FC = () => {
    const { createApplicationBreadcrumbs } = useBreadcrumbs();

    const breadcrumbs = createApplicationBreadcrumbs('Worship Spaces', 'worship');

    return (
        <div>
            {/* Breadcrumbs */}
            <Breadcrumbs
                items={breadcrumbs}
                showHome={false}
                separator="→"
                className="worship-spaces-breadcrumbs"
            />

            {/* Page content */}
            <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
                <h1>Worship Spaces</h1>
                <p>Churches, temples, and religious venues</p>
            </div>
        </div>
    );
};

export default WorshipSpacesPage;
