import React from 'react'

const Tabs = ({children, className}: {children: React.ReactNode, className: string}) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default Tabs