import css from './UICheckBox.module.css'

export default function UICheckBox( { status = false, size = 20 } ) {

    const valueSize = `var(--${size})`
    const style = {
        width: valueSize,
        minWidth: valueSize,
        maxWidth: valueSize,
        height: valueSize,
        minHeight: valueSize,
        maxHeight: valueSize
    }

    return <div className={`${css.UICheckBox}`} style={ style } >
        { status && <div className={`${css.value}`}></div>}
    </div>
}