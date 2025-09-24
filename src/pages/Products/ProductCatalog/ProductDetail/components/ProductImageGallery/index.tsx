import type React from 'react';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Button, Image, Modal, Tooltip, Typography } from 'antd';

import {
    CloseOutlined,
    DownloadOutlined,
    FullscreenOutlined,
    HeartFilled,
    HeartOutlined,
    LeftOutlined,
    PictureOutlined,
    PlayCircleOutlined,
    RightOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
    ShareAltOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
} from '@ant-design/icons';

import styles from './ProductImageGallery.module.scss';

const { Title, Text } = Typography;

interface ProductImage {
    id: number;
    src: string;
    alt: string;
    type: 'main' | 'gallery' | 'context';
    thumbnail?: string;
    isVideo?: boolean;
    videoUrl?: string;
    placeholder?: string;
    isLoading?: boolean;
}

interface ProductImageGalleryProps {
    images: ProductImage[];
    selectedImage: number;
    onImageSelect: (index: number) => void;
    onImageClick?: (productId: string) => void;
    showThumbnails?: boolean;
    showContextGallery?: boolean;
    showToolbar?: boolean;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = memo(
    ({
        images,
        selectedImage,
        onImageSelect,
        onImageClick,
        showThumbnails = true,
        showContextGallery = true,
        showToolbar = true,
    }) => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [currentImageIndex, setCurrentImageIndex] = useState(selectedImage);
        const [isZoomed, setIsZoomed] = useState(false);
        const [zoomLevel, setZoomLevel] = useState(1);
        const [isFavorited, setIsFavorited] = useState(false);
        const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
        const [imageLoading, setImageLoading] = useState<Set<number>>(new Set());

        const imageRef = useRef<HTMLDivElement>(null);

        // Memoize filtered arrays to prevent recalculation on every render
        const mainImages = useMemo(
            () => images.filter(img => img.type === 'main' || img.type === 'gallery'),
            [images],
        );
        const contextImages = useMemo(() => images.filter(img => img.type === 'context'), [images]);

        // Update current image when selectedImage prop changes
        useEffect(() => {
            setCurrentImageIndex(selectedImage);
        }, [selectedImage]);

        const handleImageClick = useCallback(() => {
            if (onImageClick) {
                onImageClick('product-id'); // You might want to pass actual product ID
            } else {
                setIsModalOpen(true);
            }
        }, [onImageClick]);

        const handlePrevious = useCallback(() => {
            const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : mainImages.length - 1;
            setCurrentImageIndex(newIndex);
            onImageSelect(newIndex);
        }, [currentImageIndex, mainImages.length, onImageSelect]);

        const handleNext = useCallback(() => {
            const newIndex = currentImageIndex < mainImages.length - 1 ? currentImageIndex + 1 : 0;
            setCurrentImageIndex(newIndex);
            onImageSelect(newIndex);
        }, [currentImageIndex, mainImages.length, onImageSelect]);

        const handleZoomIn = useCallback(() => {
            setZoomLevel(prev => Math.min(prev + 0.5, 3));
            setIsZoomed(true);
        }, []);

        const handleZoomOut = useCallback(() => {
            setZoomLevel(prev => {
                const newLevel = Math.max(prev - 0.5, 1);
                if (newLevel === 1) {
                    setIsZoomed(false);
                }
                return newLevel;
            });
        }, []);

        const handleResetZoom = useCallback(() => {
            setZoomLevel(1);
            setIsZoomed(false);
        }, []);

        const handleRotateLeft = useCallback(() => {
            // This would need to be implemented with canvas manipulation
            console.log('Rotate left');
        }, []);

        const handleRotateRight = useCallback(() => {
            // This would need to be implemented with canvas manipulation
            console.log('Rotate right');
        }, []);

        const handleDownload = useCallback(() => {
            const link = document.createElement('a');
            link.href = mainImages[currentImageIndex]?.src || '';
            link.download = `product-image-${currentImageIndex + 1}.jpg`;
            link.click();
        }, [currentImageIndex, mainImages]);

        const handleShare = useCallback(() => {
            if (navigator.share) {
                navigator.share({
                    title: 'Product Image',
                    text: 'Check out this product image',
                    url: mainImages[currentImageIndex]?.src || '',
                });
            } else {
                navigator.clipboard.writeText(mainImages[currentImageIndex]?.src || '');
            }
        }, [currentImageIndex, mainImages]);

        const handleFavorite = useCallback(() => {
            setIsFavorited(prev => !prev);
        }, []);

        const handleImageError = useCallback((imageId: number) => {
            setImageErrors(prev => new Set(prev).add(imageId));
            setImageLoading(prev => {
                const newSet = new Set(prev);
                newSet.delete(imageId);
                return newSet;
            });
        }, []);

        const handleImageLoad = useCallback((imageId: number) => {
            setImageLoading(prev => {
                const newSet = new Set(prev);
                newSet.delete(imageId);
                return newSet;
            });
            setImageErrors(prev => {
                const newSet = new Set(prev);
                newSet.delete(imageId);
                return newSet;
            });
        }, []);

        const handleImageLoadStart = useCallback((imageId: number) => {
            setImageLoading(prev => new Set(prev).add(imageId));
        }, []);

        // Memoize current image and its states to prevent recalculation
        const currentImage = useMemo(
            () => mainImages[currentImageIndex],
            [mainImages, currentImageIndex],
        );
        const isCurrentImageLoading = useMemo(
            () => currentImage && imageLoading.has(currentImage.id),
            [currentImage, imageLoading],
        );
        const isCurrentImageError = useMemo(
            () => currentImage && imageErrors.has(currentImage.id),
            [currentImage, imageErrors],
        );

        // Memoized retry handler for image errors
        const handleImageRetry = useCallback(() => {
            if (currentImage) {
                setImageErrors(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(currentImage.id);
                    return newSet;
                });
            }
        }, [currentImage]);

