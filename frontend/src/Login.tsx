import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
import picture from "./Files/Dashboard.png";
import logo from "./assets/A.png";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const history = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        username: email,
        password: password,
      });
      setErr("");

      // Update this line to retrieve the token correctly
      const token = response.data["access_token"]; // assuming 'access' is the key for the Bearer token
      console.log(token);

      // Set the Authorization header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("access_token", token); // store as 'access_token'
      localStorage.setItem("Data", JSON.stringify(response.data));
      history("/home");
    } catch (error: any) {
      setErr(error.response?.data?.detail || "Login failed, please try again."); // handle error properly
    }
  };

  return (
    <div className="flex w-screen relative h-screen">
      {err && (
        <Alert variant={"destructive"}>
          <AlertTitle>An Error Occoured</AlertTitle>
          <AlertDescription>{err}</AlertDescription>
        </Alert>
      )}
      <div className="w-[40%] h-screen my-auto relative">
        <form
          onSubmit={handleLogin}
          className="w-[70%] mx-auto h-fit my-auto pt-[13vh] flex flex-col"
        >
          <div className="flex gap-4">
            <img
              src={logo}
              className="mb-[4vh] w-[6vw] mx-auto rounded-xl"
              alt="Logo"
            />
          </div>
          <h1 className="text-center font-bold text-[3.5ch]">
            Log in to your account
          </h1>
          <h2 className="text-center text-green-400 text-[1.9ch] mb-[5vh]">
            Welcome Back!
          </h2>
          <Label className="text-lg mb-1">Email</Label>
          <input
            type="email"
            className=" border-[0.5px]  rounded-lg px-[1vw] py-[1vh]"
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Label className="text-lg mt-[3vh] mb-1">Password</Label>
          <input
            type="password"
            className=" border-[0.5px]  rounded-lg px-[1vw] py-[1vh] mb-[2vh]"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <h2 className="text-center text-neutral-700 text-[1.5ch] mb-[1vh]">
            Forgot your password?{" "}
            <a href="/forgot-password/" className="text-green-500">
              Reset it
            </a>
          </h2>
          <h2 className="text-center text-neutral-700 text-[1.5ch] mb-[6vh]">
            Don't have an account?{" "}
            <a href="/signin/" className="text-green-500">
              Sign up!
            </a>
          </h2>
          <Button
            type="submit"
            className="bg-green-500 px-[15%] text-white w-fit mx-auto hover:bg-green-400 transition-all"
          >
            Submit
          </Button>
        </form>
        <h2 className="absolute bottom-[1vw] left-[1vw] text-black text-[1.3ch]">
          Copyright © Viable 2024. All rights reserved.
        </h2>
      </div>
      <img
        className="w-[60%] object-cover object-right"
        src={picture}
        alt="Background"
      />
    </div>
  );
};

export default LoginForm;
