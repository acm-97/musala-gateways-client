import { memo, ReactNode } from 'react';
import classnames from 'classnames';

type ButtonProps = {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
};

const Button = ({ onClick, className, children = '', type = 'button', disabled = false }: ButtonProps) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={type}
    disabled={disabled}
    className={classnames(
      'mr-2 inline-flex items-center rounded-lg bg-gray-900 px-5 py-2.5 text-center text-sm font-medium text-white   hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-800',
      className,
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

export default memo(Button);
