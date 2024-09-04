import React, {useCallback} from 'react'
import "./AvatarForm.scss";
import { Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { UPDATE_AVATAR } from '../../../gql/user';

export default function AvatarForm(props) {
    const {setShowModal} = props;
    const [updateAvatar] = useMutation(UPDATE_AVATAR);

    const onDrop = useCallback(
        async (acceptedFile) => {
      const file = acceptedFile[0];
      console.log('File to upload:', file);

      
      try {
        const result = await updateAvatar({variables: {file}}) ;
        console.log(result)
      } catch (error) {
        console.log(error);
      }
    }, [updateAvatar] 
    );

    const {getRootProps, getInputProps} = useDropzone({
      accept: "image/png, image/jpeg",
      noKeyboard: true,
        multiple:false,
        onDrop
    });


  return (
    <div className='avatar-form'>
        
        <Button  {...getRootProps()}>Cargar una foto</Button>   
        <Button>Delete current image</Button> 
        <Button onClick={()=> setShowModal(false)}>Cancelar</Button>
        <input {...getInputProps()}/>
    </div>
  )
}
