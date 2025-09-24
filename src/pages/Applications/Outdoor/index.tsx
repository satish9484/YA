import type React from 'react';

import Breadcrumbs, { useBreadcrumbs } from '@/components/common/Breadcrumbs';

const OutdoorEventsPage: React.FC = () => {
    const { createApplicationBreadcrumbs } = useBreadcrumbs();

    const breadcrumbs = createApplicationBreadcrumbs('Outdoor Events', 'outdoor');

    return (
        <div>
            {/* Breadcrumbs */}
            <Breadcrumbs
                items={breadcrumbs}
                showHome={false}
                separator="→"
                className="outdoor-events-breadcrumbs"
            />

            {/* Page content */}
            <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
                <h1>Outdoor Events</h1>
                <p>Festivals, outdoor concerts, and events</p>
            </div>
        </div>
    );
};

export default OutdoorEventsPage;
