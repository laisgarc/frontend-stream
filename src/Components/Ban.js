import React from "react"
import "../style/ban.css"

import cx from "classnames"



export default class Ban extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props.data
		}
	  }

	render() {
		
		let ban;
		if (this.props.championId === 0)
			ban = <div className="ban" ></div>
		else if (this.props.championId > 0) {
			ban = <div className="ban" style={{ backgroundImage: `url(${require("../assets/splash-art/centered/" + this.props.championId + ".jpg").default})` }} data-id={this.props.championId}></div>
		}
		else {
			ban = <div className="ban" ></div>
		}

		return (
			<div className={cx("ban-wrapper", { "active": this.props.isActive, "completed": this.props.isCompleted })}>
				<div className="ban-background">
					<div className="ban-container">
						{ban}
					</div>
				</div>
				<div className="ban-icon"></div>
			</div>
		)
	}
}
