/**
 * Performance monitoring utilities for Product Detail page optimization
 */

interface PerformanceMetrics {
    componentLoadTime: number;
    bundleSize: number;
    imageLoadTime: number;
    totalPageLoadTime: number;
}

class PerformanceMonitor {
    private metrics: Map<string, PerformanceMetrics> = new Map();
    // private observers: PerformanceObserver[] = [];

    /**
     * Start monitoring component load times
     */
    startComponentMonitoring(componentName: string): () => void {
        const startTime = performance.now();

        return () => {
            const endTime = performance.now();
            const loadTime = endTime - startTime;

            this.recordMetric(componentName, 'componentLoadTime', loadTime);
        };
    }

    /**
     * Monitor image loading performance
     */
    monitorImageLoad(imageSrc: string): Promise<number> {
        return new Promise(resolve => {
            const startTime = performance.now();
            const img = new Image();

            img.onload = () => {
                const loadTime = performance.now() - startTime;
                this.recordMetric(imageSrc, 'imageLoadTime', loadTime);
                resolve(loadTime);
            };

            img.onerror = () => {
                const loadTime = performance.now() - startTime;
                this.recordMetric(imageSrc, 'imageLoadTime', loadTime);
                resolve(loadTime);
            };

            img.src = imageSrc;
        });
    }

    /**
     * Record a performance metric
     */
    private recordMetric(key: string, metric: keyof PerformanceMetrics, value: number): void {
        const existing = this.metrics.get(key) ?? ({} as PerformanceMetrics);
        existing[metric] = value;
        this.metrics.set(key, existing);
    }

    /**
     * Get performance report
     */
    getPerformanceReport(): Record<string, PerformanceMetrics> {
        return Object.fromEntries(this.metrics);
    }

    /**
     * Calculate average load times
     */
    getAverageLoadTimes(): Partial<PerformanceMetrics> {
        const entries = Array.from(this.metrics.values());
        const averages: Partial<PerformanceMetrics> = {};

        if (entries.length === 0) return averages;

        const metrics = [
            'componentLoadTime',
            'imageLoadTime',
            'bundleSize',
            'totalPageLoadTime',
        ] as const;

        metrics.forEach(metric => {
            const values = entries.map(entry => entry[metric]).filter(val => val !== undefined);
            if (values.length > 0) {
                averages[metric] = values.reduce((sum, val) => sum + val, 0) / values.length;
            }
        });

        return averages;
    }

    /**
     * Clear all metrics
     */
    clearMetrics(): void {
        this.metrics.clear();
    }

    /**
     * Export metrics for analysis
     */
    exportMetrics(): string {
        return JSON.stringify(
            {
                timestamp: new Date().toISOString(),
                metrics: this.getPerformanceReport(),
                averages: this.getAverageLoadTimes(),
            },
            null,
            2,
        );
    }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// React hook for component performance monitoring
export const usePerformanceMonitoring = (componentName: string) => {
    const endMonitoring = performanceMonitor.startComponentMonitoring(componentName);

    return {
        endMonitoring,
        monitorImageLoad: performanceMonitor.monitorImageLoad.bind(performanceMonitor),
        getMetrics: () => performanceMonitor.getPerformanceReport()[componentName],
    };
};

export default PerformanceMonitor;
