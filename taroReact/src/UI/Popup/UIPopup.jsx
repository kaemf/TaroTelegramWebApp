import { useEffect, useRef, useState } from "react";
import css from './UIPopup.module.css';

export default function UIPopup({ children, right, top, left, bottom, status, setStatus, style }) {

    const el = useRef(null);
    const [currentStatus, setCurrentStatus] = useState(status);

    const handleClick = (e) => {
        if (el.current && !el.current.contains(e.target) && currentStatus) {
            console.log(currentStatus);
            setStatus(false);
            setCurrentStatus(false);
        }
    }

    useEffect(() => {
        setCurrentStatus(status);
    }, [status]);

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [currentStatus]);

    const xClass = left ? css.left : css.right ;
    const yClass = top ? css.top : css.bottom ;

    return (
        <div ref={el}  style={style} className={`${css.UIPopup} ${xClass} ${yClass} ${currentStatus ? css.enable : css.disable}`}>
            {children}
        </div>
    );
}
