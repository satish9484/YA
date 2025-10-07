import type { ThemeConfig } from 'antd';
import { theme as antdTheme } from 'antd';

// Enhanced Theme Configuration with Token Access
export const createAppTheme = (isDarkMode: boolean): ThemeConfig => ({
    // Algorithm for automatic color generation
    algorithm: isDarkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,

    // Global design tokens
    token: {
        // === COLOR TOKENS ===
        // Primary colors - using CSS variables
        colorPrimary: 'var(--color-primary)',
        colorSuccess: 'var(--color-success)',
        colorWarning: 'var(--color-warning)',
        colorError: 'var(--color-error)',
        colorInfo: 'var(--color-info)',

        // Text colors - using CSS variables
        colorText: 'var(--color-text-primary)',
        colorTextSecondary: 'var(--color-text-secondary)',
        colorTextTertiary: 'var(--color-text-tertiary)',
        colorTextQuaternary: 'var(--color-text-quaternary)',

        // Background colors - using CSS variables
        colorBgLayout: 'var(--color-bg-secondary)',
        colorBgContainer: 'var(--color-bg-primary)',
        colorBgElevated: 'var(--color-bg-primary)',
        colorBgSpotlight: 'var(--color-bg-tertiary)',
        colorBgMask: 'rgba(0, 0, 0, 0.45)',

        // Border colors - using CSS variables
        colorBorder: 'var(--color-border-primary)',
        colorBorderSecondary: 'var(--color-border-secondary)',

        // Fill colors - using CSS variables
        colorFill: 'var(--color-fill-primary)',
        colorFillSecondary: 'var(--color-fill-secondary)',
        colorFillTertiary: 'var(--color-fill-tertiary)',
        colorFillQuaternary: 'var(--color-fill-tertiary)',

        // === TYPOGRAPHY TOKENS ===
        fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
        fontSize: 14,
        fontSizeHeading1: 38,
        fontSizeHeading2: 30,
        fontSizeHeading3: 24,
        fontSizeHeading4: 20,
        fontSizeHeading5: 16,
        fontSizeLG: 16,
        fontSizeSM: 12,
        fontSizeXL: 20,
        fontSizeIcon: 12,
        fontWeightStrong: 600,
        lineHeight: 1.5714285714285714,
        lineHeightHeading1: 1.2105263157894737,
        lineHeightHeading2: 1.2666666666666666,
        lineHeightHeading3: 1.3333333333333333,
        lineHeightHeading4: 1.4,
        lineHeightHeading5: 1.5,

        // === SPACING TOKENS ===
        padding: 16,
        paddingLG: 24,
        paddingMD: 16,
        paddingSM: 12,
        paddingXS: 8,
        paddingXXS: 4,
        margin: 16,
        marginLG: 24,
        marginMD: 16,
        marginSM: 12,
        marginXS: 8,
        marginXXS: 4,
        controlHeight: 32,
        controlHeightLG: 40,
        controlHeightSM: 24,
        controlHeightXS: 16,

        // === MOTION TOKENS ===
        motionDurationFast: '0.1s',
        motionDurationMid: '0.2s',
        motionDurationSlow: '0.3s',
        motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',

        // === BORDER RADIUS TOKENS ===
        borderRadius: 6,
        borderRadiusLG: 8,
        borderRadiusSM: 4,
        borderRadiusXS: 2,

        // === SHADOW TOKENS ===
        boxShadow: isDarkMode
            ? '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)'
            : '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
        boxShadowSecondary: isDarkMode
            ? '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)'
            : '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
        boxShadowTertiary: isDarkMode
            ? '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)'
            : '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',

        // === Z-INDEX TOKENS ===
        zIndexBase: 0,
        zIndexPopupBase: 1000,
    },

    // Component-specific customizations
    components: {
        // === BUTTON COMPONENT ===
        Button: {
            borderRadius: 6,
            controlHeight: 32,
            controlHeightLG: 40,
            controlHeightSM: 24,
            fontWeight: 500,
            primaryShadow: '0 2px 0 rgba(0, 0, 0, 0.045)',
        },

        // === INPUT COMPONENTS ===
        Input: {
            borderRadius: 6,
            controlHeight: 32,
            controlHeightLG: 40,
            controlHeightSM: 24,
            paddingInline: 12,
            paddingBlock: 4,
            activeBorderColor: 'var(--color-primary)',
            hoverBorderColor: 'var(--color-primary-hover)',
        },

        InputNumber: {
            borderRadius: 6,
            controlHeight: 32,
            controlHeightLG: 40,
            controlHeightSM: 24,
        },

        // === SELECT COMPONENTS ===
        Select: {
            borderRadius: 6,
            controlHeight: 32,
            controlHeightLG: 40,
            controlHeightSM: 24,
            optionSelectedBg: 'var(--color-fill-primary)',
            optionActiveBg: 'var(--color-fill-secondary)',
        },

        // === DATE PICKER ===
        DatePicker: {
            borderRadius: 6,
            controlHeight: 32,
            controlHeightLG: 40,
            controlHeightSM: 24,
        },

        // === FORM COMPONENT ===
        Form: {
            labelColor: 'var(--color-text-primary)',
            labelRequiredMarkColor: 'var(--color-error)',
            itemMarginBottom: 24,
            verticalLabelPadding: '0 0 8px',
            verticalLabelMargin: 0,
        },

        // === CHECKBOX & RADIO ===
        Checkbox: {
            borderRadius: 4,
            colorPrimary: 'var(--color-primary)',
        },

        Radio: {
            borderRadius: 4,
            colorPrimary: 'var(--color-primary)',
        },

        Switch: {
            colorPrimary: 'var(--color-primary)',
            colorPrimaryHover: 'var(--color-primary-hover)',
        },

        // === SLIDER ===
        Slider: {
            trackBg: 'var(--color-fill-primary)',
            railBg: 'var(--color-border-primary)',
            handleColor: 'var(--color-primary)',
            handleActiveColor: 'var(--color-primary-hover)',
        },

        // === RATE ===
        Rate: {
            colorFillContent: 'var(--color-warning)',
        },

        // === UPLOAD ===
        Upload: {
            borderRadius: 6,
            colorBorder: 'var(--color-border-primary)',
        },

        // === PROGRESS ===
        Progress: {
            defaultColor: 'var(--color-primary)',
            remainingColor: 'var(--color-fill-primary)',
        },

        // === BADGE ===
        Badge: {
            colorError: 'var(--color-error)',
            colorSuccess: 'var(--color-success)',
            colorWarning: 'var(--color-warning)',
            colorInfo: 'var(--color-info)',
        },

        // === TAG ===
        Tag: {
            borderRadiusSM: 4,
            colorFillSecondary: 'var(--color-fill-primary)',
            colorText: 'var(--color-text-primary)',
        },

        // === TOOLTIP ===
        Tooltip: {
            borderRadius: 6,
            colorBgSpotlight: 'var(--color-bg-tertiary)',
            colorTextLightSolid: 'var(--color-text-primary)',
        },

        // === POPOVER ===
        Popover: {
            borderRadius: 8,
            colorBgElevated: 'var(--color-bg-primary)',
        },

        // === MODAL ===
        Modal: {
            borderRadius: 8,
            colorBgElevated: 'var(--color-bg-primary)',
            contentBg: 'var(--color-bg-primary)',
            headerBg: 'var(--color-bg-primary)',
            titleColor: 'var(--color-text-primary)',
        },

        // === DRAWER ===
        Drawer: {
            colorBgElevated: 'var(--color-bg-primary)',
            colorBgMask: 'rgba(0, 0, 0, 0.45)',
        },

        // === TABS ===
        Tabs: {
            cardBg: 'var(--color-bg-primary)',
            cardPadding: '12px 16px',
            itemColor: 'var(--color-text-secondary)',
            itemHoverColor: 'var(--color-text-primary)',
            itemSelectedColor: 'var(--color-primary)',
            itemActiveColor: 'var(--color-primary)',
        },

        // === STEPS ===
        Steps: {
            colorPrimary: 'var(--color-primary)',
            colorText: 'var(--color-text-primary)',
            colorTextDescription: 'var(--color-text-secondary)',
            colorFillContent: 'var(--color-fill-primary)',
        },

        // === TIMELINE ===
        Timeline: {
            colorPrimary: 'var(--color-primary)',
            colorText: 'var(--color-text-primary)',
            colorTextSecondary: 'var(--color-text-secondary)',
        },

        // === PAGINATION ===
        Pagination: {
            colorPrimary: 'var(--color-primary)',
            colorPrimaryHover: 'var(--color-primary-hover)',
            colorText: 'var(--color-text-primary)',
            colorTextSecondary: 'var(--color-text-secondary)',
        },

        // === BREADCRUMB ===
        Breadcrumb: {
            colorText: 'var(--color-text-primary)',
            colorTextDescription: 'var(--color-text-secondary)',
            linkColor: 'var(--color-primary)',
            linkHoverColor: 'var(--color-primary-hover)',
        },

        // === DROPDOWN ===
        Dropdown: {
            colorBgElevated: 'var(--color-bg-primary)',
            colorText: 'var(--color-text-primary)',
            colorTextSecondary: 'var(--color-text-secondary)',
        },

        // === MENU ===
        Menu: {
            colorBgElevated: 'var(--color-bg-primary)',
            colorItemBg: 'var(--color-bg-primary)',
            colorItemBgHover: 'var(--color-fill-primary)',
            colorItemBgSelected: 'var(--color-fill-secondary)',
            colorItemBgActive: 'var(--color-fill-secondary)',
            colorItemText: 'var(--color-text-primary)',
            colorItemTextHover: 'var(--color-text-primary)',
            colorItemTextSelected: 'var(--color-primary)',
        },

        // === TABLE ===
        Table: {
            colorBgContainer: 'var(--color-bg-primary)',
            colorBgElevated: 'var(--color-bg-primary)',
            colorBorderSecondary: 'var(--color-fill-primary)',
            colorText: 'var(--color-text-primary)',
            colorTextSecondary: 'var(--color-text-secondary)',
            colorTextHeading: 'var(--color-text-primary)',
            headerBg: 'var(--color-bg-secondary)',
            headerColor: 'var(--color-text-primary)',
            rowHoverBg: 'var(--color-bg-secondary)',
            rowSelectedBg: 'var(--color-fill-primary)',
            rowSelectedHoverBg: 'var(--color-fill-primary)',
        },

        // === CARD ===
        Card: {
            colorBgContainer: 'var(--color-bg-primary)',
            colorBgElevated: 'var(--color-bg-primary)',
            colorBorderSecondary: 'var(--color-fill-primary)',
            colorText: 'var(--color-text-primary)',
            colorTextHeading: 'var(--color-text-primary)',
            colorTextDescription: 'var(--color-text-secondary)',
            headerBg: 'var(--color-bg-secondary)',
            actionsBg: 'var(--color-bg-secondary)',
        },

        // === LAYOUT ===
        Layout: {
            colorBgBody: 'var(--color-bg-secondary)',
            colorBgContainer: 'var(--color-bg-primary)',
            colorBgElevated: 'var(--color-bg-primary)',
            colorBgLayout: 'var(--color-bg-secondary)',
            colorText: 'var(--color-text-primary)',
            colorTextSecondary: 'var(--color-text-secondary)',
            headerBg: 'var(--color-bg-primary)',
            headerColor: 'var(--color-text-primary)',
            footerBg: 'var(--color-bg-primary)',
            siderBg: 'var(--color-bg-primary)',
            triggerBg: 'var(--color-fill-primary)',
            triggerColor: 'var(--color-text-primary)',
        },

        // === TYPOGRAPHY ===
        Typography: {
            colorText: 'var(--color-text-primary)',
            colorTextSecondary: 'var(--color-text-secondary)',
            colorTextDescription: 'var(--color-text-tertiary)',
            colorTextDisabled: 'var(--color-text-quaternary)',
            colorLink: 'var(--color-primary)',
            colorLinkHover: 'var(--color-primary-hover)',
            colorLinkActive: 'var(--color-primary-active)',
        },

        // === SPIN ===
        Spin: {
            colorPrimary: 'var(--color-primary)',
        },

        // === SKELETON ===
        Skeleton: {
            colorFill: 'var(--color-fill-primary)',
            colorFillContent: 'var(--color-fill-secondary)',
        },

        // === EMPTY ===
        Empty: {
            colorText: 'var(--color-text-secondary)',
            colorTextSecondary: 'var(--color-text-tertiary)',
        },

        // === RESULT ===
        Result: {
            colorText: 'var(--color-text-primary)',
            colorTextSecondary: 'var(--color-text-secondary)',
            colorTextDescription: 'var(--color-text-tertiary)',
        },

        // === STATISTIC ===
        Statistic: {
            colorText: 'var(--color-text-primary)',
            colorTextDescription: 'var(--color-text-secondary)',
        },

        // === DESCRIPTIONS ===
        Descriptions: {
            colorText: 'var(--color-text-primary)',
            colorTextSecondary: 'var(--color-text-secondary)',
            colorTextDescription: 'var(--color-text-tertiary)',
            colorFillAlter: 'var(--color-bg-secondary)',
            colorBorder: 'var(--color-border-primary)',
        },

        // === LIST ===
        List: {
            colorText: 'var(--color-text-primary)',
            colorTextSecondary: 'var(--color-text-secondary)',
            colorTextDescription: 'var(--color-text-tertiary)',
            colorFillAlter: 'var(--color-bg-secondary)',
            colorBorder: 'var(--color-border-primary)',
        },

        // === TREE ===
        Tree: {
            colorText: 'var(--color-text-primary)',
            colorTextSecondary: 'var(--color-text-secondary)',
            colorBgContainer: 'var(--color-bg-primary)',
            colorBorder: 'var(--color-border-primary)',
            colorPrimary: 'var(--color-primary)',
        },

        // === TRANSFER ===
        Transfer: {
            colorText: 'var(--color-text-primary)',
            colorTextSecondary: 'var(--color-text-secondary)',
            colorBgContainer: 'var(--color-bg-primary)',
            colorBorder: 'var(--color-border-primary)',
            colorPrimary: 'var(--color-primary)',
        },

        // === CASCADER ===
        Cascader: {
            colorText: 'var(--color-text-primary)',
            colorTextSecondary: 'var(--color-text-secondary)',
            colorBgContainer: 'var(--color-bg-primary)',
            colorBorder: 'var(--color-border-primary)',
            colorPrimary: 'var(--color-primary)',
        },

        // === MENTIONS ===
        Mentions: {
            colorText: 'var(--color-text-primary)',
            colorTextSecondary: 'var(--color-text-secondary)',
            colorBgContainer: 'var(--color-bg-primary)',
            colorBorder: 'var(--color-border-primary)',
            colorPrimary: 'var(--color-primary)',
        },

        // === DIVIDER ===
        Divider: {
            colorSplit: 'var(--color-border-primary)',
            colorText: 'var(--color-text-secondary)',
        },

        // === SPACE ===
        Space: {
            colorSplit: 'var(--color-border-primary)',
        },

        // === GRID ===
        Grid: {
            colorText: 'var(--color-text-primary)',
            colorTextSecondary: 'var(--color-text-secondary)',
        },

        // === FLEX ===
        Flex: {
            colorText: 'var(--color-text-primary)',
            colorTextSecondary: 'var(--color-text-secondary)',
        },

        // === TOUR ===
        Tour: {
            colorBgElevated: 'var(--color-bg-primary)',
            colorText: 'var(--color-text-primary)',
            colorTextSecondary: 'var(--color-text-secondary)',
            colorPrimary: 'var(--color-primary)',
        },

        // === SEGMENTED ===
        Segmented: {
            colorText: 'var(--color-text-primary)',
            colorTextSecondary: 'var(--color-text-secondary)',
            colorBgContainer: 'var(--color-bg-primary)',
            colorBgElevated: 'var(--color-fill-primary)',
            colorPrimary: 'var(--color-primary)',
        },

        // === FLOAT BUTTON ===
        FloatButton: {
            colorBgElevated: 'var(--color-bg-primary)',
            colorText: 'var(--color-text-primary)',
            colorPrimary: 'var(--color-primary)',
        },

        // === APP ===
        App: {
            colorText: 'var(--color-text-primary)',
            colorTextSecondary: 'var(--color-text-secondary)',
            colorBgContainer: 'var(--color-bg-primary)',
            colorBgElevated: 'var(--color-bg-primary)',
        },

        // === QR CODE ===
        QRCode: {
            colorText: 'var(--color-text-primary)',
            colorBgContainer: 'var(--color-bg-primary)',
        },

        // === COLOR PICKER ===
        ColorPicker: {
            colorText: 'var(--color-text-primary)',
            colorTextSecondary: 'var(--color-text-secondary)',
            colorBgContainer: 'var(--color-bg-primary)',
            colorBorder: 'var(--color-border-primary)',
        },

        // === ALERT ===
        Alert: {
            colorSuccess: 'var(--color-success)',
            colorWarning: 'var(--color-warning)',
            colorError: 'var(--color-error)',
            colorInfo: 'var(--color-info)',
            colorText: 'var(--color-text-primary)',
            colorTextSecondary: 'var(--color-text-secondary)',
            colorBgContainer: 'var(--color-bg-primary)',
            colorBorder: 'var(--color-border-primary)',
        },

        // === COLLAPSE ===
        Collapse: {
            colorText: 'var(--color-text-primary)',
            colorTextSecondary: 'var(--color-text-secondary)',
            colorBgContainer: 'var(--color-bg-primary)',
            colorBorder: 'var(--color-border-primary)',
            colorPrimary: 'var(--color-primary)',
        },
    },
});
