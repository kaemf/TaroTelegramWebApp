// @ts-nocheck
import { useState } from "react"
import cfg from "../../cfg"
import BottomItems from "../../modules/BottomItems"
import Desc from "../../modules/Desc"
import Title from "../../modules/Title"
import TypingText from "../../modules/TypingText"
import UIButton from "../../UI/Buttons/UIButton"





const PageAbout: React.FC = ({ data, active, openPage }) => {

    const [ descEnd, setDescEnd ] = useState( false )

    const bottomComponents = <div className={`OuterUIButton`}>
        <UIButton handleClick={() => openPage("aboutCards")}>
            <div className={`fontSize14`}>
                Далее
            </div>
        </UIButton>
    </div>
    
    const titleProps = { title: data.title, active }
    const descProps = { data: data.whatIsIt, active, handleEnd: () => setDescEnd( true )  }
    const bottomItemsProps = { children: bottomComponents, data, active: active && descEnd }


    return <div className="OuterPage">
        <Title { ...titleProps as props } />
        <Desc {...descProps as props } />
        <BottomItems {...bottomItemsProps as props } />
    </div>
}


export default PageAbout