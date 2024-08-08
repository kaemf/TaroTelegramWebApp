

export default function UIIcon ( { children, size = "20", className, handleClick = () => {} } ) {

    let sizeValue
    if ( size.toString().includes("%") ) {
        sizeValue = size 
    }
    else {
        sizeValue = `var(--${size})`
    }

    const style = {
        width: sizeValue,
        height: sizeValue,
        minWidth: sizeValue,
        minHeight: sizeValue,
    }   


    return <div onClick={ () => handleClick() } className={className} style={ style }>
        {children}
    </div>
}