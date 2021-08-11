import SpectatorOverlay from "../Images/Overlay/Overlay2.png"
import ScoreOverlay from "../Images/Overlay/Overlay_Score2.png"

import ScoreDisplayer from '../Components/ScoreDisplayer'
//import { useSelector, useDispatch } from 'react-redux';

//import { blueImage, blueName, blueScore, redImage, redName, redScore, tournamentName, gameState } from '../Actions'

import GameState from './GameState.json'

export default function LeagueOverlay () {

    return (
        <div style={{
            fontSize: "2rem",
            textAlign: "center",
            color: "white"
        }}>

            {/*Blue Team Image*/}
            <div className="" style={{
                position: "absolute",
                textAlign: "center",
                //border: "1px solid red",
                top: "45px",
                left: "380px"
            }}>
                <img 
                alt=""
                src={GameState.blueImage}
                    style={{
                        position: "relative",
                        transform: "translate(-50%, -50%)",
                        //border: "1px solid red",
                        maxHeight: "90px",
                        maxWidth: "90px",
                        color: "white"
                    }}
                />
            </div>

            {/*Blue Team Name*/}
            <div style={{
                position: "absolute",
                textAlign: "center",
                //border: "1px solid red",
                top: "4px",
                left: "512px",

            }}>
                <h1 style={{
                    position: "relative",
                    transform: "translate(-50%, 0)",
                    //border: "1px solid red",
                    color: "white"
                }}>
                    {GameState.blueShortName}</h1>
            </div>

            {/*Blue Team Score*/}
            <div style={{
                position: "absolute",
                textAlign: "center",
                //border: "1px solid red",
                top: "55px",
                left: "512px",

            }}>
                <h3 style={{
                    position: "relative",
                    transform: "translate(-50%, 0)",
                    //border: "1px solid red",
                    color: "white"
                }}>
                    {GameState.showScore ?
                        <ScoreDisplayer
                            className=""
                            displayType={GameState.showScore}
                            score={GameState.blueScore}
                            bestOf={GameState.bestOf}
                            seriesWins={GameState.blueSeries}
                            reverse={true}
                        /> : ""}</h3>
            </div>

            {/*Red Team Image*/}
            <div className="" style={{
                position: "absolute",
                textAlign: "center",
                //border: "1px solid red",
                top: "45px",
                right: "280px"
            }}>
                <img 
                alt=""
                src={GameState.redImage}
                    style={{
                        position: "relative",
                        transform: "translate(-50%, -50%)",
                        //border: "1px solid red",
                        maxHeight: "90px",
                        maxWidth: "90px",
                        color: "white"
                    }}
                />
            </div>

            {/*Red Team Name*/}
            <div style={{
                position: "absolute",
                textAlign: "center",
                //border: "1px solid red",
                top: "4px",
                right: "500px",

            }}>
                <h1 style={{
                    position: "relative",
                    //border: "1px solid red",
                    transform: "translate(50%, 0)"
                }}>
                    {GameState.redShortName}</h1>
            </div>

            {/*Red Team Score*/}
            <div style={{
                position: "absolute",
                textAlign: "center",
                //border: "1px solid red",
                top: "55px",
                right: "500px",

            }}>
                <h3
                    //className="borderer"
                    style={{
                        position: "relative",
                        //border: "1px solid red",
                        transform: "translate(50%, 0)"
                    }}>
                    {GameState.showScore ?
                        <ScoreDisplayer
                            className=""
                            displayType={GameState.showScore}
                            score={GameState.redScore}
                            bestOf={GameState.bestOf}
                            seriesWins={GameState.redSeries}
                            reverse={false}
                        /> : ""}</h3>
            </div>

            {/*Tournament Name*/}
            <div style={{
                position: "absolute",
                textAlign: "center",
                //border: "1px solid red",
                top: "810px",
                left: "966px",

            }}>
                <h1 style={{
                    position: "relative",
                    //border: "1px solid red",
                    transform: "translate(-50%, 0)"
                }}>
                    {GameState.tournamentName}</h1>
            </div>

            <img
            alt=""
            style={{
                position: "absolute",
                zIndex: "-1"
            }} src={SpectatorOverlay} />

            {GameState.showScore !== "" ?
                <img 
                alt=""
                style={{
                    zIndex: "-1",
                    position: "absolute"
                }} src={ScoreOverlay}
                />
                : <></>}
        </div>
    )
}