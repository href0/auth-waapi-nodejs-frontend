import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [nohp, setNohp] = useState('');
    const [msg, setMsg] = useState(''); 
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                nohp
            });
            navigate('/verifyotp');
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg)
            }
        }
    }
    return (
        <section className="hero has-background-grey-light is-success is-fullheight is-fullwidth">
          <div className="hero-body">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-4-desktop">
                        <form onSubmit={Auth} className="box">
                            <p className="has-text-centered">{msg}</p>
                            <div className="field">
                                <label className="label">No Handphone</label>
                                <div className="control">
                                    <input type="text" placeholder="0823123456789" className="input" value={nohp} onChange={(e) => setNohp(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <button className="button is-success is-fullwidth">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
          </div>
        </section>
    )
}

export default Login
