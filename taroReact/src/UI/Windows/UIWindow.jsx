import { useEffect, useState } from "react"
import css from "./UIWindow.module.css"
import { useDispatch } from "react-redux"
import UIIcon from "../UIIcon"
import UIButton from "../Buttons/UIButton"
import IconsManager from "../../assets/icons/IconsManager"

export default function UIWindow( { children, title = "" } ) {

    const [ active , setActive ] = useState( false )
    const dispatch = useDispatch( state => state.reducerWindow )

    useEffect( () => {
        setActive( true )
    }, [ ] )

    const handleClose = () => dispatch( { type: "CLOSE_WINDOW" } )


    return <div className={`${css.UIWindow} ${active && css.active}`}>
        <div className={`${css.container} card cardBorderRadius cardShadow`}>
            <div className={`${css.header} flex flexCenter`}>
                <div className={`${css.title} fontSize16 ` }>
                    {title}
                </div>
                <UIIcon size='50'  className={`${css.close}`}>
                    <UIButton  paddingLeft={`var(--15)`} paddingRight={`var(--15)`}  color='theme' handleClick={handleClose} >
                        <IconsManager color={'theme-text-color-default'} name={"close"} />
                    </UIButton>
                </UIIcon>

            </div>
            {children}
        </div>
        <div onClick={handleClose} className={`${css.bg}`}></div>
    </div>
}