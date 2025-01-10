import './ItemCard.css';
import Chip from '../Chips/Chip';

interface ItemCardProps {
    titleCard: string;
    contentCard: string;
    hasTags?: boolean;
    tagsList?: string[];
}

export const ItemCard = ({titleCard, contentCard, hasTags, tagsList}: ItemCardProps) => {
    return (
        <div
            className='itemCard'
        >
            <header className='itemCardHeader heading-2-bold'>
                <span>{titleCard}</span>
            </header>
            {hasTags && tagsList && (
                <div className='tagsList'>
                    {tagsList.map((tag, index) => (
                        <Chip key={index} label={tag} ariaLabel={tag} isLarge/>
                    ))}
                </div>
            )}
            <p className='body-2-regular'>
                {contentCard}
            </p>
        </div>
    )
}

export default ItemCard;