import className from 'classnames';
import React from 'react';

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
      'rounded-[9999px]': rounded,
      'bg-white': outline,
      'opacity-70': rest.disabled
    }
  );

  return (
    <button ref={ref} {...rest} className={classes}>
      {children}
    </button>
  );
}

export default React.forwardRef(Button);
