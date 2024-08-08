import React from 'react';
import Lottie from 'lottie-react';
import data from './data.json'


export default function AnimationSubmit( {  disableLoop, status } ) {

    return status === false || <div>
        <Lottie animationData={data} loop={!disableLoop} />
    </div>
}