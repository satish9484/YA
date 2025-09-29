import type React from 'react';
import { memo, useState } from 'react';

import {
    Avatar,
    Badge,
    Button,
    Card,
    Divider,
    Image,
    Input,
    Pagination,
    Progress,
    Rate,
    Select,
    Space,
    Tooltip,
    Typography,
} from 'antd';

import {
    MessageOutlined as ChatOutlined,
    CheckCircleOutlined,
    FilterOutlined,
    FlagOutlined,
    LikeOutlined,
    QuestionCircleOutlined,
    SearchOutlined,
    ShareAltOutlined,
    SortAscendingOutlined,
    StarFilled,
    UserOutlined,
} from '@ant-design/icons';

import styles from './ReviewsQA.module.scss';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

interface Review {
    id: number;
    user: string;
    rating: number;
    date: string;
    verified: boolean;
    title: string;
    content: string;
    helpful: number;
    images: string[];
    response?: {
        author: string;
        content: string;
        date: string;
    };
}

interface QA {
    id: number;
    question: string;
    answer: string;
    answeredBy: string;
    date: string;
    helpful: number;
}

interface ReviewsQAProps {
    reviews: Review[];
    qa: QA[];
    rating: number;
    reviewCount: number;
    onAskQuestion?: () => void;
    onHelpfulReview?: (reviewId: number) => void;
    onHelpfulAnswer?: (qaId: number) => void;
}