        // Memoize style objects to prevent recreation on every render
        const mainImageStyle = useMemo(
            () => ({
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
                transition: 'transform 0.3s ease',
            }),
            [zoomLevel],
        );

        const modalImageStyle = useMemo(
            () => ({
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
            }),
            [zoomLevel],
        );

        // Memoized placeholder component for loading/error states
        const ImagePlaceholder = useMemo(() => {
            const PlaceholderComponent = memo(
                ({
                    isLoading,
                    isError,
                    alt: _alt,
                    className = '',
                    onRetry,
                }: {
                    isLoading: boolean;
                    isError: boolean;
                    alt: string;
                    className?: string;
                    onRetry?: () => void;
                }) => (
                    <div className={`${styles['image-placeholder']} ${className}`}>
                        {isLoading ? (
                            <>
                                <div className={styles['loading-spinner']} />
                                <Text type="secondary">Loading image...</Text>
                            </>
                        ) : isError ? (
                            <>
                                <PictureOutlined className={styles['placeholder-icon']} />
                                <Text type="secondary">Image not available</Text>
                                <Button type="link" size="small" onClick={onRetry}>
                                    Retry
                                </Button>
                            </>
                        ) : (
                            <>
                                <PictureOutlined className={styles['placeholder-icon']} />
                                <Text type="secondary">No image available</Text>
                            </>
                        )}
                    </div>
                ),
            );
            PlaceholderComponent.displayName = 'ImagePlaceholder';
            return PlaceholderComponent;
        }, []);

