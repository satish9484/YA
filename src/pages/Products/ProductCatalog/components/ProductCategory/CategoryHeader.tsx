import type React from 'react';

import { Typography } from 'antd';

import styles from './CategoryHeader.module.scss';

// Assuming styles are moved to this component's folder

const { Title, Paragraph } = Typography;

/**
 * Prop types for the CategoryHeader component
 */
interface CategoryHeaderProps {
    id: string;
    name: string;
    description?: string;
    showDescription: boolean;
    onClick?: () => void;
}

/**
 * CategoryHeader Component
 *
 * Displays the main title and description for a product category.
 * The title can be interactive if an onClick handler is provided.
 */
const CategoryHeader: React.FC<CategoryHeaderProps> = ({
    id,
    name,
    description,
    showDescription,
    onClick,
}) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        // Enable keyboard accessibility for the clickable title
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick();
        }
    };

    const titleProps = {
        level: 2 as const,
        className: onClick
            ? `${styles['category-header__title']} ${styles['category-header__title--clickable']}`
            : styles['category-header__title'],
        onClick,
        onKeyDown: onClick ? handleKeyDown : undefined,
        role: onClick ? ('button' as const) : undefined,
        tabIndex: onClick ? 0 : undefined,
        id: `category-${id}`,
        ...(onClick && { 'aria-label': `View all products in ${name}` }),
    };

    return (
        <header className={styles['category-header']}>
            <Title {...titleProps}>{name}</Title>
            {showDescription && description && (
                <Paragraph className={styles['category-header__description']}>
                    {description}
                </Paragraph>
            )}
        </header>
    );
};

export default CategoryHeader;
