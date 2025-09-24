import style from './style.module.scss';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = props => {
    const { children, className } = props;

    return (
        <>
            <div className={`${style.card} ${className}`}>{children}</div>
        </>
    );
};

export default Card;
