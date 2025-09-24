import type React from 'react';
import { useCallback, useMemo, useState } from 'react';

import { Button, Carousel, Image } from 'antd';

import {
    CloseOutlined,
    PictureOutlined,
    PlayCircleOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
} from '@ant-design/icons';

import {
    generateImageGallery,
    getContextImages,
    getMainImages,
} from '../../utils/product-detail.utils';
import './ProductImageGallery.module.scss';
import type { ProductImageGalleryComponentProps } from './ProductImageGallery.types';

const ProductImageGallery: React.FC<ProductImageGalleryComponentProps> = ({
    images,
    selectedImage,
    onImageSelect,
    onImageClick,
    className = '',
    showToolbar = true,
    showThumbnails = true,
    showContextGallery = true,
    maxThumbnails = 6,
}) => {
    const [imageLoading, setImageLoading] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Separate main and context images
    const mainImages = useMemo(() => getMainImages(images), [images]);
    const contextImages = useMemo(() => getContextImages(images), [images]);

    // Generate gallery items for preview
    const galleryImages = useMemo(() => generateImageGallery(mainImages), [mainImages]);

    // Handle image selection
    const handleImageSelect = useCallback(
        (index: number) => {
            if (index >= 0 && index < mainImages.length) {
                onImageSelect(index);
            }
        },
        [mainImages.length, onImageSelect],
    );

    // Handle image click
    const handleImageClick = useCallback(
        (image: (typeof mainImages)[0]) => {
            if (onImageClick) {
                onImageClick(image);
            }
        },
        [onImageClick],
    );

    // Handle image loading
    const handleImageLoad = useCallback(() => {
        setImageLoading(false);
        setImageError(false);
    }, []);

    // Handle image error
    const handleImageError = useCallback(() => {
        setImageLoading(false);
        setImageError(true);
    }, []);

    // Custom toolbar component
    const ImageToolbar: React.FC<{
        onRotateLeft: () => void;
        onRotateRight: () => void;
        onZoomOut: () => void;
        onZoomIn: () => void;
        onClose: () => void;
    }> = ({ onRotateLeft, onRotateRight, onZoomOut, onZoomIn, onClose }) => (
        <div className="product-image-gallery__toolbar">
            <Button
                type="text"
                icon={<RotateLeftOutlined />}
                onClick={onRotateLeft}
                className="product-image-gallery__toolbar-btn"
                aria-label="Rotate left"
            />
            <Button
                type="text"
                icon={<RotateRightOutlined />}
                onClick={onRotateRight}
                className="product-image-gallery__toolbar-btn"
                aria-label="Rotate right"
            />
            <Button
                type="text"
                icon={<ZoomOutOutlined />}
                onClick={onZoomOut}
                className="product-image-gallery__toolbar-btn"
                aria-label="Zoom out"
            />
            <Button
                type="text"
                icon={<ZoomInOutlined />}
                onClick={onZoomIn}
                className="product-image-gallery__toolbar-btn"
                aria-label="Zoom in"
            />
            <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={onClose}
                className="product-image-gallery__toolbar-btn"
                aria-label="Close"
            />
        </div>
    );

    // Thumbnail strip component
    const ThumbnailStrip: React.FC = () => {
        if (!showThumbnails || mainImages.length <= 1) return null;

        const visibleThumbnails = mainImages.slice(0, maxThumbnails);

        return (
            <div className="product-image-gallery__thumbnail-strip">
                {visibleThumbnails.map((image, index) => (
                    <div
                        key={image.id}
                        className={`product-image-gallery__thumbnail ${
                            selectedImage === index
                                ? 'product-image-gallery__thumbnail--active'
                                : ''
                        }`}
                        onClick={() => handleImageSelect(index)}
                        role="button"
                        tabIndex={0}
                        aria-label={`View image ${index + 1}`}
                        onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleImageSelect(index);
                            }
                        }}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            className="product-image-gallery__thumbnail-image"
                            preview={false}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                        />
                    </div>
                ))}
            </div>
        );
    };

    // Context gallery component
    const ContextGallery: React.FC = () => {
        if (!showContextGallery || contextImages.length === 0) return null;

        return (
            <div className="product-image-gallery__context-gallery">
                <h5 className="product-image-gallery__context-title">In Action</h5>
                <Carousel
                    dots={false}
                    slidesToShow={3}
                    slidesToScroll={1}
                    className="product-image-gallery__context-carousel"
                    responsive={[
                        { breakpoint: 768, settings: { slidesToShow: 2 } },
                        { breakpoint: 480, settings: { slidesToShow: 1 } },
                    ]}
                >
                    {contextImages.map(image => (
                        <div key={image.id} className="product-image-gallery__context-item">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                className="product-image-gallery__context-image"
                                preview={{
                                    mask: (
                                        <div className="product-image-gallery__context-mask">
                                            <PlayCircleOutlined className="product-image-gallery__context-icon" />
                                            <span className="product-image-gallery__context-text">
                                                View Application
                                            </span>
                                        </div>
                                    ),
                                }}
                                onLoad={handleImageLoad}
                                onError={handleImageError}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        );
    };

    // Loading state
    if (imageLoading) {
        return (
            <div className={`product-image-gallery product-image-gallery--loading ${className}`}>
                <div className="product-image-gallery__main-container">
                    <div className="product-image-gallery__main-image">
                        <PictureOutlined style={{ fontSize: 48, color: '#ccc' }} />
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (imageError || mainImages.length === 0) {
        return (
            <div className={`product-image-gallery product-image-gallery--error ${className}`}>
                <div className="product-image-gallery__main-container">
                    <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                        <PictureOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                        <p>Failed to load images</p>
                    </div>
                </div>
            </div>
        );
    }

    const currentImage = mainImages[selectedImage];

    return (
        <div
            className={`product-image-gallery ${className}`}
            role="img"
            aria-label={`Product image gallery`}
        >
            {/* Main image container */}
            <div className="product-image-gallery__main-container">
                <Image.PreviewGroup
                    items={galleryImages}
                    preview={{
                        toolbarRender: (_, info) =>
                            showToolbar ? (
                                <ImageToolbar
                                    onRotateLeft={() => info.actions.onRotateLeft()}
                                    onRotateRight={() => info.actions.onRotateRight()}
                                    onZoomOut={() => info.actions.onZoomOut()}
                                    onZoomIn={() => info.actions.onZoomIn()}
                                    onClose={() => info.actions.onClose()}
                                />
                            ) : null,
                        scaleStep: 0.5,
                        minScale: 1,
                        maxScale: 3,
                    }}
                >
                    <Image
                        src={currentImage?.src}
                        alt={currentImage?.alt}
                        className="product-image-gallery__main-image"
                        placeholder={
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                }}
                            >
                                <PictureOutlined style={{ fontSize: 48, color: '#ccc' }} />
                            </div>
                        }
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        onClick={() => currentImage && handleImageClick(currentImage)}
                    />
                </Image.PreviewGroup>
            </div>

            {/* Thumbnail strip */}
            <ThumbnailStrip />

            {/* Context gallery */}
            <ContextGallery />
        </div>
    );
};

export default ProductImageGallery;
