import React ,{useState} from 'react'
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../gql/user';
import "./Profile.scss";
import { Grid, Image } from 'semantic-ui-react';
import ImageNoFound from "../../assets/png/avatar.png";
import UserNotFound from '../UserNotFound/UserNotFound';

import ModalBasic from '../Modal/ModalBasic/ModalBasic';
import AvatarForm from '../User/AvatarForm/AvatarForm';
import useAuth from '../../hooks/useAuth';

export default function Profile(props) {
    const {username} = props;
    const [showModal, setShowModal] = useState(false);
    const [titleModal, settitleModal] = useState('');
    const [childrenModal, setchildrenModal] = useState(null)
    const {auth} = useAuth();
    console.log(auth)
    const {data , loading, error} = useQuery(GET_USER, {
        variables: {username}
    });
    if(loading) return null;
    if(error) return <UserNotFound />

    const {getUser} = data;


    const handlerModal = (type) => {
        switch(type){
            case "avatar": 
                settitleModal('Change image user');
                setchildrenModal(<AvatarForm setShowModal={setShowModal} />);
                setShowModal(true);
                break;
            
        default:
                    break;
        }
    }

  return (
    <>
        <Grid className='profile'>
            <Grid.Column width={5} className='profile__left'>
               <Image src={ImageNoFound} avatar onClick={() => username === auth.username && handlerModal("avatar")} />
            </Grid.Column>

            <Grid.Column width={11} className='profile__right'>
                <div>
                </div>
                <div>
                    followers
                </div>

                <div className='other'>
                    <p className='name'>{getUser.name}</p>

                    {getUser.siteWeb && (
                        <a href={getUser.siteWeb} className='siteWeb' target='_blank'>
                            {getUser.siteWeb}
                        </a>
                    )}
                    {getUser.description && (
                        <p className='description'>
                            {getUser.description}
                        </p>
                    )}
                </div>
            </Grid.Column>
        </Grid>
        <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
            {/* <p>Opcioness</p>
            <p>Opcioness</p>

            <p>Opcioness</p> */}
            {/* <AvatarForm /> */}
            {childrenModal}

        </ModalBasic>
    </>
   

  )
}
