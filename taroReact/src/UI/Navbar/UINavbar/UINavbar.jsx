import { useSelector } from "react-redux"
import css from './UINavbar.module.css'



export default function UINavbar({ children }) {

    const reducerNavBarHidden = useSelector( state => state.reducerNavBarHidden )

    return <div className={`${css.UINavbar} ${!reducerNavBarHidden && css.hidden}`}>
        {children}
    </div>
}