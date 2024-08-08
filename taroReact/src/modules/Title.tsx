// @ts-nocheck
import React, { useEffect, useRef, FC, useCallback } from 'react'

interface FaceTitle {
    desc?: string,
    title: string,
    active: boolean
}

const Title: FC<FaceTitle> = ({ title, desc = "Расклад", active }: FaceTitle) => {
    const titleRef = useRef<HTMLDivElement>(null)


    const handleActive = useCallback( (active: boolean) => {
        if (!titleRef.current) return

        if (active) {
            titleRef.current.classList.add("active")
        } else {
            titleRef.current.classList.remove("active")
        }
    }, [] )

    useEffect(() => {
        handleActive(active)
    }, [handleActive, active])

    return (
        <div ref={titleRef} className="OuterTitle">
            <div className="fontSize14 colorText2 TitleName">
                {desc}
            </div>
            <div className="fontSize24 fontBold TitleValue">
                {title}
            </div>
        </div>
    )
}

export default Title
