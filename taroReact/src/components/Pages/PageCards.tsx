// @ts-nocheck
import { useState, useEffect } from "react"
import BottomItems from "../../modules/BottomItems"
import Title from "../../modules/Title"
import UIButton from "../../UI/Buttons/UIButton"
import Desc from "../../modules/Desc"
import { sleep } from "../../cfg"
import UIIcon from "../../UI/UIIcon"
import AnimationLoad from "../../UI/Access/animations/AnimationLoad/AnimationLoad"
import PromptGPT from "../prompts"

const PageCards: React.FC = ({ data, rasklad, setData, active, openPage, widthPx, heightPx, focus, handleClickCard, cardHistory }) => {

    const [ tHistory, setTHistory ] = useState([])
    const [ tA, setTA ] = useState()
    const [ tAA, setTAA ] = useState()
    const [ tAProccess, setAProcess ] = useState(false)
    const [ tALoading, setTAloading ] = useState(false)

    const [ fullTClick, setFullTClick ] = useState(false)
    const [ fullT, setFullT ] = useState()
    const [ fullTA, setFullTA ] = useState()
    const [ fullTProgress, setFullTProgress ] = useState(false)
    const [ fullTALoading, setFullTAloading ] = useState()

    const handleGetFullT = async ( ) => {

        setFullTAloading( true )
        if( !data.fullTract ) {
            const response = await getGPTAnswer(data.prompt, true);
            // await sleep(3000)

            const newData = structuredClone( data )
            newData.fullTract = response
            setData( newData )
        }

        setTimeout( () => {
            setFullTAloading( false )
            setFullTProgress(true)
            setFullT(true)
            setTimeout( () => setFullTA(true), 10 )
        }, 10 )
    }

    const handleGetT = async ( el ) => {
        let card
        setTAloading( true )
        if( !tHistory.some( item => item.name === el.name ) ) {

            const response = await getGPTAnswer(PromptGPT(cardHistory.length, data.title, el.name), true);

            // await sleep(1000)

            const newData = structuredClone( data )
            newData.whatIsCards = newData.whatIsCards.map( ( elC, i ) => {
                if( elC.name === el.name ) {
                    elC.tract = response
                    card = elC
                }
                return elC
            } )
            setData( newData )
        }

        setTimeout( async () => {
            setTAloading( false )
            setTA(card || data.whatIsCards[ el.key ] )
            setAProcess(true)
            setTimeout( () => setTAA(true), 10 )
        }, 10 )
    }

    const bottomComponents = <div className={`taCenter`}>
        <div className={`fontSize16 fontBold`}>
            Кликайте на карты
        </div>
    </div>
    
    const bottomComponentsCard = <div className={`OuterUIButton`}>
        <UIButton handleClick={() => handleGetT(focus)}>
            <div className={`fontSize14`}>
                Получить трактовку карты
            </div>
        </UIButton>
    </div>

    const bottomComponentsEnd = <div className={`OuterUIButton`}>
        <UIButton handleClick={() => handleGetFullT()}>
            <div className={`fontSize14`}>
                Полная трактовка
            </div>
        </UIButton>
    </div>

    const bottomComponentsEndTract = <div className={`OuterUIButton`}>
        <UIButton handleClick={() => handleBack()} >
            <div className={`fontSize14`}>
                Вернуться
            </div>
        </UIButton>
    </div>

    const handleEndDesc = () => {
        if( tAProccess ) {
            setAProcess( false )
            if( tHistory.some( item => item.name === tA.name ) ) return
            setTHistory([...tHistory, tA])
        }
        if( fullTProgress ) {
            setFullTClick( true )
            setFullTProgress( false )
        }
    }

    const handleBack = () => {
        if( tAA ) {
            setTimeout( () => {
                setTAA(false)
                setTimeout( () => {
                    setTA()
                }, 10 )
            }, 10 )
        }
        if( fullTA ) {
            setTimeout( () => {
                setFullTA(false)
                setTimeout( () => {
                    setFullT()
                }, 10 )
            }, 10 )
        }
    }
    
    const titleProps = { title: data.title, active: active && !focus && !tA && !tALoading && !fullTA && !fullTALoading }
    const titleCard = { title: focus && focus.name, desc: "Карта", active: active && focus && !tA && !tALoading  &&  !fullTALoading && !fullT }

    const titleCardT = { title: focus && focus.name, desc: "Трактование", active: active && focus && tA }

    const titleCardFullT = { title: "Полное трактование", desc: data.title, active: active && !tA && !focus && !fullTALoading && fullTA }

    const bottomItemsProps = { children: bottomComponents, data, active: active && !focus &&!tA && !tALoading && !fullTALoading &&  !fullTA }
    const bottomItemsCard = { children: bottomComponentsCard, data, active: active && focus && !tA && !tALoading }

    const bottomItemsEndTract = { children: bottomComponentsEndTract, data, active: active && focus && tA && !tALoading && !fullTALoading && !tAProccess }


    const bottomItemsEnd = { children: bottomComponentsEnd, data, active: active && !focus && cardHistory.length >= data.whatIsCards.length && !tA && !tALoading && !fullTALoading && !fullTA }

    const bottomItemsFullT = { children: bottomComponentsEndTract, data, active: active && !focus && cardHistory.length >= data.whatIsCards.length && !tA && !tALoading && !fullTALoading && fullTA }

    // @ts-nocheck
    return <div className="OuterPage">
        { ( tALoading || fullTALoading )  && <div className="outerLoading">
            <UIIcon size="120">
                <AnimationLoad color="theme-text-color-default" />
            </UIIcon>
        </div>}
        <Title { ...titleProps as props } />
        <Title { ...titleCard as props } />
        <Title { ...titleCardT as props } />
        <Title { ...titleCardFullT as props } />
        <BottomItems {...bottomItemsProps as props } />
        <BottomItems {...bottomItemsCard as props } />
        <BottomItems {...bottomItemsEnd as props } />
        <BottomItems {...bottomItemsEndTract as props } />
        <BottomItems {...bottomItemsFullT as props } />
        { ( tA || fullT ) && <div className={`bgNotClick`}></div>}
        { tA && <Desc primary={tHistory.some( item=>item.name==tA.name)} data={ [ { text: tA.tract }] } active={tAA} handleEnd={handleEndDesc} />}
        { fullT && <Desc speed={110} primary={fullTClick} data={ [ { text: data.fullTract }] } active={fullTA} handleEnd={handleEndDesc} />}
        <div className={`outerCards ${focus && focus.focus && `focuse`}`} style={{width: widthPx,  height: heightPx, transform: focus && focus.focus && focus.focus.transform }}>
            {data.whatIsCards.map( ( el, i ) => {
                console.log(i)
                let handleEl
                let seeLater
                let cardName = data.cardsName[rasklad][i].name;

                alert(cardName)

                if( !focus || !focus.focus || focus.focus.transform !== el.focus.transform) {
                    handleEl = cardName
                    if( cardHistory.some(item => item.name === cardName) ) {
                        seeLater = true;
                    }
                }
                if( tA ) {
                    seeLater = true;
                }

                return <div onClick={() => handleClickCard(handleEl, i )} key={i} className={`card ${seeLater && "seeLater"}`} style={{...el.position}}></div>
            } )}
        </div>
    </div>
}


export default PageCards