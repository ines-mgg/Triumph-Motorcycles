import './Button.css';

interface ButtonProps {
  label: string;
  ariaLabel: string;
  isDisabled?: boolean;
}

export const Button = ({ label, ariaLabel, isDisabled }: ButtonProps) => {
  return (
    <button 
      className={`button cta-medium ${isDisabled ? 'disabled' : ''}`} 
      aria-label={ariaLabel} 
      aria-disabled={isDisabled} 
      data-cy="button"
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};

export default Button;