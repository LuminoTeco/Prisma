import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <div>
      <h1>Cadastro de unidades</h1>
      <div>
        <form>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              placeholder="example@xxx.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="pwd">Senha</label>
            <input
              type="password"
              placeholder="*********"
              onChange={(e) => setPwd(e.target.value)}
            />
          </div>
          <button>Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
