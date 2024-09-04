import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react';
import "./LoginForm.scss";
import {useFormik} from "formik";
import * as Yup from "yup";
import { LOGIN } from '../../../gql/user';
import {toast} from "react-toastify";
import {useMutation} from "@apollo/client";
import { decodeToken, setToken } from '../../../Utils/token';
import useAuth from '../../../hooks/useAuth';


export default function LoginForm() {
    const [login] = useMutation(LOGIN);
    const [error, seterror] = useState("");
    const {setUser} = useAuth();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            email: Yup.string().required('El email es obligatorio').email("El email no es valido"),
            password: Yup.string().required("La contraseña es obligatoria"),
        }),
        onSubmit: async (formData) => {
            seterror("");
            try {
                const dataUser = formData;
               const {data} = await login({
                    variables: {
                        input : dataUser
                    }
                });
                const {token} = data.login;
                setToken(token);
                setUser(decodeToken(token));    
                toast.success("Usuario ingresado correctamente");

            } catch (error) {
                toast.error(error.message);
                seterror(error.message);
            }  
        }

    })
  return (
    <>

       <Form className='login-form' onSubmit={formik.handleSubmit}>
        <h2>Inicia sesion</h2>
            <Form.Input  type='email' placeholder='Ingresa tu correo' name="email" onChange={formik.handleChange} value={formik.values.email}
            error={formik.errors.email && true} />
            <Form.Input  type='password' placeholder='Ingresa tu contraseña' name="password"  onChange={formik.handleChange} value={formik.values.password}
            error={formik.errors.password } />
     
            <Button type='submit' className='btn-submit'>Ingresar</Button>

            {error && <p className='submit-error'>{error}</p>}
        </Form>
    </>
  )
}

function initialValues() {
    return {
        email : "",
        password : "",
    }
}