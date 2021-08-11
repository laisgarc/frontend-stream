import axios from 'axios'

import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { Col } from 'react-flexbox-grid';

import styles from "../style/Home.module.css"


export default function TeamInfoSetter (props) {

    var classColor =' '

    if(props.side === "Azul"){
        classColor = styles.Azul
    }else{
        classColor = styles.Vermelho
    }

    const dispatch = useDispatch();

    return (
        <Col className={`w-1/3 m-8 ${classColor} border-2 rounded-xl`}>
            <Form className="text-white text-center p-8 border-3" onSubmit={props.handleSubmit}>
                <h1 className={classColor} style={{fontWeight: "800"}}>Time {props.side}</h1>
                <Form.Group>

                    <Form.Label style={{fontWeight: "600"}}> Nome do time {props.side} / Abreviação</Form.Label>
                    <Form.Row inline="true" className="mb-2">
                        <Form.Control
                            inline="true"
                            className="col-xs-8"
                            value={props.name}
                            onChange={e => dispatch(props.dispatch_name(e.target.value))}
                        ></Form.Control>

                        <Form.Control
                            inline="true"
                            className="col-xs-3 ml-4"
                            value={props.shortName}
                            onChange={e => dispatch(props.dispatch_shortName(e.target.value))}
                        ></Form.Control>
                    </Form.Row>

                    <Form.Label  style={{fontWeight: "600"}}>Logo do time {props.side}</Form.Label>

                    <Form.Row inline="true">
                        <Form.File
                            inline="true"
                            className="w-100 mb-3"
                            accept="image/*"
                            onChange={event => {
                                event.preventDefault();

                                const data = new FormData()
                                data.append('file', event.target.files[0])

                                const file = event.target.files[0];
                                dispatch(props.dispatch_image(`TeamImages/${file.name}`))

                                fetch('http://localhost:30061/uploadImage', {
                                    method: 'post',
                                    body: data
                                })
                            }}
                        ></Form.File>
                        <Form.Label className="p-2 mr-4">Ou selecione</Form.Label>

                        <Form.Control inline="true" as="select"
                            onChange={event => {
                                console.log(event)
                                dispatch(props.dispatch_image(`${event.target.value}`))
                            }}
                            value={props.image}
                            className=" col-xs-4">
                            {props.images}
                        </Form.Control>
                    </Form.Row>

                    <img className="m-auto"
                        style={{
                            maxWidth: "100%",
                            height: "12rem",
                            maxHeight: "12rem"
                        }}
                        alt="blueteam"
                        src={props.image ? props.image : ""} />

                    <Form.Row inline="true" className="pt-4 items-center mb-2">
                        <Form.Label  style={{fontWeight: "600"}} className="p-2 mr-4 ">Pontos do time {props.side}</Form.Label>
                        <Form.Control
                            className="col-xs-3 "
                            value={props.score}
                            onChange={e => dispatch(props.dispatch_score(e.target.value))}
                        ></Form.Control>
                    </Form.Row>
                    <Form.Row>
                        <Form.Label  style={{fontWeight: "600"}} className="mx-2">Progresso na série</Form.Label>
                        <Button
                            variant="outline-primary"
                            onClick={() => dispatch(props.dispatch_series(props.series - 1))}>
                            -</Button>
                        <Form.Control
                            className="mx-2 col-xs-1 "
                            value={props.series}
                            onChange={event => dispatch(props.dispatch_series(event.target.value))}></Form.Control>
                        <Button
                            variant="outline-primary"
                            onClick={() => dispatch(props.dispatch_series(props.series + 1))}>
                            +</Button>
                    </Form.Row>

                </Form.Group>
                <div className="inline-flex items-center border-gray-600 border-2 rounded-xl p-2">
                    <Button
                        className="m-auto"
                        variant="outline-success"
                        onClick={event => {
                            event.preventDefault();

                            axios.post('http://localhost:30061/saveTeam', {
                                teamName: props.name,
                                info: {
                                    name: props.name,
                                    shortName: props.shortName,
                                    image: props.image,
                                    score: props.score,
                                    series: 0
                                }
                            })
                        }}>
                        Salvar
                    </Button>

                    <p  style={{fontWeight: "600"}} className="m-auto text-white">Ou carregue</p>

                    <Form.Control inline="true" as="select"
                        onChange={event => {
                            axios.get(`Teams/${event.target.value}`, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json'
                                }
                            })
                                .then(response => {
                                    console.log(response)
                                    //If the input value was `` it will return an array instead, so check if the length is something and return
                                    if(response.data.length >= 0) return;
                                    dispatch(props.dispatch_name(response.data.name))
                                    dispatch(props.dispatch_shortName(response.data.shortName))
                                    dispatch(props.dispatch_image(response.data.image))
                                    dispatch(props.dispatch_score(response.data.score))
                                    dispatch(props.dispatch_series(response.data.series))
                                })
                        }}
                        className="col-xs-4 m-auto">
                        {props.teams}
                    </Form.Control>
                </div>
            </Form>
        </Col>
    )
}