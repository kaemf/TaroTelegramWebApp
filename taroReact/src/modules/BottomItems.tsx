// @ts-nocheck

import React from 'react';



const BottomItems: React.FC = ( { children, active } ) => {

    return <div className={`bottomItems ${active && "active"}`} >
        {children}
    </div>
}


export default BottomItems