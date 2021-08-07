import React from 'react';
import { connect } from 'react-redux'
import TileView from './TileView'
import { selectTile } from '../reducers/actions';
import PropTypes from 'prop-types';
import {
    useWindowSize
} from '@react-hook/window-size/throttled'

const Puzzle = (props) => {
    const [winWidth, winHeight] = useWindowSize();
    const width = Math.max(Math.min(winWidth, winHeight - 258), 200);
    const tileWidth = width / props.size;
    const tileWrapperStyle = {
        width: `${props.size * tileWidth}px`
    }
    const tileContainerStyle = {
        gridTemplateColumns: `repeat(${props.size},${tileWidth}px)`
    }

    return (
        <div>
            <div className='tile-wrapper' style={tileWrapperStyle}>
                <div className='tile-container' style={tileContainerStyle}>
                    {
                        props.tiles.map((t, idx) =>
                            <TileView key={idx}
                                id={t.id}
                                correctPos={t.id === idx}
                                imageNumber={props.imageNumber}
                                onClick={props.onTileClicked}
                                tileWidth={tileWidth}
                                size={props.size}
                                selected={props.selectedId === t.id}
                                width={width}
                            />)
                    }
                </div>
            </div>
        </div>
    );
}

Puzzle.propTypes = {
    onTileClicked: PropTypes.func,
    size: PropTypes.number,
    tiles: PropTypes.array,
    imageNumber: PropTypes.number,
    selectedId: PropTypes.number
};

const mapStateToProps = state => {
    return {
        size: state.size,
        tiles: state.tiles,
        imageNumber: state.imageNumber,
        selectedId: state.selectedId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTileClicked: id => {
            dispatch(selectTile(id));
        }
    }
}

const PuzzleView = connect(
    mapStateToProps,
    mapDispatchToProps
)(Puzzle)

export default PuzzleView;
