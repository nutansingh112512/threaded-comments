import className from 'classnames';
import React from 'react';
import  { GoSync } from 'react-icons/go';

function Button({
  children,
  outline,
  rounded,
  loading,
  ...rest
}, ref) {
  const classes = className(
    rest.className,
    'flex items-center justify-center cursor-pointer px-1 py-1',
    {
      'opacity-80': loading,
      'rounded-full': rounded,
      'bg-white': outline,
    }
  );

  return (
    <button ref={ref} {...rest} disabled={loading} className={classes}>
      {loading ? <GoSync className='animate-spin' /> : children}
    </button>
  );
}

export default React.forwardRef(Button);
