

function Logout({ user, setUser }) {

    const handleClick = () => {
        fetch("/logout", {
            method: "DELETE",
        }).then(() => setUser(null) )
    }

    return (
        <div>
            <h2>Logout:</h2>
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}

export default Logout;