import React from 'react';
import { Link } from 'react-router-dom';

function Register({title,nameButtonSubmit, nameLink, onRegister}) {
  
  
  const [formValue, setFormValue] = React.useState({
    password: '',
    email: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formValue.email, formValue.password);
  }


  return (
    <div className="login">
      <h2 className="login__title">{title}</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input 
          id="email" type="email" className="login__input" 
          name="email" placeholder="Email" required 
          value={formValue.email} onChange={handleChange}
        />
        <input 
          id="password" type="password" className="login__input" 
          name="password" placeholder="Пароль" required
          value={formValue.password} onChange={handleChange}
        />
        <button type="submit" className="login__submit">{nameButtonSubmit}</button>
      </form>
      <Link className="login__link" to="/sign-in">{nameLink}</Link>
    </div>
  );
}

export default Register;