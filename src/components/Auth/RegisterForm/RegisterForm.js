import React from 'react'
import { Form, Button } from 'semantic-ui-react';
import "./RegisterForm.scss";
import {useFormik} from "formik";
import * as Yup from "yup";
import { REGISTER } from '../../../gql/user';
import {toast} from "react-toastify";
import {useMutation} from "@apollo/client";


export default function RegisterForm(props) {
    const {setShowLogin} = props;
    const [register] = useMutation(REGISTER);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            name: Yup.string().required(true),
            username: Yup.string().matches(/^[a-zA-Z0-9-]*$/, 'El nombre del usuario no puede tener espacios').required("El nombre del usuario es obligatorio"),
            email: Yup.string().required('El email es obligatorio').email("El email no es valido"),
            password: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref("repeatPassword")], "Las contraseñas no son iguales"),
            repeatPassword: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref("password")], "Las contraseñas no son iguales"),
        }),
        onSubmit: async(formData) =>{
            try {
                const newUser = formData;
                delete newUser.repeatPassword;
                await register({
                    variables: {
                        input : newUser
                    }
                });
                toast.success("Usuario registrado correctamente");
                setShowLogin(true);

            } catch (error) {
                toast.error(error.message);
                console.log(error.message)
            }            
        }
    });
 
  return (
    <>
        <h2 className='register-form-title'>Registrate para navegar en instaclone</h2>
        <Form className='register-form' onSubmit={formik.handleSubmit}>
            <Form.Input  type='text' placeholder='Ingresa tu nombre y apellido' name="name" onChange={formik.handleChange} value={formik.values.name} 
             error={formik.errors.name && true}/>
            <Form.Input  type='text' placeholder='Ingresa tu nombre de usuario' name="username" onChange={formik.handleChange} value={formik.values.username}
            error={formik.errors.username && true}/>
            <Form.Input  type='email' placeholder='Ingresa tu correo' name="email" onChange={formik.handleChange} value={formik.values.email}
            error={formik.errors.email && true} />
            <Form.Input  type='password' placeholder='Ingresa tu contraseña' name="password"  onChange={formik.handleChange} value={formik.values.password}
            error={formik.errors.password } />
            <Form.Input  type='password' placeholder='Repite tu contraseña' name="repeatPassword"  onChange={formik.handleChange} value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword} />

            <Button type='submit' className='btn-submit'>Registrarse</Button>

            {/* <Button onClick={formik.handleReset} type='button' className='btn-submit'>Reiniciar form</Button> */}

        </Form>
    </>
  )
}


function initialValues() {
    return {
        name: "",
        username: "",
        email : "",
        password : "",
        repeatPassword : ""
    }
}