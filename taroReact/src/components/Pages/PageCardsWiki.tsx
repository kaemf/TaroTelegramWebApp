// @ts-nocheck
import React, { useState, useEffect } from "react"
import Title from "../../modules/Title"
import UIButton from "../../UI/Buttons/UIButton"
import Desc from "../../modules/Desc"
import BottomItems from "../../modules/BottomItems"





const PageCardsWiki: React.FC = ( { data, active, openPage }) => {

    const [ descEnd, setDescEnd ] = useState( false )
    const [rasklad, setRasklad] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchRasklad = async () => {
          try {
            const queryParams = getQueryParams();
            const data = await getData(queryParams.userId);
            setRasklad(parseInt(data.value.rasklad));
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchRasklad();
      }, []);

    const bottomComponents = <div className={`OuterUIButton`}>
        <UIButton handleClick={() => openPage("cards")}>
            <div className={`fontSize14`}>
                Далее
            </div>
        </UIButton>
    </div>
    
    const titleProps = { title: "Что скажут карты?", desc: data.title, active }
    const descProps = { data: data.whatIsCards, active, handleEnd: () => setDescEnd( true )  }
    const bottomItemsProps = { children: bottomComponents, data, active: active && descEnd }

    return <div className="OuterPage">
        <Title { ...titleProps as props } />
        <Desc {...descProps as props } />
        <BottomItems {...bottomItemsProps as props } />
    </div>
}


export default PageCardsWiki