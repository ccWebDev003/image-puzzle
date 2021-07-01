import React from 'react';
import './Game.css';

function TileView(props) {
    let bgPos = 'left ' + props.left + 'px top ' + props.top + 'px';
    const imPath = `${window.location.href}/images/img${props.imageNumber}.jpg`;
    let style = {
        backgroundPosition: bgPos,
        backgroundImage: "url(" + imPath + ")"
    }
    let className = props.selected ? 'tile selected' : 'tile';
    return (
        <div className={className}
            style={style}
            onClick={() => props.onClick(props.id)}
        >
        </div>
    );
}

export default TileView;
