import React from "react";
import cx from "classnames";
import "../style/index.css"
import api from "./api";

import GameState from './GameState.json'

// import css from './style/index.less';
import Ban from "../Components/Ban";
import "../style/index_alt.css"
import Pick from "../Components/Pick";
import Timer from "../Components/Timer";

export default class Overlay extends React.Component {
	constructor(props) {
		super(props);
		this.config = {
			blueColor: "#0b849e",
			redColor: "#be1e37",
			timerColor: "#ffffff",
			blueTextColor: "#fff",
			redTextColor: "#fff",
			phaseTextColor: "#fff",
			blueTeamName: GameState.blueName,
			blueTeamSubtext: GameState.blueScore+"-"+GameState.redScore,
			redTeamName: GameState.redName,
			redTeamSubText: GameState.redScore+"-"+GameState.blueScore,
			pickingText:"Picking",
			enableTransparent:false,
			enableCustomNames:false
		}
	}

	state = {
		data: {}
	}

	fetchdata() {
		api
		.get("/data")
		.then((response) => {
			this.setState({data: response.data}, () => {
				console.log(this.state.data)
			})
		})
		.catch((err) => {
		  console.error("ops! ocorreu um erro" + err);
		});
	}

	componentDidMount() {
		setInterval(() => {
			this.fetchdata()
		}, 900);
	}

	

	render() {
		var bluePicks = [];
		var redPicks = [];

		if (this.state.data.bluePicks) {
			if (this.config.enableCustomNames) {
				bluePicks = this.state.data.bluePicks.map((pick, index) => (
					<Pick key={"pick-" + index} {...pick} summonerName={this.config.names[index]} pickingText={this.config.pickingText} />
				));
			}
			else {
				bluePicks = this.state.data.bluePicks.map((pick, index) => (
					<Pick key={"pick-" + index} {...pick} pickingText={this.config.pickingText}/>
				));
			}
		}

		if (this.state.data.redPicks) {
			if (this.config.enableCustomNames) {
				redPicks = this.state.data.redPicks.map((pick, index) => (
					<Pick key={"pick-" + index} {...pick} summonerName={this.config.names[index + 5]} pickingText={this.config.pickingText}/>
				));
			}
			else {
				redPicks = this.state.data.redPicks.map((pick, index) => (
					<Pick key={"pick-" + index} {...pick} pickingText={this.config.pickingText}/>
				));
			}
		}

		var blueBans = [];
		var redBans = [];

		if (this.state.data.blueBans) {
			blueBans = this.state.data.blueBans.map((ban, index) => (
				<Ban key={"ban-" + index} {...ban} />
			));
		}
		if (this.state.data.redBans) {
			redBans = this.state.data.redBans.map((ban, index) => (
				<Ban key={"ban-" + index} {...ban} />
			));
		}

		var style = {
			"--left-side-color": this.config.blueColor, "--right-side-color": this.config.redColor, "--timer-color": this.config.timerColor, "width": 1280, "height": 720,
			"--left-side-text-color": this.config.blueTextColor, "--right-side-text-color": this.config.redTextColor, "--phase-text-color": this.config.phaseTextColor
		};

		return (
			<div
				style={style} //{{ width: 1280, height: 720 }}
				className={"overlay "+cx("overlay", this.state.data.actingSide + "-acting", {"transparent": this.config.enableTransparent})}
			>
				<div className="champion-select-header">
					<div className="blue-team-info">
						<img src={GameState.blueImage} alt="blue img"/>
						<div>
							<h1>{this.config.blueTeamName}</h1>
							<h5>{this.config.blueTeamSubtext}</h5>
						</div>
					</div>
					<Timer
						side="blue"
						visible={
							this.state.data.actingSide === "blue"
						}
						time={this.state.data.time}
						actingSide={this.state.data.actingSide}
						timestamp={this.state.data.timestamp}
					/>
					<div className="header-keystone">
						<div className="left-bg-section"></div>
						<div className="right-bg-section"></div>
						<div className="header-keystone-inner">
							<div className="left-bg-section"></div>
							<div className="right-bg-section"></div>
							<div className={cx("phase", { "transparent": this.state.data.phase === "" })} >
								{this.state.data.actingSide !== 'none' &&
									this.state.data.phase
								}
								{this.state.data.actingSide === 'none' &&
									<div></div>
								}
							</div>
						</div>
					</div>

					<Timer
						side="red"
						visible={
							this.state.data.actingSide === "red" 
						}
						time={this.state.data.time}
						actingSide={this.state.data.actingSide}
						timestamp={this.state.data.timestamp}
					/>
					<div className="red-team-info">	
						<div>
							<h1>{this.config.redTeamName}</h1>
							<h5>{this.config.redTeamSubText}</h5>
						</div>
						<img src={GameState.redImage} alt="red img"/>
					</div>
				</div>

				<div className="party" id="blueParty">
					{bluePicks}
				</div>

				<div className="party" id="redParty">
					{redPicks}
				</div>

				<div className="champSelectFooter">
					<div className="bans" id="blueBans">
						{blueBans}
					</div>

					<div className="bans" id="redBans">
						{redBans}
					</div>
				</div>
			</div>
		);
	}
}
