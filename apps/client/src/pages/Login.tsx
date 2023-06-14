import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "urql";
import { loginMutationDocument } from "../schema";
import useBaseStore from "../store";
import "./Login.css";

const LoginPage = () => {
  const [name, setName] = useState("lordpoojesh");
  const setUser = useBaseStore((state) => state.setUser);
  const navigate = useNavigate();

  // MUTATION

  const [, login] = useMutation(loginMutationDocument);

  const handleLoginFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    if (!name) return;
    try {
      const res = await login({ name });
      if (res.data?.login) {
        setUser(res.data?.login);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setName(e.target.value);

  return (
    <div className="login-box">
      <form className="login-form" onSubmit={handleLoginFormSubmit}>
        <input
          className="login-input"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <button className="login-submit" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