        return (
            <div className={styles['modern-image-gallery']}>
                {/* Main Image Container */}
                <div className={styles['main-image-container']}>
                    <div className={styles['image-wrapper']} ref={imageRef}>
                        {isCurrentImageLoading || isCurrentImageError || !currentImage ? (
                            <ImagePlaceholder
                                isLoading={isCurrentImageLoading || false}
                                isError={isCurrentImageError || false}
                                alt={currentImage?.alt || 'Product image'}
                                className={styles['main-image-placeholder']}
                                onRetry={handleImageRetry}
                            />
                        ) : (
                            <Image
                                src={currentImage.src}
                                alt={currentImage.alt}
                                className={`${styles['main-image']} ${isZoomed ? styles.zoomed : ''}`}
                                style={mainImageStyle}
                                onLoadStart={() => handleImageLoadStart(currentImage.id)}
                                onLoad={() => handleImageLoad(currentImage.id)}
                                onError={() => handleImageError(currentImage.id)}
                                onClick={handleImageClick}
                                preview={false}
                            />
                        )}

                        {/* Image Overlay Controls */}
                        <div className={styles['image-overlay']}>
                            <div className={styles['overlay-controls']}>
                                <Tooltip title="Previous">
                                    <Button
                                        type="text"
                                        icon={<LeftOutlined />}
                                        onClick={handlePrevious}
                                        className={styles['overlay-btn']}
                                    />
                                </Tooltip>

                                <div className={styles['center-controls']}>
                                    <Tooltip title="Zoom In">
                                        <Button
                                            type="text"
                                            icon={<ZoomInOutlined />}
                                            onClick={handleZoomIn}
                                            className={styles['overlay-btn']}
                                        />
                                    </Tooltip>

                                    <Tooltip title="Fullscreen">
                                        <Button
                                            type="text"
                                            icon={<FullscreenOutlined />}
                                            onClick={() => setIsModalOpen(true)}
                                            className={styles['overlay-btn']}
                                        />
                                    </Tooltip>

                                    <Tooltip title="Zoom Out">
                                        <Button
                                            type="text"
                                            icon={<ZoomOutOutlined />}
                                            onClick={handleZoomOut}
                                            className={styles['overlay-btn']}
                                        />
                                    </Tooltip>
                                </div>

                                <Tooltip title="Next">
                                    <Button
                                        type="text"
                                        icon={<RightOutlined />}
                                        onClick={handleNext}
                                        className={styles['overlay-btn']}
                                    />
                                </Tooltip>
                            </div>
                        </div>

                        {/* Image Counter */}
                        <div className={styles['image-counter']}>
                            <Text type="secondary">
                                {currentImageIndex + 1} of {mainImages.length}
                            </Text>
                        </div>

                        {/* Zoom Indicator */}
                        {isZoomed && (
                            <div className={styles['zoom-indicator']}>
                                <Text type="secondary">{Math.round(zoomLevel * 100)}%</Text>
                                <Button
                                    type="text"
                                    size="small"
                                    onClick={handleResetZoom}
                                    className={styles['reset-zoom-btn']}
                                >
                                    Reset
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    {showToolbar && (
                        <div className={styles['action-buttons']}>
                            <Tooltip
                                title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                            >
                                <Button
                                    type="text"
                                    icon={isFavorited ? <HeartFilled /> : <HeartOutlined />}
                                    onClick={handleFavorite}
                                    className={`${styles['action-btn']} ${isFavorited ? styles.favorited : ''}`}
                                />
                            </Tooltip>

                            <Tooltip title="Download">
                                <Button
                                    type="text"
                                    icon={<DownloadOutlined />}
                                    onClick={handleDownload}
                                    className={styles['action-btn']}
                                />
                            </Tooltip>

                            <Tooltip title="Share">
                                <Button
                                    type="text"
                                    icon={<ShareAltOutlined />}
                                    onClick={handleShare}
                                    className={styles['action-btn']}
                                />
                            </Tooltip>
                        </div>
                    )}
                </div>

                {/* Thumbnail Strip */}
                {showThumbnails && mainImages.length > 1 && (
                    <div className={styles['thumbnail-strip']}>
                        <div className={styles['thumbnail-container']}>
                            {mainImages.map((image, index) => {
                                const isThumbnailLoading = imageLoading.has(image.id);
                                const isThumbnailError = imageErrors.has(image.id);
                                const isActive = currentImageIndex === index;

                                return (
                                    <div
                                        key={image.id}
                                        className={`${styles.thumbnail} ${isActive ? styles.active : ''}`}
                                        onClick={() => {
                                            setCurrentImageIndex(index);
                                            onImageSelect(index);
                                        }}
                                    >
                                        {isThumbnailLoading || isThumbnailError ? (
                                            <div className={styles['thumbnail-placeholder']}>
                                                {isThumbnailLoading ? (
                                                    <div className={styles['loading-spinner']} />
                                                ) : (
                                                    <PictureOutlined
                                                        className={styles['placeholder-icon']}
                                                    />
                                                )}
                                            </div>
                                        ) : (
                                            <Image
                                                src={image.thumbnail ?? image.src}
                                                alt={image.alt}
                                                className={styles['thumbnail-image']}
                                                preview={false}
                                                onLoadStart={() => handleImageLoadStart(image.id)}
                                                onLoad={() => handleImageLoad(image.id)}
                                                onError={() => handleImageError(image.id)}
                                            />
                                        )}
                                        {image.isVideo && (
                                            <div className={styles['video-indicator']}>
                                                <PlayCircleOutlined />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Context Gallery */}
                {showContextGallery && contextImages.length > 0 && (
                    <div className={styles['context-gallery']}>
                        <Title level={5} className={styles['context-title']}>
                            In Action
                        </Title>
                        <div className={styles['context-images']}>
                            {contextImages.map(image => {
                                const isContextLoading = imageLoading.has(image.id);
                                const isContextError = imageErrors.has(image.id);

                                return (
                                    <div key={image.id} className={styles['context-image-item']}>
                                        {isContextLoading || isContextError ? (
                                            <div className={styles['context-placeholder']}>
                                                {isContextLoading ? (
                                                    <div className={styles['loading-spinner']} />
                                                ) : (
                                                    <PictureOutlined
                                                        className={styles['placeholder-icon']}
                                                    />
                                                )}
                                            </div>
                                        ) : (
                                            <Image
                                                src={image.src}
                                                alt={image.alt}
                                                className={styles['context-image']}
                                                onLoadStart={() => handleImageLoadStart(image.id)}
                                                onLoad={() => handleImageLoad(image.id)}
                                                onError={() => handleImageError(image.id)}
                                                preview={{
                                                    mask: (
                                                        <div className={styles['context-mask']}>
                                                            {image.isVideo ? (
                                                                <>
                                                                    <PlayCircleOutlined />
                                                                    <span>Play Video</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <PictureOutlined />
                                                                    <span>View Application</span>
                                                                </>
                                                            )}
                                                        </div>
                                                    ),
                                                }}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Fullscreen Modal */}
                <Modal
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                    width="90vw"
                    style={{ top: 20 }}
                    className={styles['image-modal']}
                >
                    <div className={styles['modal-content']}>
                        <div className={styles['modal-header']}>
                            <div className={styles['modal-controls']}>
                                <Button
                                    type="text"
                                    icon={<RotateLeftOutlined />}
                                    onClick={handleRotateLeft}
                                />
                                <Button
                                    type="text"
                                    icon={<RotateRightOutlined />}
                                    onClick={handleRotateRight}
                                />
                                <Button
                                    type="text"
                                    icon={<ZoomOutOutlined />}
                                    onClick={handleZoomOut}
                                />
                                <Button
                                    type="text"
                                    icon={<ZoomInOutlined />}
                                    onClick={handleZoomIn}
                                />
                                <Button
                                    type="text"
                                    icon={<DownloadOutlined />}
                                    onClick={handleDownload}
                                />
                                <Button
                                    type="text"
                                    icon={<ShareAltOutlined />}
                                    onClick={handleShare}
                                />
                            </div>
                            <Button
                                type="text"
                                icon={<CloseOutlined />}
                                onClick={() => setIsModalOpen(false)}
                                className={styles['close-btn']}
                            />
                        </div>

                        <div className={styles['modal-image-container']}>
                            <Button
                                type="text"
                                icon={<LeftOutlined />}
                                onClick={handlePrevious}
                                className={`${styles['nav-btn']} ${styles['prev-btn']}`}
                            />

                            {isCurrentImageLoading || isCurrentImageError || !currentImage ? (
                                <ImagePlaceholder
                                    isLoading={isCurrentImageLoading || false}
                                    isError={isCurrentImageError || false}
                                    alt={currentImage?.alt || 'Product image'}
                                    className={styles['modal-image-placeholder']}
                                    onRetry={handleImageRetry}
                                />
                            ) : (
                                <Image
                                    src={currentImage.src}
                                    alt={currentImage.alt}
                                    className={styles['modal-image']}
                                    style={modalImageStyle}
                                />
                            )}

                            <Button
                                type="text"
                                icon={<RightOutlined />}
                                onClick={handleNext}
                                className={`${styles['nav-btn']} ${styles['next-btn']}`}
                            />
                        </div>

                        <div className={styles['modal-footer']}>
                            <Text type="secondary">
                                {currentImageIndex + 1} of {mainImages.length}
                            </Text>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    },
);

ProductImageGallery.displayName = 'ProductImageGallery';

export default ProductImageGallery;
