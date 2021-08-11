import GameState from './GameState.json'


export default function Matchup() {
    return (
        <div className="text-center text-white">
            <img className="team1Logo" src={GameState.blueImage} alt="blueimg"/>
            <div className="team1 text-7xl">{(GameState.blueName).toUpperCase()}</div>
            <div className="team1Score text-9xl">{(GameState.blueScore)}</div>

            <div className="centered text-9xl" style={{}}>VS</div>

            <div className="team2Score text-9xl">{(GameState.redScore)}</div>
            <img className="team2Logo" src={GameState.redImage}  alt="redimg"/>
            <div className=" team2 text-7xl text-center">{(GameState.redName).toUpperCase()}</div>
        </div>
    )
}