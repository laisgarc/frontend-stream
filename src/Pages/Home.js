import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import api from './api.js'

import Header from '../Components/Header'
import { blueImage, blueName, blueShortName, blueScore, blueSeries, redImage, redName, redShortName, redScore, redSeries, tournamentName, showScore, bestOf } from '../Actions'

import { Form, Button } from 'react-bootstrap';
import { Col, Grid, Row } from 'react-flexbox-grid';

import TeamInfoSetter from '../Components/TeamInfoSetter'

import styles from '../style/Home.module.css'

export default function Home() {
	const dispatch = useDispatch();

	const state_blueImage = useSelector(state => state.blueImage)
	const state_blueName = useSelector(state => state.blueName)
	const state_blueShortName = useSelector(state => state.blueShortName)
	const state_blueScore = useSelector(state => state.blueScore)
	const state_blueSeries = useSelector(state => state.blueSeries)

	const state_redImage = useSelector(state => state.redImage)
	const state_redName = useSelector(state => state.redName)
	const state_redShortName = useSelector(state => state.redShortName)
	const state_redScore = useSelector(state => state.redScore)
	const state_redSeries = useSelector(state => state.redSeries)

	const state_bestOf = useSelector(state => state.bestOf)
	const state_tournamentName = useSelector(state => state.tournamentName)
	const state_showScore = useSelector(state => state.showScore)
	const state = useSelector(state => state)


	const [imageOptions, set_imageOptions] = useState([])
	const [teamOptions, set_teamOptions] = useState([])

	const handleSubmit = (event) => {

		event.preventDefault();

		api.post('/saveConfig', state)
	}

	//Gets avaliable images
	useEffect(() => {
		let options = [];

		fetch('http://localhost:30061/images')
			.then(response => response.json())
			.then(data => {
				//Add empty image if ya know, empty
				options.push(<option value={``}></option>)
				data.forEach(element => {
					options.push(<option value={`TeamImages/${element}`}>{element}</option>)
				});
				set_imageOptions(options)
			})
	}, [state_blueImage, state_redImage])

	//Gets avaliable teams
	useEffect(() => {
		let options = [];


		fetch('http://localhost:30061/teams')
			.then(response => response.json())
			.then(data => {
				//Add empty image if ya know, empty
				options.push(<option value={``}></option>)
				data.forEach(element => {
					options.push(<option value={`${element}`}>{element}</option>)
				});
				set_teamOptions(options)
			})
	}, [])

	//Oh god this is jank but fine
	const swapTeams = (event) => {
		event.preventDefault();
		//console.log("Swapping teams")

		let temp_blueImage = state_blueImage;
		let temp_blueName = state_blueName;
		let temp_blueShortName = state_blueShortName;
		let temp_blueScore = state_blueScore;
		let temp_blueSeries = state_blueSeries;

		let temp_redImage = state_redImage;
		let temp_redName = state_redName;
		let temp_redShortName = state_redShortName;
		let temp_redScore = state_redScore;
		let temp_redSeries = state_redSeries;

		dispatch(blueImage(temp_redImage))
		dispatch(blueName(temp_redName))
		dispatch(blueShortName(temp_redShortName))
		dispatch(blueScore(temp_redScore))
		dispatch(blueSeries(temp_redSeries))
		dispatch(redImage(temp_blueImage))
		dispatch(redName(temp_blueName))
		dispatch(redShortName(temp_blueShortName))
		dispatch(redScore(temp_blueScore))
		dispatch(redSeries(temp_blueSeries))

		api.post('/saveConfig', state)
	}

	return (
		<div>

			<Header />
			<Grid fluid className={"content-center pb-16 " + styles.fonte + " " + styles.bodyHome}>
				<Row center="xs" className={"content-center"}>
					<Col className={" w-4/6 m-8 border-gray-600 border-2 rounded-xl "  + styles.Torneio}>
						<Form onSubmit={handleSubmit}>
							<Grid fluid className="pt-4">
								<Row center="xs">
									<Col className="w-5/12 p-2 border border-gray-200 rounded-xl mx-2">
										<Form.Label className="text-white">Mostrar pontos ou s??rie</Form.Label>
										<Form.Control
											className="m-auto col-xs-7"
											onChange={e => dispatch(showScore(e.target.value))}
											value={state_showScore}
											as="select">
											<option value="">Nenhum</option>
											<option value="score">Pontos</option>
											<option value="series">Progresso na s??rie</option>
										</Form.Control>
									</Col>
									<Col className="w-5/12 p-2 border border-gray-200 rounded-xl mx-2">
										<Form.Label className="text-white">Nome do torneio</Form.Label>
										<Form.Control
											type="text"
											maxLength={19}
											onChange={e => dispatch(tournamentName(e.target.value))}
											value={state_tournamentName}></Form.Control>
									</Col>
								</Row>
								<Row center="xs" className="my-4">
									<Col className="w-5/12 p-2 border border-gray-200 rounded-xl mx-2 items-center">
										<Form.Label className="text-white">Configura????o da s??rie</Form.Label>
										<Form.Control
											value={state_bestOf}
											className="col-xs-4 m-auto"
											as="select"
											onChange={e => dispatch(bestOf(e.target.value))}>
											<option value={"1"}>MD1</option>
											<option value={"2"}>MD2</option>
											<option value={"3"}>MD3</option>
											<option value={"5"}>MD5</option>
										</Form.Control>
									</Col>
								</Row>
							</Grid>
							<Button className="mb-2" variant="outline-success" type="submit">
								<h5 className="pt-2 px-2">Salvar</h5>
							</Button>
						</Form>
					</Col>
				</Row>
				<Row center="xs" className="content-center">
					<TeamInfoSetter
						side="Azul"
						images={imageOptions}
						handleSubmit={handleSubmit}
						name={state_blueName}
						shortName={state_blueShortName}
						image={state_blueImage}
						score={state_blueScore}
						series={state_blueSeries}
						dispatch_name={blueName}
						dispatch_shortName={blueShortName}
						dispatch_image={blueImage}
						dispatch_score={blueScore}
						dispatch_series={blueSeries}
						teams={teamOptions}
					/>

					<Col className="flex content-center">
						<Button className="m-auto" variant="outline-info" onClick={swapTeams}>
							Inverter times
							<br />
							{`<->`}
						</Button>
					</Col>

					<TeamInfoSetter
						side="Vermelho"
						images={imageOptions}
						handleSubmit={handleSubmit}
						name={state_redName}
						shortName={state_redShortName}
						image={state_redImage}
						score={state_redScore}
						series={state_redSeries}
						dispatch_name={redName}
						dispatch_shortName={redShortName}
						dispatch_image={redImage}
						dispatch_score={redScore}
						dispatch_series={redSeries}
						teams={teamOptions}
					/>

				</Row>
			</Grid>

		</div>

	)
}