const ReviewsQA: React.FC<ReviewsQAProps> = memo(
    ({ reviews, qa, rating, reviewCount, onAskQuestion, onHelpfulReview, onHelpfulAnswer }) => {
        const [searchQuery, setSearchQuery] = useState('');
        const [ratingFilter, setRatingFilter] = useState<string>('all');
        const [sortBy, setSortBy] = useState<string>('newest');
        const [activeTab, setActiveTab] = useState<'reviews' | 'qa'>('reviews');

        // Calculate rating breakdown with more realistic distribution
        const ratingBreakdown = [5, 4, 3, 2, 1].map(star => ({
            stars: star,
            count: Math.floor(
                reviewCount *
                    (star === 5
                        ? 0.65
                        : star === 4
                          ? 0.22
                          : star === 3
                            ? 0.08
                            : star === 2
                              ? 0.03
                              : 0.02),
            ),
            percentage: Math.round(
                (star === 5
                    ? 0.65
                    : star === 4
                      ? 0.22
                      : star === 3
                        ? 0.08
                        : star === 2
                          ? 0.03
                          : 0.02) * 100,
            ),
        }));

        const filteredReviews = reviews.filter(review => {
            const matchesSearch =
                searchQuery === '' ||
                review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                review.user.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRating =
                ratingFilter === 'all' || review.rating.toString() === ratingFilter;
            return matchesSearch && matchesRating;
        });

        const filteredQA = qa.filter(
            item =>
                searchQuery === '' ||
                item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
        );

        // Sort reviews
        const sortedReviews = [...filteredReviews].sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                case 'oldest':
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                case 'highest':
                    return b.rating - a.rating;
                case 'lowest':
                    return a.rating - b.rating;
                case 'most_helpful':
                    return b.helpful - a.helpful;
                default:
                    return 0;
            }
        });

        return (
            <section className={styles.reviewsQaSection}>
                <div className="container">
                    {/* Section Header */}
                    <div className={styles.sectionHeader}>
                        <div className={styles.headerContent}>
                            <Title level={2} className={styles.sectionTitle}>
                                Customer Reviews & Q&A
                            </Title>
                            <Text className={styles.sectionSubtitle}>
                                Real feedback from professionals who use our products
                            </Text>
                        </div>
                        <div className={styles.headerStats}>
                            <div className={styles.overallRating}>
                                <div className={styles.ratingNumber}>{rating}</div>
                                <div className={styles.ratingStars}>
                                    <Rate disabled value={rating} />
                                </div>
                                <Text className={styles.ratingCount}>
                                    Based on {reviewCount} reviews
                                </Text>
                            </div>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className={styles.tabNavigation}>
                        <div className={styles.tabButtons}>
                            <Button
                                type={activeTab === 'reviews' ? 'primary' : 'default'}
                                onClick={() => setActiveTab('reviews')}
                                className={styles.tabButton}
                                icon={<StarFilled />}
                            >
                                Reviews ({reviewCount})
                            </Button>
                            <Button
                                type={activeTab === 'qa' ? 'primary' : 'default'}
                                onClick={() => setActiveTab('qa')}
                                className={styles.tabButton}
                                icon={<QuestionCircleOutlined />}
                            >
                                Q&A ({qa.length})
                            </Button>
                        </div>
                    </div>

                    {/* Reviews Tab */}
                    {activeTab === 'reviews' && (
                        <div className={styles.reviewsTab}>
                            {/* Reviews Header */}
                            <div className={styles.reviewsHeader}>
                                <div className={styles.reviewsTitleGroup}>
                                    <Title level={3} className={styles.reviewsTitle}>
                                        Customer Reviews
                                    </Title>
                                    <Text className={styles.reviewsSubtitle}>
                                        See what our customers are saying
                                    </Text>
                                </div>
                                <div className={styles.reviewsControls}>
                                    <div className={styles.controlsGroup}>
                                        <Select
                                            placeholder="Filter by rating"
                                            value={ratingFilter}
                                            onChange={setRatingFilter}
                                            className={styles.filterSelect}
                                            suffixIcon={<FilterOutlined />}
                                        >
                                            <Select.Option value="all">All Ratings</Select.Option>
                                            <Select.Option value="5">5 Stars</Select.Option>
                                            <Select.Option value="4">4 Stars</Select.Option>
                                            <Select.Option value="3">3 Stars</Select.Option>
                                            <Select.Option value="2">2 Stars</Select.Option>
                                            <Select.Option value="1">1 Star</Select.Option>
                                        </Select>
                                        <Select
                                            placeholder="Sort by"
                                            value={sortBy}
                                            onChange={setSortBy}
                                            className={styles.sortSelect}
                                            suffixIcon={<SortAscendingOutlined />}
                                        >
                                            <Select.Option value="newest">Newest</Select.Option>
                                            <Select.Option value="oldest">Oldest</Select.Option>
                                            <Select.Option value="highest">
                                                Highest Rating
                                            </Select.Option>
                                            <Select.Option value="lowest">
                                                Lowest Rating
                                            </Select.Option>
                                            <Select.Option value="most_helpful">
                                                Most Helpful
                                            </Select.Option>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Rating Breakdown */}
                            <div className={styles.ratingBreakdown}>
                                <div className={styles.breakdownHeader}>
                                    <Text className={styles.breakdownTitle}>
                                        Rating Distribution
                                    </Text>
                                </div>
                                <div className={styles.breakdownBars}>
                                    {ratingBreakdown.map(({ stars, count, percentage }) => (
                                        <div key={stars} className={styles.ratingBar}>
                                            <div className={styles.starLabel}>
                                                <Text className={styles.starNumber}>{stars}</Text>
                                                <StarFilled className={styles.starIcon} />
                                            </div>
                                            <div className={styles.progressContainer}>
                                                <Progress
                                                    percent={percentage}
                                                    showInfo={false}
                                                    className={styles.ratingProgress}
                                                    strokeColor={{
                                                        '0%': '#ffd700',
                                                        '100%': '#ffed4e',
                                                    }}
                                                />
                                            </div>
                                            <div className={styles.starCount}>
                                                <Text className={styles.countNumber}>{count}</Text>
                                                <Text className={styles.countLabel}>reviews</Text>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Search */}
                            <div className={styles.searchSection}>
                                <Search
                                    placeholder="Search reviews..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className={styles.searchInput}
                                    prefix={<SearchOutlined />}
                                    allowClear
                                />
                            </div>

                            {/* Reviews List */}
                            <div className={styles.reviewsList}>
                                {sortedReviews.map(review => (
                                    <Card key={review.id} className={styles.reviewCard}>
                                        <div className={styles.reviewCardHeader}>
                                            <div className={styles.reviewerInfo}>
                                                <Avatar
                                                    size={48}
                                                    icon={<UserOutlined />}
                                                    className={styles.reviewerAvatar}
                                                />
                                                <div className={styles.reviewerDetails}>
                                                    <div className={styles.reviewerName}>
                                                        <Text strong className={styles.name}>
                                                            {review.user}
                                                        </Text>
                                                        {review.verified && (
                                                            <Tooltip title="Verified Purchase">
                                                                <Badge
                                                                    count={<CheckCircleOutlined />}
                                                                    className={styles.verifiedBadge}
                                                                />
                                                            </Tooltip>
                                                        )}
                                                    </div>
                                                    <div className={styles.reviewMeta}>
                                                        <Rate
                                                            disabled
                                                            value={review.rating}
                                                            className={styles.reviewRating}
                                                        />
                                                        <Text className={styles.reviewDate}>
                                                            {review.date}
                                                        </Text>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.reviewActions}>
                                                <Space>
                                                    <Tooltip title="Share">
                                                        <Button
                                                            icon={<ShareAltOutlined />}
                                                            size="small"
                                                            className={styles.actionBtn}
                                                        />
                                                    </Tooltip>
                                                    <Tooltip title="Report">
                                                        <Button
                                                            icon={<FlagOutlined />}
                                                            size="small"
                                                            className={styles.actionBtn}
                                                        />
                                                    </Tooltip>
                                                </Space>
                                            </div>
                                        </div>

                                        <div className={styles.reviewContent}>
                                            <Title level={5} className={styles.reviewTitle}>
                                                {review.title}
                                            </Title>
                                            <Paragraph className={styles.reviewText}>
                                                {review.content}
                                            </Paragraph>
                                            {review.images.length > 0 && (
                                                <div className={styles.reviewImages}>
                                                    {review.images.map((image, index) => (
                                                        <Image
                                                            key={index}
                                                            src={image}
                                                            alt={`Review image ${index + 1}`}
                                                            className={styles.reviewImage}
                                                            width={80}
                                                            height={80}
                                                            preview={{
                                                                mask: (
                                                                    <div
                                                                        className={styles.imageMask}
                                                                    >
                                                                        View
                                                                    </div>
                                                                ),
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Response from seller */}
                                        {review.response && (
                                            <div className={styles.sellerResponse}>
                                                <Divider className={styles.responseDivider} />
                                                <div className={styles.responseHeader}>
                                                    <Text className={styles.responseLabel}>
                                                        Response from seller
                                                    </Text>
                                                    <Text className={styles.responseDate}>
                                                        {review.response.date}
                                                    </Text>
                                                </div>
                                                <Paragraph className={styles.responseText}>
                                                    {review.response.content}
                                                </Paragraph>
                                            </div>
                                        )}

                                        <div className={styles.reviewFooter}>
                                            <div className={styles.reviewHelpful}>
                                                <Button
                                                    className={styles.helpfulBtn}
                                                    icon={<LikeOutlined />}
                                                    onClick={() => onHelpfulReview?.(review.id)}
                                                >
                                                    Helpful ({review.helpful})
                                                </Button>
                                            </div>
                                            <div className={styles.reviewResponse}>
                                                <Button
                                                    type="link"
                                                    icon={<ChatOutlined />}
                                                    className={styles.responseBtn}
                                                >
                                                    Reply
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            <div className={styles.reviewsPagination}>
                                <Pagination
                                    total={sortedReviews.length}
                                    pageSize={5}
                                    showSizeChanger={false}
                                    showQuickJumper
                                    showTotal={(total, range) =>
                                        `${range[0]}-${range[1]} of ${total} reviews`
                                    }
                                />
                            </div>
                        </div>
                    )}

                    {/* Q&A Tab */}
                    {activeTab === 'qa' && (
                        <div className={styles.qaTab}>
                            <div className={styles.qaHeader}>
                                <div className={styles.qaTitleGroup}>
                                    <Title level={3} className={styles.qaTitle}>
                                        Questions & Answers
                                    </Title>
                                    <Text className={styles.qaSubtitle}>
                                        Get answers from our community and experts
                                    </Text>
                                </div>
                                <Button
                                    type="primary"
                                    onClick={onAskQuestion}
                                    className={styles.askQuestionBtn}
                                    icon={<QuestionCircleOutlined />}
                                >
                                    Ask a Question
                                </Button>
                            </div>

                            <div className={styles.qaSearch}>
                                <Search
                                    placeholder="Search questions and answers..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className={styles.qaSearchInput}
                                    prefix={<SearchOutlined />}
                                    allowClear
                                />
                            </div>

                            <div className={styles.qaList}>
                                {filteredQA.map(item => (
                                    <Card key={item.id} className={styles.qaCard}>
                                        <div className={styles.qaQuestion}>
                                            <div className={styles.qaQuestionHeader}>
                                                <Text className={styles.qaQuestionText}>
                                                    {item.question}
                                                </Text>
                                                <div className={styles.qaQuestionMeta}>
                                                    <Text className={styles.qaDate}>
                                                        {item.date}
                                                    </Text>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.qaAnswer}>
                                            <div className={styles.qaAnswerHeader}>
                                                <Text className={styles.qaAnswerLabel}>
                                                    Answer from {item.answeredBy}
                                                </Text>
                                            </div>
                                            <Paragraph className={styles.qaAnswerText}>
                                                {item.answer}
                                            </Paragraph>
                                            <div className={styles.qaAnswerFooter}>
                                                <Button
                                                    className={styles.qaHelpfulBtn}
                                                    icon={<LikeOutlined />}
                                                    onClick={() => onHelpfulAnswer?.(item.id)}
                                                >
                                                    Helpful ({item.helpful})
                                                </Button>
                                                <Space>
                                                    <Button type="link" icon={<ShareAltOutlined />}>
                                                        Share
                                                    </Button>
                                                    <Button type="link" icon={<FlagOutlined />}>
                                                        Report
                                                    </Button>
                                                </Space>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            <div className={styles.qaFooter}>
                                <Button type="primary" size="large" className={styles.loadMoreBtn}>
                                    Load More Questions
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        );
    },
);

ReviewsQA.displayName = 'ReviewsQA';

export default ReviewsQA;
