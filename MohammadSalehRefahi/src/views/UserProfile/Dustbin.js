import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
import Colors from "./Colors";
function getStyle(backgroundColor) {
    return {
        border: '1px solid rgba(0,0,0,0.2)',
        minHeight: '2rem',
        minWidth: '2rem',
        color: 'white',
        backgroundColor,
        padding: '2rem',
        paddingTop: '1rem',
        margin: '1rem',
        textAlign: 'center',
        float: 'left',
        fontSize: '1rem',
    }
}
const Dustbin = ({ greedy, children }) => {
    const [hasDropped, setHasDropped] = useState(false)
    const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false)
    const [{ isOver, isOverCurrent }, drop] = useDrop({
        accept: [Colors.YELLOW, Colors.BLUE],
        drop(item, monitor) {
            const didDrop = monitor.didDrop()
            if (didDrop && !greedy) {
                return
            }
            setHasDropped(true)
            setHasDroppedOnChild(didDrop)
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true }),
        }),
    })
    const text = greedy ? 'greedy' : 'not greedy'
    let backgroundColor = 'rgba(0, 0, 0, .5)'
    if (isOverCurrent || (isOver && greedy)) {
        backgroundColor = 'darkgreen'
    }
    return (
        <div ref={drop} style={getStyle(backgroundColor)}>
            {text}
            <br />
            {hasDropped && <span>dropped {hasDroppedOnChild && ' on child'}</span>}

            <div>{children}</div>
        </div>
    )
}
export default Dustbin