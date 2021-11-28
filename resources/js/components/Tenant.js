import React, { useState } from 'react';

const Tenant = ({ user, formUser, onChange, onSubmit, resetUserForm }) => {

    return (
        <div>
            <form onSubmit={onSubmit}>

                <div style={{ 'border': 'solid 2px #ddd', 'borderRadius': '10px', 'padding': '10px', 'marginBottom': '10px' }}>
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
                    {(user.name != formUser.name || user.email != formUser.email) &&
                        <button type='submit' className='btn btn-primary'>GUARDAR CAMBIOS</button>
                    }
                </div>
            </form>
        </div>

    );
}

export default Tenant;

