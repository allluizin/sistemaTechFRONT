import React from 'react';
import { Table, Button, Form, Modal } from "react-bootstrap";
import axios from 'axios';

const defaultState = {
    id: 0,
    tamanho: '',
    densidadeEnum: '',
    quantidadeMilheiro: '',
    pesoMilheiro: ''
}
class Estoque extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            tamanho: '',
            densidadeEnum: '',
            quantidadeMilheiro: '',
            pesoMilheiro: '',
            estoques: [],
            modalAberta: false
        };
    }

    async componentDidMount() {
        this.buscarEstoque();
    }

    async buscarEstoque() {
        try {
            const response = await axios.get('http://localhost:8080/estoque/info');
            this.setState({ estoques: response.data });
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    deletarEstoque = (id) => {
        fetch("http://localhost:8080/estoque/" + id, { method: 'DELETE' })
            .then(resposta => {
                if (resposta.ok) {
                    this.buscarEstoque();
                }
            })
    }

    carregarDados = (id) => {
        fetch("http://localhost:8080/estoque/" + id, { method: 'GET' })
            .then(resposta => resposta.json())
            .then(estoque => {
                this.setState({
                    id: estoque.id,
                    tamanho: estoque.tamanho,
                    densidadeEnum: estoque.densidadeEnum,
                    quantidadeMilheiro: estoque.quandidadeMilheiro,
                    pesoMilheiro: estoque.pesoMilheiro
                })
                this.abrirModal();
            })
    }

    cadastraEstoque = (estoque) => {
        fetch("http://localhost:8080/estoque",
            {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(estoque)
            })
            .then(resposta => {
                console.log(resposta);
                if (resposta.ok) {
                    this.buscarEstoque();
                } else {
                    console.log("nao foi possivel add estoque");
                }
            })
    }
    atualizaEstoque = (estoque) => {
        fetch("http://localhost:8080/estoque/" + estoque.id,
            {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(estoque)
            })
            .then(resposta => {
                console.log(resposta);
                if (resposta.ok) {
                    this.buscarEstoque();
                } else {
                    alert("nao foi possivel add estoque");
                }
            })
    }
    renderTabela() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tamanho</th>
                        <th>Densidade</th>
                        <th>Quantidade/M</th>
                        <th>Peso/M</th>
                        <th>Peso Total</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.estoques.map((estoque) => (
                        <tr key={estoque.id}>
                            <td>{estoque.id}</td>
                            <td>{estoque.tamanho}</td>
                            <td>{estoque.densidadeEnum}</td>
                            <td>{estoque.quantidadeMilheiro}</td>
                            <td>{estoque.pesoMilheiro}</td>
                            <td>{estoque.pesoTotal}</td>
                            <td><Button variant="secondary" onClick={() => this.carregarDados(estoque.id)}>Atualizar</Button>
                                <Button variant="danger" onClick={() => this.deletarEstoque(estoque.id)}>Excluir</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }
    atualizaTamanho = (e) => {
        this.setState(
            {
                tamanho: e.target.value
            }

        )
    }
    atualizaDensidade = (e) => {
        this.setState(
            {
                densidadeEnum: e.target.value
            }

        )
    }
    atualizaQuantidade = (e) => {
        this.setState(
            {
                quantidadeMilheiro: e.target.value
            }

        )
    }
    atualizaPeso = (e) => {
        this.setState(
            {
                pesoMilheiro: e.target.value
            }

        )
    }
    submit = (e) => {
        e.preventDefault() //impedir ela recarregar

        //console.log(this.state)
        if (!this.state.id) {
            const estoque = {
                tamanho: this.state.tamanho,
                densidadeEnum: this.state.densidadeEnum,
                quantidadeMilheiro: this.state.quantidadeMilheiro,
                pesoMilheiro: this.state.pesoMilheiro
            }
            console.log(this.state)
            this.cadastraEstoque(estoque);
            this.setState({ ...defaultState })

        } else {
            const estoque = {
                id: this.state.id,
                tamanho: this.state.tamanho,
                densidadeEnum: this.state.densidadeEnum,
                quantidadeMilheiro: this.state.quantidadeMilheiro,
                pesoMilheiro: this.state.pesoMilheiro
            }
            console.log(this.state)
            this.atualizaEstoque(estoque);
            //this.setState({...defaultState}) 
        }
        this.fecharModal();

    }

    reset = () => {
        this.setState(
            {
                id: 0,
                tamanho: "",
                densidadeEnum: "",
                quantidadeMilheiro: "",
                pesoMilheiro: ""
            }
            
        )
        this.abrirModal();
    }
    fecharModal = () => {
        this.setState({
            modalAberta: false
        })
    }
    abrirModal = () => {
        this.setState({
            modalAberta: true
        })
    }

    render() {
        return (
            <div>

                <Modal show={this.state.modalAberta} onHide={this.fecharModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Dados do produto:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.submit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Id</Form.Label>
                                <Form.Control type='text' value={this.state.id} readOnly={true} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Tamanho</Form.Label>
                                <Form.Control type='text' placeholder="Digite o tamanho:" value={this.state.tamanho} onChange={this.atualizaTamanho} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Densidade</Form.Label>
                                <Form.Control type='text' placeholder="Digite a densidade:" value={this.state.densidadeEnum} onChange={this.atualizaDensidade} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Quantidade</Form.Label>
                                <Form.Control type='text' placeholder="Digite a Quantidade em milheiros:" value={this.state.quantidadeMilheiro} onChange={this.atualizaQuantidade} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Peso/M</Form.Label>
                                <Form.Control type='text' placeholder="Digite o Peso/M:" value={this.state.pesoMilheiro} onChange={this.atualizaPeso} />
                            </Form.Group>

                            
                            
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.fecharModal}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={this.submit}>
                                Salvar
                            </Button>
                    </Modal.Footer>
                </Modal>
                <Button variant="warning" onClick={this.reset}>
                    Novo
                </Button>



                {this.renderTabela()}
            </div>
        )
    }
}

export default Estoque;