import './Button.css';

function Button({
    onClick,
    type,
    view,
    newClassName,
    children,
}) {
    const classes = [view];
    if(newClassName) classes.push(newClassName);

    return (
        <button type={type} className={classes.join(' ')} onClick={onClick}>
            { children }
        </button>
    )
}

export default Button;