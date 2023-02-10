import React from 'react'
import useMutations from '../hooks/useMutations'

const Login = () => {
    const { mutate: login } = useMutations().login
    //state for the login from 
    const [loginForm, setLoginForm] = React.useState({
        name: "",
        password: ""
    }
    )
    const handleSubmitLoginForm = (e) => {
        e.preventDefault()
        login(loginForm)
        setLoginForm({
            name: "",
            password: ""
        })
    }
    return (
        <div className="loginContainer" >
            <form onSubmit={handleSubmitLoginForm} className="loginForm">
                <input type="text" placeholder="username" value={loginForm.name} onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })} />
                <input type="password" placeholder="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
                <button type="submit" className="loginForm--submitBtn">Login</button>

            </form>

        </div >
    )
}

export default Login