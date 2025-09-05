import { useCallback, useMemo, useState } from 'react';

import type { DispersionConfigs, UseDispersionConfigReturn } from '../types/product-detail.types';
import { getAvailableDispersionAngles, getDispersionConfig } from '../utils/product-detail.utils';

/**
 * Custom hook for managing dispersion configuration state
 * Handles dispersion angle selection and configuration logic
 */
export const useDispersionConfig = (
    configs: DispersionConfigs,
    initialAngle: number = 60,
): UseDispersionConfigReturn => {
    const [selectedDispersion, setSelectedDispersion] = useState(initialAngle);

    // Get current configuration
    const currentConfig = useMemo(() => {
        return getDispersionConfig(configs, selectedDispersion);
    }, [configs, selectedDispersion]);

    // Get available angles
    const availableAngles = useMemo(() => {
        return getAvailableDispersionAngles(configs);
    }, [configs]);

    // Handle dispersion change
    const handleSetSelectedDispersion = useCallback(
        (angle: number) => {
            if (availableAngles.includes(angle)) {
                setSelectedDispersion(angle);
            }
        },
        [availableAngles],
    );

    // Get configuration by angle
    const getConfigByAngle = useCallback(
        (angle: number) => {
            return getDispersionConfig(configs, angle);
        },
        [configs],
    );

    return {
        selectedDispersion,
        currentConfig,
        setSelectedDispersion: handleSetSelectedDispersion,
        getConfigByAngle,
    };
};
