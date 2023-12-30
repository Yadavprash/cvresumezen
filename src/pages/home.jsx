import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import homes from './home.module.css'
import logo from './logo.png'
import template1 from './template1.png';
import template2 from './template2.png';
import template3 from './template3.png';
import template4 from './template4.png';
import template5 from './template5.png';
import template6 from './template6.png';
import template7 from './template7.png';
import template8 from './template8.jpg';
import template9 from './template9.png';
const Home = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    }
    const handleNavigateToEditor = () => {
        navigate("/editor");
    }
    return (
        <div className={homes.homeDiv}>
            <div className={homes.bar}>
                <img className={homes.logo} src={logo}></img>
                <h2>{user && user.email}</h2>
                <button className={homes.out} onClick={handleLogout}>Logout</button>
            </div>
            <div className={homes.cards}>
                <div className={homes.template}>
                    <img src={template1} onClick={handleNavigateToEditor} alt="Template 1"/>
                </div>

                <div className={homes.template}>
                    <img src={template2} onClick={handleNavigateToEditor} alt="Template 2"/>
                </div>
                <div className={homes.template}>
                    <img src={template3} onClick={handleNavigateToEditor}  alt="Template 2"/>
                </div>
                <div className={homes.template}>
                    <img src={template4} onClick={handleNavigateToEditor}  alt="Template 2"/>
                </div>
                <div className={homes.template}>
                    <img src={template5} onClick={handleNavigateToEditor} alt="Template 2"/>
                </div>
                <div className={homes.template}>
                    <img src={template6} onClick={handleNavigateToEditor}  alt="Template 2"/>
                </div>
                <div className={homes.template}>
                    <img src={template7} onClick={handleNavigateToEditor} alt="Template 2"/>
                </div>
                <div className={homes.template}>
                    <img src={template8} onClick={handleNavigateToEditor} alt="Template 2"/>
                </div>
                <div className={homes.template}>
                    <img src={template9} onClick={handleNavigateToEditor}  alt="Template 9"/>
                </div>
            </div>
                <button className={homes.button} onClick={handleNavigateToEditor}>Get Started</button>
        </div>

    )
}

export default Home