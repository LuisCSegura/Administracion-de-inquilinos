import React, { useState } from 'react';

const Admin = ({ tenants, formUser, onChange, onSubmit, deleteUser, resetUserForm, loadUserForm }) => {
    const [showForm, setShowForm] = useState(false);
    const switchForm = () => { setShowForm(!showForm) }
    const resetForm = () => {
        setShowForm(false);
        resetUserForm();
    }
    const sendForm = (e) => {
        onSubmit(e);
        resetForm();
    }
    const loadForm = (user) => {
        loadUserForm(user);
        setShowForm(true);
    }
    return (
        <div>
            {showForm &&
                <form onSubmit={sendForm}>

                    <div style={{ 'border': 'solid 2px #ddd', 'borderRadius': '10px', 'padding': '10px', 'marginBottom': '10px' }}>
                        {formUser.id < 0 &&
                            <h2>NUEVO INQUILINO</h2>
                        }
                        {formUser.id >= 0 &&
                            <h2>EDITAR INQUILINO</h2>
                        }
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">👤</span>
                            </div>
                            <input type="text" className="form-control" placeholder='Nombre' name='name' value={formUser.name} onChange={onChange} />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">📧</span>
                            </div>
                            <input type="text" className="form-control" placeholder='Email' name='email' value={formUser.email} onChange={onChange} />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">🔒</span>
                            </div>
                            {formUser.id < 0 &&
                                <input type="password" className="form-control" placeholder='Contraseña' name='password' value={formUser.password} onChange={onChange} />
                            }
                            {formUser.id >= 0 &&
                                <input type="password" className="form-control" placeholder='Dejar en Blanco para mantener la misma Contraseña' name='password' value={formUser.password} onChange={onChange} />
                            }

                        </div>
                        <button className='btn btn-danger mr-1' onClick={resetForm}>CANCELAR</button>
                        <button type='submit' className='btn btn-primary'>GUARDAR</button>
                    </div>
                </form>
            }
            {!showForm &&
                <button className='btn btn-success mb-2' onClick={switchForm}>NUEVO INQUILINO</button>
            }
            <div style={{ 'border': 'solid 2px #ddd', 'borderRadius': '10px', 'padding': '10px' }}>
                <h2>INQUILINOS</h2>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOMBRE</th>
                            <th>EMAIL</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tenants.map((tenant) => (
                            <tr key={tenant.id}>
                                <td>{tenant.id}</td>
                                <td>{tenant.name}</td>
                                <td>{tenant.email}</td>
                                <td>
                                    <button className='btn btn-warning mr-1' onClick={() => { loadForm(tenant) }}>EDITAR</button>
                                    <button className='btn btn-danger' onClick={() => { deleteUser(tenant.id) }}>ELIMINAR</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>

    );
}

export default Admin;

