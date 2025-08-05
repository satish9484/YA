// src/components/UserProfileCard/types.ts

/**
 * Defines the structure for the user's address.
 */
export type UserAddress = {
    street: string;
    city: string;
    zipCode: string;
    country: string;
};

/**
 * Defines the theme options for the profile card's appearance.
 */
export type ProfileTheme = 'light' | 'dark' | 'system';

/**
 * Defines the props for the UserProfileCard component.
 */
export type UserProfileCardProps = {
    /**
     * The unique identifier of the user.
     */
    userId: string;
    /**
     * The user's full name to be displayed.
     */
    name: string;
    /**
     * The URL of the user's avatar image.
     */
    avatarUrl: string;
    /**
     * The user's address object.
     */
    address: UserAddress;
    /**
     * The theme to apply to the card.
     * @default 'light'
     */
    theme?: ProfileTheme;
    /**
     * A callback function to be invoked when the card is clicked.
     */
    onSelect: (userId: string) => void;
};

export interface UserProfilePageProps {
    user: {
        id: string;
        name: string;
        email: string;
        avatarUrl: string;
        address: {
            street: string;
            city: string;
            country: string;
        };
    };
    onLogout: () => Promise<void>;
    onChangePassword: (passwordData: object) => Promise<void>;
}
