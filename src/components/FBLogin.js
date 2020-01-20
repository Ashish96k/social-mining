import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';

const FBLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [picture, setPicture] = useState('');
  const [birthday, setBirthday] = useState('');
  const [hometown, setHometown] = useState('');
  const [likes, setLikes] = useState([]);
  const [gender, setGender] = useState('');

  const componentClicked = () => console.log('Component Clicked');

  const responseFacebook = response => {
    console.log(response);
    const {
      userID,
      name,
      email,
      picture,
      birthday,
      hometown,
      gender,
      likes
    } = response;
    setIsLoggedIn(true);
    setUserId(userID);
    setName(name);
    setEmail(email);
    setPicture(picture.data.url);
    setBirthday(birthday);
    setHometown(hometown.name);
    setGender(gender);
    setLikes(likes.data)
  };

  let fbContent;
  if (isLoggedIn) {
    fbContent = (
      <div className='card'>
        <img src={picture} className='card-img-top' alt={name} />
        <div className='card-body'>
          <h5 className='card-title'>{name}</h5>
          <p className='card-text'>UserID - {userId}</p>
          <p className='card-text'>Email - {email}</p>
          <p className='card-text'>Birthday - {birthday}</p>
          <p className='card-text'>Hoemtown - {hometown}</p>
          <p className='card-text'>Gender - {gender}</p>
          <h6 className='card-text'>Your Likes</h6>
          <ul className='list-group list-group-flush'>
            {
              likes.map(like => <li key={like.id} className='list-group-item'>{ like.name }</li>)
            }
          </ul>
        </div>
      </div>
    );
  } else {
    fbContent = (
      <FacebookLogin
        appId='163898494893820'
        autoLoad={true}
        fields='name,email,picture,birthday,hometown,likes,gender'
        onClick={componentClicked}
        callback={responseFacebook}
      />
    );
  }

  return (
    <>
      <h2 className='text-primary text-center text-capitalize my-5'>
        { isLoggedIn ? `Welcome ${ name }` : 'Login To FaceBook' }
      </h2>
      <div className='d-flex justify-content-center'>{fbContent}</div>
    </>
  );
};

export default FBLogin;
