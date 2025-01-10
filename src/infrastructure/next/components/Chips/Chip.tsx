import './Chip.css';

interface ChipProps {
    label: string;
    ariaLabel: string;
    isLarge?: boolean;
}

export const Chip = ({label, ariaLabel, isLarge}: ChipProps) => {
    return (
        <div
            className={`chip ${isLarge ? 'large body-1-bold' : 'small caption-bold'}`}   
            aria-label={ariaLabel} 
            data-cy="chip"
        >
            <span>{label}</span>
        </div>
    )
}

export default Chip;