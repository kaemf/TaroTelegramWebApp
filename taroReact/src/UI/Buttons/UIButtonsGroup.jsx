import css from './UIButtonsGroup.module.css'


export default function UIButtonsGroup( { children, borderRadius } ) {


    if( !children ) return

    const length = children.length

    return <div className={`${css.UIButtonsGroup} flex flexCenter `}>
        { Array.isArray(children) && children.map( ( el, i ) => {

            const getComponent = ( right, left ) => {
                return <div key={i} className={`${ right && css.right } ${ left && css.left }`}>
                    {el}
                </div>
            }

            if( ( i + 1 ) === length  ) return getComponent( false, true )
            if( !i ) return getComponent( true )
            return getComponent( true, true  )

        })}
    </div>
}