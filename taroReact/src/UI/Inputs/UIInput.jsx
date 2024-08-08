import css from './UIInput.module.css'

export default function UIInput ( { 
    handleChange, 
    leftItem,
    value,
    password = false ,
    fontSize = 14, 
    placeholder = "",  
    color = "theme2",
    error,
    className
} ) {


    return <div className={`${className} ${css.UIInput} ${css[`color${color}`]} ${error && css.error}`}>
        <div className={`${css.outerInput} flex flexCenter marginRight20`}>
            {leftItem}
            <input
            type={password && "password"}
            placeholder={placeholder} 
            className={`
            fontSize${fontSize}`} 
            value={value}
            onChange={( e ) => handleChange( e.target.value ) }
            />

        </div>
        { error && error.length > 1 && <div className={`${css.errorMessage} fontSize14`}>
            {error}
        </div>}
    </div>
}