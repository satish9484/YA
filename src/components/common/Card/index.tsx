import './style.scss';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = (props) => {
    const { children, className } = props;

    return (
        <>
            <div className={`card ${className}`}>{children}</div>
        </>
    );
};

export default Card;
