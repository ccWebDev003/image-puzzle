function GameStatusView(props) {
    if (props.gameComplete) {
        return <>
            <div>GAME COMPLETE!</div>
            <div>You used {props.turnNo - 1} turns</div>
            <div><button className='game-button' onClick={props.onInitGame}>Play again?</button></div>
        </>;
    } else {
        return <>
            <div>
                Turn: {props.turnNo}
            </div>
        </>;
    }
}

export default GameStatusView;
