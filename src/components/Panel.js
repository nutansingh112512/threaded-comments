import classNames from "classnames";
import React from "react";

function Panel ({ children, ...rest }, ref) {
    const classes = classNames(rest.className, 'flex flex-row items-start bg-white sm:p-5 p-3 rounded-xl mt-5');

    return(
        <div className={classes} ref={ref}>
            {children}
        </div>
    );
}

export default React.forwardRef(Panel);