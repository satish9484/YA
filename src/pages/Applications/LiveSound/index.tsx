import type React from 'react';

import Breadcrumbs, { useBreadcrumbs } from '@/components/common/Breadcrumbs';

const LiveSoundPage: React.FC = () => {
    const { createApplicationBreadcrumbs } = useBreadcrumbs();

    const breadcrumbs = createApplicationBreadcrumbs('Live Sound', 'live-sound');

    return (
        <div>
            {/* Breadcrumbs */}
            <Breadcrumbs
                items={breadcrumbs}
                showHome={false}
                separator="→"
                className="live-sound-breadcrumbs"
            />

            {/* Page content */}
            <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
                <h1>Live Sound</h1>
                <p>Concert halls, theaters, and live events</p>
            </div>
        </div>
    );
};

export default LiveSoundPage;
