import type React from 'react';

import Breadcrumbs, { useBreadcrumbs } from '@/components/common/Breadcrumbs';

const AboutPage: React.FC = () => {
    const { createPageBreadcrumbs } = useBreadcrumbs();

    const breadcrumbs = createPageBreadcrumbs('About Us', 'about');

    return (
        <div>
            {/* Breadcrumbs */}
            <Breadcrumbs
                items={breadcrumbs}
                showHome={false}
                separator="→"
                className="about-breadcrumbs"
            />

            {/* Page content */}
            <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
                <h1>About Us</h1>
                <p>Learn more about Outbrust Acoustic</p>
            </div>
        </div>
    );
};

export default AboutPage;
