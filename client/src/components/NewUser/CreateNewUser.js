import { useFormik } from "formik";
import * as yup from "yup";


function CreateNewUser() {

    const formSchema = yup.object().shape({
        username: yup.string().required("Must have username")
    })

    const formik = useFormik({
        initialValues: {
            username: ""
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
                if (resp.status === 200) {
                    console.log("User created")
                }
            })
        }
    })


    return (
        <div>
            <h2>Create New User: </h2>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input id="username" name="username" onChange={formik.handleChange} value={formik.values.username} />
                <button  type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateNewUser;