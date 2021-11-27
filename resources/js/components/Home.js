import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import Admin from './Admin';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            apiURL: 'http://localhost:8000/api',
            tenants: [],
            error: null,
            formUser: { id: -1, name: '', email: '', password: '' }
        }
        this.loadTenants = this.loadTenants.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.resetUserForm = this.resetUserForm.bind(this);
        this.loadUserForm = this.loadUserForm.bind(this);
    }

    async componentDidMount() {
        this.loadTenants();
    }
    async loadTenants() {
        try {
            let res = await fetch(`${this.state.apiURL}/tenants`);
            let data = await res.json();
            this.setState({
                tenants: data
            })
        } catch (error) {
            this.setState({
                error: error
            })
        }
    }

    handleChange(e) {
        this.setState({
            formUser: {
                ...this.state.formUser,
                [e.target.name]: e.target.value
            }
        });
    }
    async handleSubmit(e) {
        e.preventDefault();
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.formUser)
            }
            if (this.state.formUser.id < 0) {
                await fetch(`${this.state.apiURL}/tenants`, config);
            } else {
                config.method = 'PUT';
                await fetch(`${this.state.apiURL}/tenants/${this.state.formUser.id}`, config);
            }
            let res = await fetch(`${this.state.apiURL}/tenants`);
            let data = await res.json();
            this.setState({
                tenants: data
            })
            this.resetUserForm();
        } catch (error) {
            this.setState({
                error: error
            })
        }
    }
    async deleteUser(id) {
        try {
            let config = {
                method: 'DELETE',
            }
            await fetch(`${this.state.apiURL}/tenants/${id}`, config);
            let res = await fetch(`${this.state.apiURL}/tenants`);
            let data = await res.json();
            this.setState({
                tenants: data
            })
        } catch (error) {
            this.setState({
                error: error
            })
        }
    }
    resetUserForm() {
        this.setState({ formUser: { id: -1, name: '', email: '', password: '' } });
    }
    loadUserForm(user) {
        this.setState({ formUser: { id: user.id, name: user.name, email: user.email, password: '' } });
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h1>Bienvenido {logged.name}</h1>
                        <hr />
                        {logged.administrator == 1 &&
                            <Admin
                                tenants={this.state.tenants}
                                formUser={this.state.formUser}
                                onChange={this.handleChange}
                                onSubmit={this.handleSubmit}
                                deleteUser={this.deleteUser}
                                resetUserForm={this.resetUserForm}
                                loadUserForm={this.loadUserForm}
                            />
                        }

                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}
