import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
const firebase = require("firebase");

const SignUp = (props) => {
    const [firebaseErrors, setFirebaseErrors] = useState(null);
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = values => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then(authRes => {
                const userObj = {
                    email: authRes.user.email
                };
                firebase
                    .firestore()
                    .collection('users')
                    .doc(values.email)
                    .set(userObj)
                    .then(() => {
                        props.history.push("/dashboard")
                    }, dbErr => {
                        setFirebaseErrors(dbErr.message);
                    })
            }, authErr => {
                setFirebaseErrors(authErr.message);
            })
    };

    return (
        <div className="w-screen justify-center h-screen align-center">
            <div className="flex justify-center">
                <p className="text-lg font-bold text-blue-500">Hello from Signup</p>
            </div>
            {firebaseErrors ? <p className="text-xs font-bold text-red-700">
                {firebaseErrors}
            </p> : null}
            <div className="w-6/12 m-auto mt-20">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        placeholder="Email  "
                        class="block my-2 w-full py-2 px-2 shadow-lg bg-white text-sm text-gray-700 border border-gray-100 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="email"
                        ref={register({
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address"
                            }
                        })}
                    />
                    {<p className="text-xs font-bold text-red-700">
                        {errors.email && errors.email.message}
                    </p>}

                    <input
                        placeholder="password"
                        class="block my-2 w-full py-2 px-2 shadow-lg bg-white text-sm text-gray-700 border border-gray-100 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="password"
                        ref={register({
                            required: "You must specify a password",
                            minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                            }
                        })}
                    />
                    {<p className="text-xs font-bold text-red-700">
                        {errors.password && errors.password.message}
                    </p>}

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
                </form>
            </div>
            <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to='/login'>Log in!</Link>
        </div>
    )
}


export default SignUp;