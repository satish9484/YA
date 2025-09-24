import type React from 'react';

import Breadcrumbs, { useBreadcrumbs } from '@/components/common/Breadcrumbs';

const CorporateEventsPage: React.FC = () => {
    const { createApplicationBreadcrumbs } = useBreadcrumbs();

    const breadcrumbs = createApplicationBreadcrumbs('Corporate Events', 'corporate');

    return (
        <div>
            {/* Breadcrumbs */}
            <Breadcrumbs
                items={breadcrumbs}
                showHome={false}
                separator="→"
                className="corporate-events-breadcrumbs"
            />

            {/* Page content */}
            <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
                <h1>Corporate Events</h1>
                <p>Conferences, meetings, and presentations</p>
            </div>
        </div>
    );
};

export default CorporateEventsPage;
