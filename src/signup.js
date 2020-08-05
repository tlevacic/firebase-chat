import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import mail from './public/assets/mail.png';
import key from './public/assets/key.png';
import chat from './public/assets/chat.png';
const firebase = require("firebase");

const SignUp = (props) => {
    const [firebaseErrors, setFirebaseErrors] = useState(null);
    const { handleSubmit, register, errors, watch } = useForm();
    const [passwordConf, setPasswordConf] = useState(true);
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
        <div className="w-screen justify-center h-screen items-center flex font-montserrat flex-col"
            style={{ fontFamily: "montserrat" }}>
            <div className="mb-12">
                <img src={chat} />
            </div>
            <div className="flex justify-center flex-col w-full md:w-6/12">
                <div className=" -mt-10">
                    <p className="text-4xl text-center font-bold">Sign up to chat.</p>
                    <p className="text-md text-center text-gray-500">Remember your friends anytime and contact them.</p>
                    {firebaseErrors ? <p className="text-xs text-center text-red-500 mt-10">
                        {firebaseErrors}
                    </p> : null}

                </div>
                <div className="w-full m-auto mt-20">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center flex-col w-full">
                        <div class="p-2 w-11/12 md:w-9/12 lg:w-6/12">
                            <div class="relative mb-3 flex flex-wrap items-stretch">
                                <span class="absolute z-10 py-3 pl-3 w-8 h-full leading-snug bg-transparent rounded text-base font-normal text-gray-400 text-center flex items-center justify-center">
                                    <img src={mail} />
                                </span>
                                <input
                                    placeholder="Email  "
                                    class="relative py-1 px-2 pl-10 w-full bg-white border-b-2 outline-none text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-400"
                                    name="email"
                                    ref={register({
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "invalid email address"
                                        }
                                    })}
                                />
                            </div>
                        </div>
                        {<p className="text-xs text-center text-red-500">
                            {errors.email && errors.email.message}
                        </p>}

                        <div class="p-2 w-11/12 md:w-9/12 lg:w-6/12">
                            <div class="relative mb-3 w-full flex flex-wrap items-stretch">
                                <span class="absolute z-10 py-3 pl-3 w-8 h-full leading-snug bg-transparent rounded text-base font-normal text-gray-400 text-center flex items-center justify-center">
                                    <img src={key} />
                                </span>
                                <input
                                    placeholder="password"
                                    class="relative py-1 px-2 pl-10 w-full border-b-2 bg-white outline-none text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-400"
                                    name="password"
                                    ref={register({
                                        required: "You must specify a password",
                                        minLength: {
                                            value: 8,
                                            message: "Password must have at least 8 characters"
                                        }
                                    })}
                                />
                            </div>
                        </div>

                        <div class="p-2 w-11/12 md:w-9/12 lg:w-6/12">
                            <div class="relative mb-3 w-full flex flex-wrap items-stretch">
                                <span class="absolute z-10 py-3 pl-3 w-8 h-full leading-snug bg-transparent rounded text-base font-normal text-gray-400 text-center flex items-center justify-center">
                                    <img src={key} />
                                </span>
                                <input
                                    placeholder="Confirm password"
                                    class="relative py-1 px-2 pl-10 w-full border-b-2 bg-white outline-none text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-400"
                                    name="cpassword"
                                    ref={register({
                                        required: "You must specify a password",
                                        validate: (value) => setPasswordConf(value === watch('password')),
                                    })}
                                />
                            </div>
                        </div>


                        {<p className="text-xs text-center text-red-500">
                            {errors.password && errors.password.message}
                        </p>}
                        {!passwordConf &&
                            <p className="text-xs font-bold text-red-700">
                                Password do not match
                       </p>}

                        <button className="outline-none mt-4 mb-4 bg-purple-400 hover:bg-purple-700 text-white font-bold py-2 px-12 rounded-full w-6/12 md:w-3/12" type="submit">Sign up</button>
                        <p className="text-md text-center text-gray-500 mt-10">Already have an account? <Link className="text-purple-400 font-semibold" to='/login'>Login to your account.</Link> </p>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default SignUp;