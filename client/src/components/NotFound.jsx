import React from 'react';
import error404 from '../assets/error404.png'

export default function NotFound() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <img style={{ width: '30vw' }} src={error404} alt="page-not-found-img" />
        </div >

    )
}