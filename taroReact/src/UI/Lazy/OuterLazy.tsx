import React from "react";
import css from "./OuterLazy.module.css";

interface FaceOuterLazy {
    className?: string;
    children: React.ReactNode;
    sec?: number,
    delay?: number,
}

const OuterLazy: React.FC<FaceOuterLazy> = ({ children, className = "", sec = 1.3, delay = 0.0  } : FaceOuterLazy) => {
    return (
        <div className={`${css.OuterLazy} ${className}`}>
            {children}
            <div className={`${css.bg}`} style={{
                animationDuration: `${sec}s`,
                animationDelay: `${delay}s`
            }}></div>
        </div>
    );
}

export default OuterLazy;
