import React from 'react'

const Button = ({ content, className }) => {
    return (
        <button className={`cursor-pointer btn btn-ghost ${className}`}>{content}</button>
    )
}

export default Button