import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './styles.css';


const CreatedPoint = () => {
  
    return (
        <>
            <div id="page-created-point">    
                <FaCheck size={40} color='#34cb79'/>
                <h1>Cadastro concluído</h1>
                <Link 
                    to='/'
                    style={{ textDecoration: 'none', color:'#34cb79', marginTop:'20px' }}>
                        Voltar para Home
                </Link>
            </div>
        </>
    );
};

export default CreatedPoint;