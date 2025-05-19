import styles from './CursorShadow.module.css'
import {useEffect, useState} from "react";

export const CursorShadow = (props) => {
    const X = props.mouseX + 2
    const Y = props.mouseY
    const [lastShow, setLastShow] = useState([])
    useEffect(() => {
        let show = {
            showX: X,
            showY: Y,
        }
        if (lastShow.length >= 20) {
            lastShow.shift()
        }
        lastShow.push(show)
    }, [X, Y]);
    return (
        <>
            {
                lastShow.map((el, index) => {
                    return (
                        <span className={styles.showItem} style={{
                            top: el.showY,
                            left: el.showX,
                            opacity: index / 10
                        }}>
                        </span>
                    )
                })
            }
        </>

    )
}