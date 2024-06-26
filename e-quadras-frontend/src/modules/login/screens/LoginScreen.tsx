import { useState } from 'react';

import useRequest from '../../../shared/hooks/useRequest';

function LoginScreen() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { authRequest } = useRequest();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    authRequest(formData);
  };

  const handleCheckBoxOnChange = () => {
    console.log('CheckBox foi marcada!');
  };

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="login-wrap p-4 p-md-5">
              <div className="icon d-flex align-items-center justify-content-center">
                <span className="fa fa-user-o"></span>
              </div>
              <h3 className="text-center mb-4">Autenticar</h3>
              <form action="#" className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control rounded-left"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Login"
                    required
                  />
                </div>
                <div className="form-group d-flex">
                  <input
                    type="password"
                    className="form-control rounded-left"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Senha"
                    required
                  />
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="form-control btn btn-primary rounded submit px-3"
                  >
                    Login
                  </button>
                </div>
                <div className="form-group d-md-flex">
                  <div className="w-50">
                    <label className="checkbox-wrap checkbox-primary">
                      Lembre-me
                      <input type="checkbox" onChange={handleCheckBoxOnChange} />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="w-50 text-md-right">
                    <a href="#">Esqueci a senha</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginScreen;
