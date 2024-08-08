import css from './UITextArea.module.css'


export default function UITextArea( {
    fontSize = 14,
    handleChange, 
    value, 
    placeholder = "", 
    color = "theme2",
    error,
    rows = 10,
    maxLength,
} ) {
    return <div 
    className={`
        ${css.UITextArea}
        ${error && css.error}
        ${css[`color${color}`]}
    `}>
        <textarea 
            rows={rows}
            value={value || ""}
            placeholder={placeholder}
            onChange={ ( v ) => {
                let vv = v.target.value
                if( vv && maxLength ) vv = vv.slice( 0, maxLength ) 
                handleChange( vv )
            } }
            className={`fontSize${fontSize}`}  
            spellCheck={false} />
    </div>
}