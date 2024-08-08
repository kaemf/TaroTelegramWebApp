import React from 'react';
import css from './AnimationLoad.module.css'

export default function AnimationLoad( { status, color = 'theme-background' } ) {

    const styled = {
        border: `var(--4) solid var(--${color})`,
        borderColor: `var(--${color}) transparent transparent transparent`
    }

    return status === false || <div class={css.AnimationLoad}>
        <div style={styled}> </div>
        <div style={styled}> </div>
        <div style={styled}> </div>
        <div style={styled}> </div>
    </div>
}