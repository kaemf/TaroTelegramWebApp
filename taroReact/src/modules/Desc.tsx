// @ts-nocheck
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { sleep, cfg } from './../cfg';


const DescItem: React.FC<{ data: any, handleEnd: (data: any, key: number) => void }> = ({ data, handleEnd, primary = false, speed }) => {
    const isEnd = useRef(false);

    const handleEnding = useCallback(() => {
        if ( isEnd.current ) return;
        isEnd.current = true
        if (handleEnd) handleEnd(data, data.key);
    }, [data, handleEnd]);


    useEffect(() => {
        if (!isEnd.current) window.addEventListener('click', handleEnding);

        return () => {
            window.removeEventListener('click', handleEnding);
        };
    }, [isEnd, handleEnding]);


    useEffect( () => {
        if( primary ) handleEnding()
    }, [])

    return (
        <pre className={`fontSize14 ${data.classes}`}>
            {(isEnd.current) ? data.text : (
                <TypeAnimation
                    className={`fontSize14 ${data.classes}`}
                    style={{ fontSize: '1em' }}
                    sequence={[
                        300,
                        data.text,
                        handleEnding,
                        300,
                    ]}
                    speed={speed || cfg.durationPrint}
                />
            )}
        </pre>
    );
}

// @ts-ignore
interface DescProps {
    active: boolean;
    handleEnd: () => void;
}

const Desc: FC<DescProps> = ({ data, active, handleEnd, primary = false, speed }) => {
    
    const descRef = useRef<HTMLDivElement>(null);
    const [endItems, setEndItems] = useState(0);

    const handleActive = useCallback(async (active: boolean) => {
        if (!descRef.current) return;
        await sleep(1);

        if (active) {
            descRef.current.classList.add("active");
        } else {
            descRef.current.classList.remove("active");
        }
    }, []);

    useEffect(() => {
        handleActive(active);
    }, [handleActive, active]);

    const handleEnding = useCallback((el, i: number) => {
        if (endItems > i) return;
        setEndItems(i + 1);
        if( (i+1) === data.length ) handleEnd()
    }, [endItems]);

    return (
        <div ref={descRef} className={`taCenter OuterDesc marginBottom20`}>
            {data.map((el, key) => {
                if (endItems < key) return null;
                return <DescItem speed={speed} primary={primary} handleEnd={handleEnding} key={key} data={{ ...el, key }} />;
            })}
        </div>
    );
};

export default Desc;
