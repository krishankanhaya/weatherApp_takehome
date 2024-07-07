
const Dashboard = ({children}: {children: React.ReactNode}) => {
    return (
        <div className=''>
            <h1 className='my-2 text-center text-2xl font-bold text-black dark:text-white border-b-2 border-yellow-300 m-auto lg:w-fit'>Weather Dashboard</h1>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Dashboard
