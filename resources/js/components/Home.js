import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Admin from './Admin';
import Tenant from './Tenant';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: logged,
            apiURL: 'http://localhost:8000/api',
            imageURL: '',
            tenants: [],
            newProfileImage: "",
            error: null,
            formUser: { id: -1, name: '', email: '', password: '' }
        }
        this.loadTenants = this.loadTenants.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTenantSubmit = this.handleTenantSubmit.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.resetUserForm = this.resetUserForm.bind(this);
        this.loadUserForm = this.loadUserForm.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    async componentDidMount() {
        if (logged.administrator == 0) {
            this.setState({
                imageURL: `http://localhost:8000/storage/profile_images/${this.state.user.id}/${this.state.user.profile_image}`,
                formUser: {
                    id: this.state.user.id,
                    name: this.state.user.name,
                    email: this.state.user.email,
                    profile_image: this.state.user.profile_image,
                    password: ''
                }
            });
        }
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

    async handleTenantSubmit(e) {
        e.preventDefault();
        const fData = new FormData();
        if (this.state.newProfileImage != "") {
            fData.append('image', this.state.newProfileImage);
        }
        fData.append('user', JSON.stringify(this.state.formUser));
        Axios.post(`${this.state.apiURL}/tenants-profiles`, fData).then(res => {
            let data = res['data'];
            this.setState({
                user: data
            });
            this.resetUserForm();
        }).catch(e => {
            this.setState({
                error: e
            })
        });
        this.resetUserForm();
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
        if (logged.administrator == 0) {
            this.setState({
                newProfileImage: "",
                imageURL: `http://localhost:8000/storage/profile_images/${this.state.user.id}/${this.state.user.profile_image}`,
                formUser: {
                    id: this.state.user.id,
                    name: this.state.user.name,
                    email: this.state.user.email,
                    profile_image: this.state.user.profile_image,
                    password: ''
                }
            });
        } else {
            this.setState({ formUser: { id: -1, name: '', email: '', password: '' } });
        }
    }
    loadUserForm(user) {
        this.setState({ formUser: { id: user.id, name: user.name, email: user.email, password: '' } });
    }
    handleImageChange(files) {
        this.setState({
            newProfileImage: files[0]
        });
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
                        {logged.administrator == 0 &&
                            <Tenant
                                user={this.state.user}
                                imageURL={this.state.imageURL}
                                formUser={this.state.formUser}
                                newProfileImage={this.state.newProfileImage}
                                onChange={this.handleChange}
                                onSubmit={this.handleTenantSubmit}
                                onImageChange={this.handleImageChange}
                                resetUserForm={this.resetUserForm}
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
