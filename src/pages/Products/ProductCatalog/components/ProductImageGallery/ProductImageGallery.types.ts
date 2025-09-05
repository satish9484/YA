import type { ProductImage, ProductImageGalleryProps } from '../../types/product-detail.types';

export interface ProductImageGalleryComponentProps extends ProductImageGalleryProps {
    readonly className?: string;
    readonly showToolbar?: boolean;
    readonly showThumbnails?: boolean;
    readonly showContextGallery?: boolean;
    readonly maxThumbnails?: number;
}

export interface ImageToolbarProps {
    readonly onRotateLeft: () => void;
    readonly onRotateRight: () => void;
    readonly onZoomOut: () => void;
    readonly onZoomIn: () => void;
    readonly onClose: () => void;
}

export interface ThumbnailStripProps {
    readonly images: ProductImage[];
    readonly selectedImage: number;
    readonly onImageSelect: (index: number) => void;
    readonly maxThumbnails?: number;
}

export interface ContextGalleryProps {
    readonly images: ProductImage[];
    readonly onImageClick?: (image: ProductImage) => void;
}
