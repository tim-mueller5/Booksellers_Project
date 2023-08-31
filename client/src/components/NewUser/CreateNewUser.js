import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";


function CreateNewUser({ user, setUser }) {
    
    const navigate = useNavigate();

    const formSchema = yup.object().shape({
        username: yup.string().required("Must have username"),
        password: yup.string().required("Must have password")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((resp) => {
                if (resp.status === 201) {
                    console.log("User created")
                    if (resp.ok) {
                        resp.json().then((user) => setUser(user));
                    }
                }
            }).then(navigate(`/`))
        }
    })
    return (
        <div>
            <div className='flex-c text-center'>
                <h2>Create New User:</h2>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="username">New Username: </label>
                    <input id="username" name="username" onChange={formik.handleChange} 
                        value={formik.values.username} 
                        style={{background: '#70a7ff'}}/>
                    <p style={{ color: "red" }}> {formik.errors.username}</p>
                    <label htmlFor="password">New Password:&nbsp;&nbsp;</label>
                    <input id="password" name="password" onChange={formik.handleChange}
                        value={formik.values.password}
                        style={{background: '#70a7ff'}}/>
                    <p style={{ color: "red" }}> {formik.errors.password}</p>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateNewUser;