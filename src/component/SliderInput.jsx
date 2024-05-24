import React from 'react'
import { NumberWithCommas } from '../utils/config'

const SliderInput = ({
    title,
    min,
    max,
    underlineTitle,
    state,
    onChange,
    labelMin,
    labelMax
}) => {
    return (
        <>
            <span className='title'>{title}</span>
            {state > 0 && (
                <span className='title' style={{ textDecoration: 'underline' }}>
                    {underlineTitle}
                </span>
            )}

            <div>
                <input
                    type="range"
                    min={min}
                    max={max}
                    className='slider'
                    value={state}
                    onChange={onChange}
                />
                <div className='labels'>
                    <label>{labelMin ?? NumberWithCommas(min) }</label>
                    <b>{NumberWithCommas(state)}</b>
                    <label>{labelMax ?? NumberWithCommas(max) }</label>
                </div>
            </div>
        </>
    )
}

export default SliderInput
