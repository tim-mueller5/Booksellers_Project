import { useFormik } from "formik";
import * as yup from "yup";

function Login({ user, setUser }) {

    const formSchema = yup.object().shape({
        username: yup.string().required("Must have username"),
        password: yup.string().required("Must have password")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((response) => {
                if (response.ok) {
                    response.json().then((user) => setUser(user));
                    formik.values.username = ""
                    formik.values.password = ""
                  }
            })
        }
    })


    return (
        <div>
            {(user != null) ? <h3>Current User: {user.username}</h3> : <h3>Login...</h3>}
            <h2>Login: </h2>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="username">New Username: </label>
                <input id="username" name="username" onChange={formik.handleChange} value={formik.values.username} />
                {/* <p style={{ color: "red" }}> {formik.errors.username}</p> */}
                <label htmlFor="password">New Password: </label>
                <input id="password" name="password" onChange={formik.handleChange} value={formik.values.password}/>
                {/* <p style={{ color: "red" }}> {formik.errors.password}</p> */}
                <button  type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login;