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

    let disabled = false;
    if(newClassName && newClassName.includes('disabled')) disabled = true;

    return (
        <button type={type} disabled={disabled} className={classes.join(' ')} onClick={onClick}>
            { children }
        </button>
    )
}

export default Button;