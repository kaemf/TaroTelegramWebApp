import React from "react"




interface FaceLazy {
    className?: string | undefined,
    width?: string,
    height?: string,
}

const Lazy: React.FC = ({
    className = "",
    width = "100%", 
    height = "100%"
} : FaceLazy) => {

    const style: object = {
        width,
        height
    }

    const props = {
        className, style
    }
 
    return <div {...props} >
        
    </div>

}


export default Lazy