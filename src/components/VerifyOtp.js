import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyOtp = () => {
    
    const [code, setCode] = useState('');
    const [nohp, setNohp] = useState('');
    const [msg, setMsg] = useState(''); 
    // const [expire, setExpire] = useState(''); 
    const navigate = useNavigate();

    useEffect(() => {
        getNoHp();
    });

    const getNoHp = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token')
            const decoded = jwt_decode(response.data.otpToken)
            setNohp(decoded.nohp)
            // setExpire(decoded.exp)
        } catch (error) {
             // jika tidak ada token, maka diredirect ke login
            if(error.response){
                console.error(error.response)
                navigate('/')
            }
        }
    }
    const Verify = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/verifyotp', {
                nohp:nohp,
                code:code
            });
            navigate('/dashboard')
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg)
            }
        }
    }
    const resendCode = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/login', {
                nohp
            });
            console.log('resend')
            toast.success('Code re-sent successfully, check your whatsapp', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }) 
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
                        <form onSubmit={ Verify } className="box">
                            <p className="has-text-centered has-text-danger">{msg}</p>
                            <a href="/#" className="button is-info mb-3" onClick={resendCode}>Resend Code</a>
                             <ToastContainer
                                position="top-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover/>
                            <div className="field">
                                <label className="label">Code OTP</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder="123456" value={ code } onChange={(e) => setCode(e.target.value)}></input>
                                </div>
                            </div>
                            <div className="field">
                                <button className="button is-success is-fullwidth">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
          </div>
        </section>
    )
}

export default VerifyOtp
