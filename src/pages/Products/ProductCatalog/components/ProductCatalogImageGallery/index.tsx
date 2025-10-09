import type React from 'react';
import { useCallback, useMemo, useState } from 'react';

import { Button, Carousel, Image } from 'antd';

import {
    CloseOutlined,
    LeftOutlined,
    PictureOutlined,
    PlayCircleOutlined,
    RightOutlined,
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
import styles from './ProductCatalogImageGallery.module.scss';
import type { ProductCatalogImageGalleryComponentProps } from './ProductCatalogImageGallery.types';

const ProductCatalogImageGallery: React.FC<ProductCatalogImageGalleryComponentProps> = ({
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

    // Get current image
    const currentImage = mainImages[selectedImage];

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (mainImages.length <= 1) return;

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    handleImageSelect(
                        selectedImage > 0 ? selectedImage - 1 : mainImages.length - 1,
                    );
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    handleImageSelect(
                        selectedImage < mainImages.length - 1 ? selectedImage + 1 : 0,
                    );
                    break;
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    if (currentImage) {
                        handleImageClick(currentImage);
                    }
                    break;
            }
        },
        [mainImages.length, selectedImage, handleImageSelect, currentImage, handleImageClick],
    );

    // Custom toolbar component
    const ImageToolbar: React.FC<{
        onRotateLeft: () => void;
        onRotateRight: () => void;
        onZoomOut: () => void;
        onZoomIn: () => void;
        onClose: () => void;
    }> = ({ onRotateLeft, onRotateRight, onZoomOut, onZoomIn, onClose }) => (
        <div className={styles.productImageGallery__toolbar}>
            <Button
                type="text"
                icon={<RotateLeftOutlined />}
                onClick={onRotateLeft}
                className={styles.productImageGallery__toolbarBtn}
                aria-label="Rotate left"
            />
            <Button
                type="text"
                icon={<RotateRightOutlined />}
                onClick={onRotateRight}
                className={styles.productImageGallery__toolbarBtn}
                aria-label="Rotate right"
            />
            <Button
                type="text"
                icon={<ZoomOutOutlined />}
                onClick={onZoomOut}
                className={styles.productImageGallery__toolbarBtn}
                aria-label="Zoom out"
            />
            <Button
                type="text"
                icon={<ZoomInOutlined />}
                onClick={onZoomIn}
                className={styles.productImageGallery__toolbarBtn}
                aria-label="Zoom in"
            />
            <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={onClose}
                className={styles.productImageGallery__toolbarBtn}
                aria-label="Close"
            />
        </div>
    );

    // Thumbnail strip component
    const ThumbnailStrip: React.FC = () => {
        if (!showThumbnails || mainImages.length <= 1) return null;

        const visibleThumbnails = mainImages.slice(0, maxThumbnails);

        return (
            <div className={styles.productImageGallery__thumbnailStrip}>
                {visibleThumbnails.map((image, index) => (
                    <div
                        key={image.id}
                        className={`${styles.productImageGallery__thumbnail} ${
                            selectedImage === index
                                ? styles.productImageGallery__thumbnailActive
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
                            className={styles.productImageGallery__thumbnailImage}
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
            <div className={styles.productImageGallery__contextGallery}>
                <h5 className={styles.productImageGallery__contextTitle}>In Action</h5>
                <Carousel
                    dots={false}
                    slidesToShow={3}
                    slidesToScroll={1}
                    className={styles.productImageGallery__contextCarousel}
                    responsive={[
                        { breakpoint: 768, settings: { slidesToShow: 2 } },
                        { breakpoint: 480, settings: { slidesToShow: 1 } },
                    ]}
                >
                    {contextImages.map(image => (
                        <div key={image.id} className={styles.productImageGallery__contextItem}>
                            <Image
                                src={image.src}
                                alt={image.alt}
                                className={styles.productImageGallery__contextImage}
                                preview={{
                                    mask: (
                                        <div className={styles.productImageGallery__contextMask}>
                                            <PlayCircleOutlined
                                                className={styles.productImageGallery__contextIcon}
                                            />
                                            <span
                                                className={styles.productImageGallery__contextText}
                                            >
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
            <div
                className={`${styles.productImageGallery} ${styles.productImageGalleryLoading} ${className}`}
            >
                <div className={styles.productImageGallery__mainContainer}>
                    <div className={styles.productImageGallery__mainImage}>
                        <PictureOutlined style={{ fontSize: 48, color: '#ccc' }} />
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (imageError || mainImages.length === 0) {
        return (
            <div
                className={`${styles.productImageGallery} ${styles.productImageGalleryError} ${className}`}
            >
                <div className={styles.productImageGallery__mainContainer}>
                    <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                        <PictureOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                        <p>Failed to load images</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`${styles.productImageGallery} ${className}`}
            role="img"
            aria-label={`Product image gallery`}
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            {/* Main image container */}
            <div className={styles.productImageGallery__mainContainer}>
                {/* Navigation arrows */}
                {mainImages.length > 1 && (
                    <>
                        <Button
                            className={styles.productImageGallery__navButton}
                            type="text"
                            icon={<LeftOutlined />}
                            onClick={() =>
                                handleImageSelect(
                                    selectedImage > 0 ? selectedImage - 1 : mainImages.length - 1,
                                )
                            }
                            disabled={mainImages.length <= 1}
                            aria-label="Previous image"
                        />
                        <Button
                            className={styles.productImageGallery__navButton}
                            type="text"
                            icon={<RightOutlined />}
                            onClick={() =>
                                handleImageSelect(
                                    selectedImage < mainImages.length - 1 ? selectedImage + 1 : 0,
                                )
                            }
                            disabled={mainImages.length <= 1}
                            aria-label="Next image"
                        />
                    </>
                )}

                {/* Image counter */}
                {mainImages.length > 1 && (
                    <div className={styles.productImageGallery__imageCounter}>
                        {selectedImage + 1} of {mainImages.length}
                    </div>
                )}

                {/* Overlay toolbar */}
                {showToolbar && (
                    <div className={styles.productImageGallery__overlayToolbar}>
                        <Button
                            type="text"
                            icon={<ZoomInOutlined />}
                            onClick={() => currentImage && handleImageClick(currentImage)}
                            className={styles.productImageGallery__overlayBtn}
                            aria-label="Zoom in"
                        />
                        <Button
                            type="text"
                            icon={<PictureOutlined />}
                            onClick={() => currentImage && handleImageClick(currentImage)}
                            className={styles.productImageGallery__overlayBtn}
                            aria-label="View fullscreen"
                        />
                    </div>
                )}

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
                        className={styles.productImageGallery__mainImage}
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

export default ProductCatalogImageGallery;
