import React, { useState } from 'react';

const Tenant = ({ user, formUser, newProfileImage, onChange, onSubmit, onImageChange, resetUserForm, imageURL }) => {


    return (
        <div>
            <form onSubmit={onSubmit}>

                <div style={{ 'border': 'solid 2px #ddd', 'borderRadius': '10px', 'padding': '10px', 'marginBottom': '10px', 'textAlign': 'center' }}>
                    {user.profile_image == "" &&
                        <img
                            style={{ 'border': 'solid 3px #ddd', 'borderRadius': '50%', 'margin': '30px', 'height': '200px', 'width': '200px' }}
                            src="https://media.istockphoto.com/vectors/male-face-silhouette-or-icon-man-avatar-profile-unknown-or-anonymous-vector-id1087531642?k=20&m=1087531642&s=170667a&w=0&h=ge3fq1Dw0-J2FoW96c8klSiHyOnitVhReUUuIIYqtvw="
                        />
                    }
                    {user.profile_image != "" &&
                        <img
                            style={{ 'border': 'solid 3px #ddd', 'borderRadius': '50%', 'margin': '30px', 'height': '200px', 'width': '200px' }}
                            src={imageURL}
                        />
                    }
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">📸</span>
                        </div>
                        <input type="file" className="form-control" placeholder='Nombre' name='profile_image' onChange={e => onImageChange(e.target.files)} />
                    </div>
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
                    {(user.name != formUser.name || user.email != formUser.email || newProfileImage != "") &&
                        <button type='submit' className='btn btn-primary'>GUARDAR CAMBIOS</button>
                    }
                </div>
            </form>
        </div>

    );
}

export default Tenant;

