// @ts-nocheck

import { useEffect, useRef, useState } from "react"
import css from "./Taro.module.css"
import UIButton from "../UI/Buttons/UIButton"
import TypingText from './../modules/TypingText';
import PageAbout from "./Pages/PageAbout";
import { sleep } from "../cfg";
import PageCardsWiki from "./Pages/PageCardsWiki";
import PageCards from "./Pages/PageCards";


const durationPrint = 100

const Taro: React.FC = ( { dataP, widthPx, heightPx }  ) => {

    const [ data,setData ] = useState( dataP )

    const [ page , setPage ] = useState()
    const [ pageActive , setPageActive ] = useState()

    const [ vCLoop, setVCloop ] = useState( true )
    const [ vCLoopC, setVCloopC ] = useState("")

    const refVideo1 = useRef()
    const refVideo2 = useRef()
    const refVideo3 = useRef()

    const [ vO, setVO ] = useState(false)
    const [ vOC, setVOC ] = useState("")
    const [ vOLoop, setVOLoop ] = useState(false)
    const [ vOLoopC, setVOLoopC ] = useState("")

    const [ cardHistory, setCardHistory] = useState([])
    const [ focus, setFocus ] = useState()

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

    useEffect( () => {
        setTimeout( () => {
            openPage("aboutItem")
        }, 1500 )
        setTimeout( () => {
            setVCloopC(`active`)
        }, 10 )
    }, [] )


    const handleClickCard = ( el, i ) => {
        setFocus( el ? {...el, key: i } : false )

        if( !el || cardHistory.some( item => el && item.name === el.name ) ) return
        
        setCardHistory([...cardHistory, el])
    }
    


    const openPage = async ( name ) => {

        const defHandle = () => {
            setPageActive( false )

            setTimeout( () => {
                setPage( name )
            }, 200 )
            setTimeout( () => {
                setPageActive( name )
            }, 310 )
        }

        const handles = {
            "aboutItem": () => {
                defHandle()
                setTimeout( () => {
                    setVCloopC(`active text`)
                }, 310 )
            },
            "aboutCards": defHandle,
            "cards": () => {
                setPageActive( false )
                setVO(true)
                setTimeout( () => {
                    setVOC("active")
                }, 100 )
                setTimeout( () => {
                    setVCloopC(`active transit`)
                }, 200 )
                setTimeout( () => {
                    setVCloop(false)
                }, 1000 )
                

                setTimeout( () => {
                    setVOLoop(true)
                    setVOLoopC(`active`)
                    setVO(false)
                }, data.durationOpening - 1000 )
                setTimeout( () => {
                    setPage( name )
                }, data.durationOpening )
                setTimeout( () => {
                    setPageActive( name )
                }, data.durationOpening + 10 )
            }
        }

        handles[name]()

    }

    useEffect( () => {
        if( refVideo1.current ) refVideo1.current.play()
        if( refVideo2.current ) refVideo2.current.play()
        if( refVideo3.current ) refVideo3.current.play()
    }, [ refVideo1, refVideo2, refVideo3 ] )

    return <div className={`Taro`}>
        { page === "aboutItem" && <PageAbout data={data} active={pageActive === "aboutItem"} openPage={openPage} />}
        { page === "aboutCards" && <PageCardsWiki data={data} active={pageActive === "aboutCards"} openPage={openPage} />}
        { page === "cards" && <PageCards setData={setData} data={data} rasklad={rasklad} active={pageActive === "cards"} openPage={openPage} handleClickCard={handleClickCard} cardHistory={cardHistory} widthPx={widthPx} heightPx={heightPx} focus={focus} />}

        <div className={`Shadow ${pageActive && "active"}`}></div>
        { vCLoop && <div className={`OuterVideo ${vCLoopC}`}>
            <div className={`bg`}></div>
            <video ref={refVideo1} autoPlay className={`custom-video-controls`} style={{width: widthPx}} muted loop controls={false} playsInline  webkit-playsInline >
                <source src={data.closedLoop} />
            </video>
        </div>}
        { vO && <div className={`OuterVideo ${vOC}  `}>
            <div className={`bg`}></div>
            <video ref={refVideo2} autoPlay className={`custom-video-controls`} style={{width: widthPx}} muted controls={false} playsInline  webkit-playsInline > 
                <source src={data.opening[rasklad]} />
            </video>
        </div>}
        {vOLoop && <div className={`OuterVideo ${vOLoopC}`}>
            <div className={`bg`}></div>
            <video ref={refVideo3} autoPlay className={`openingLoop custom-video-controls`} style={{width: widthPx, transform: focus && focus.focus && focus.focus.transform }} muted loop controls={false} playsInline  webkit-playsInline > 
                <source src={data.openingLoop[rasklad]} />
            </video>
        </div>}
    </div>
}

export default Taro