import type React from 'react';

import Breadcrumbs, { useBreadcrumbs } from '@/components/common/Breadcrumbs';

const ContactPage: React.FC = () => {
    const { createPageBreadcrumbs } = useBreadcrumbs();

    const breadcrumbs = createPageBreadcrumbs('Contact Us', 'contact');

    return (
        <div>
            {/* Breadcrumbs */}
            <Breadcrumbs
                items={breadcrumbs}
                showHome={false}
                separator="→"
                className="contact-breadcrumbs"
            />

            {/* Page content */}
            <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
                <h1>Contact Us</h1>
                <p>Get in touch with Outbrust Acoustic</p>
            </div>
        </div>
    );
};

export default ContactPage;
