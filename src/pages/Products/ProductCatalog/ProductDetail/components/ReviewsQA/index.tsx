import type React from 'react';
import { memo, useState } from 'react';

import {
    Avatar,
    Button,
    Card,
    Image,
    Input,
    Pagination,
    Progress,
    Rate,
    Select,
    Tag,
    Typography,
} from 'antd';

import {
    CheckCircleOutlined,
    LikeOutlined,
    MessageOutlined,
    SearchOutlined,
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

        // Calculate rating breakdown
        const ratingBreakdown = [5, 4, 3, 2, 1].map(star => ({
            stars: star,
            count: Math.floor(
                reviewCount *
                    (star === 5
                        ? 0.7
                        : star === 4
                          ? 0.2
                          : star === 3
                            ? 0.05
                            : star === 2
                              ? 0.03
                              : 0.02),
            ),
        }));

        const filteredReviews = reviews.filter(review => {
            const matchesSearch =
                searchQuery === '' ||
                review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                review.content.toLowerCase().includes(searchQuery.toLowerCase());
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

        return (
            <section className={styles.reviewsQaSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <Title level={2} className={styles.sectionTitle}>
                            Customer Reviews & Q&A
                        </Title>
                        <Text className={styles.sectionSubtitle}>
                            Real feedback from professionals who use our products
                        </Text>
                    </div>

                    {/* Reviews Section */}
                    <div className={styles.reviewsSection}>
                        <div className={styles.reviewsHeader}>
                            <div className={styles.reviewsTitleGroup}>
                                <Title level={3} className={styles.reviewsTitle}>
                                    Customer Reviews
                                </Title>
                                <div className={styles.reviewStats}>
                                    <div className={styles.ratingDisplay}>
                                        <Text className={styles.ratingNumber}>{rating}</Text>
                                        <div className={styles.ratingStars}>
                                            <Rate disabled value={rating} />
                                        </div>
                                        <Text className={styles.ratingCount}>
                                            Based on {reviewCount} reviews
                                        </Text>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.reviewFilters}>
                                <Select
                                    placeholder="Filter by rating"
                                    value={ratingFilter}
                                    onChange={setRatingFilter}
                                    style={{ width: 150 }}
                                >
                                    <Select.Option value="all">All Ratings</Select.Option>
                                    <Select.Option value="5">5 Stars</Select.Option>
                                    <Select.Option value="4">4 Stars</Select.Option>
                                    <Select.Option value="3">3 Stars</Select.Option>
                                    <Select.Option value="2">2 Stars</Select.Option>
                                    <Select.Option value="1">1 Star</Select.Option>
                                </Select>
                            </div>
                        </div>

                        {/* Rating Breakdown */}
                        <div className={styles.ratingBreakdown}>
                            {ratingBreakdown.map(({ stars, count }) => (
                                <div key={stars} className={styles.ratingBar}>
                                    <Text className={styles.starLabel}>{stars} Star</Text>
                                    <Progress
                                        percent={(count / reviewCount) * 100}
                                        showInfo={false}
                                        className={styles.ratingProgress}
                                    />
                                    <Text className={styles.starCount}>{count}</Text>
                                </div>
                            ))}
                        </div>

                        {/* Reviews List */}
                        <div className={styles.reviewsList}>
                            {filteredReviews.map(review => (
                                <Card key={review.id} className={styles.reviewCard}>
                                    <div className={styles.reviewCardHeader}>
                                        <div className={styles.reviewerInfo}>
                                            <Avatar icon={<UserOutlined />} />
                                            <div className={styles.reviewerDetails}>
                                                <div className={styles.reviewerName}>
                                                    <Text strong>{review.user}</Text>
                                                    {review.verified && (
                                                        <Tag
                                                            icon={<CheckCircleOutlined />}
                                                            color="green"
                                                            className={styles.verifiedTag}
                                                        >
                                                            Verified Purchase
                                                        </Tag>
                                                    )}
                                                </div>
                                                <div className={styles.reviewRating}>
                                                    <Rate disabled value={review.rating} />
                                                    <Text className={styles.reviewDate}>
                                                        {review.date}
                                                    </Text>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.reviewActions}>
                                            <Button icon={<LikeOutlined />} />
                                            <Button icon={<MessageOutlined />} />
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
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>

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
                                            <Button type="link">Report</Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className={styles.reviewsPagination}>
                            <Pagination
                                total={filteredReviews.length}
                                pageSize={5}
                                showSizeChanger={false}
                            />
                        </div>
                    </div>

                    {/* Q&A Section */}
                    <div className={styles.qaSection}>
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
                                                <Tag className={styles.qaAnsweredBy}>
                                                    Answered by {item.answeredBy}
                                                </Tag>
                                                <Text className={styles.qaDate}>{item.date}</Text>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.qaAnswer}>
                                        <div className={styles.qaAnswerHeader}>
                                            <Text className={styles.qaAnswerLabel}>Answer:</Text>
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
                                            <Button type="link">Report</Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className={styles.qaFooter}>
                            <Button type="primary" size="large">
                                Load More Questions
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        );
    },
);

ReviewsQA.displayName = 'ReviewsQA';

export default ReviewsQA;
