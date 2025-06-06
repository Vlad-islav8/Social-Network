import styles from "./PageNavigate.module.css";
import prev from "../../../../images/prev.svg";
import search from "../../../../images/search.svg";
import next from "../../../../images/next.svg";
import React, {useRef, useState} from "react";

const PageNavigate = (props) => {
    let inputRef = useRef(null)
    const [pageNumber, setPageNumber] = useState(props.currenPages)
    let pagesCount = Math.ceil(props.totalUsersCount / props.usersPages)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const handleOnPageChanged = (value) => {
        if(value === 'prev') {
            props.onPageChanged(props.currenPages + 1)
        } else if(value === 'next') {
            props.onPageChanged(props.currenPages - 1)
        }
    }
    const handlePressKey = (eventKey) => {
        if(eventKey.key === 'Enter' || 'enter') {
            handleOnSearch()
        }
    }
    const handleSetValue = () => {
        setPageNumber(inputRef.current.value)
    }
    const handleOnSearch = () => {
        props.onPageChanged(props.currenPages)
        props.setPageNumberActive(inputRef.current.value, pagesCount)
        props.activePage(inputRef.current.value)
    }
    return (
        <div className={styles.pageNavigate}>
            <button className={styles.navBtn} onClick={() => {handleOnPageChanged('next')}}>
                <img src={prev} alt="" />
            </button>
            <input ref={inputRef} type="text" value={pageNumber} onChange={handleSetValue} onKeyDown={handlePressKey}/>
            <button className={styles.searh} onClick={handleOnSearch}>
                <img src={search} alt="" />
            </button>
            <button className={styles.navBtn} onClick={() => {handleOnPageChanged('prev')}}>
                <img src={next} alt="" />
            </button>
        </div>
    )
}

export default PageNavigate