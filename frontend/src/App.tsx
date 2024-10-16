import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import { DotPattern } from "@/components/ui/dot-pattern";

import { FaDiscord } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { SiDevpost } from "react-icons/si";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <section className="grid text-left  items-start justify-items-start min-h-screen w-screen left-0 absolute  p-8 pb-20  sm:p-20 font-[family-name:var(--font-geist-sans)] ">
        <div className="flex flex-col  row-start-2 items-start sm:items-start">
          {/*<AnimatedBackground animationName="galaxySpiral"></AnimatedBackground>*/}
          <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className={
              "[mask-image:linear-gradient(to_bottom_left,transparent,transparent,white,transparent,transparent)] z-0 "
            }
          />
          <h1 className="font-black text-[120px] z-40 mb-0  ">
            PlaceHolder Title
          </h1>
          <h1 className="font-black text-[30px] z-40 ">
            <span>December 21, 2024 </span>
            <span className="text-indigo-500">@ California High School</span>
          </h1>

          <div className="flex mt-[20px] ">
            <input
              type="text"
              className="w-[400px] rounded-l-lg rounded-r-none text-white  px-8 py-2 border border-indigo-500"
              placeholder="Email Address"
            ></input>
            <button className="min-w-[150px] bg-indigo-500 px-8 py-2 rounded-r-lg">
              Pre-Register
            </button>
            <div className="border-r h-fill w-[42px] mr-[20px] border-red-50"></div>
            <a className=" h-fill mx-2">
              <FaDiscord size={"40px"} />
            </a>
            <a className=" h-fill mx-2">
              <MdOutlineEmail size={"40px"} />
            </a>
            <a className=" h-fill mx-2">
              <FaInstagram size={"40px"} />
            </a>
            <a className=" h-fill mx-2">
              <SiDevpost size={"40px"} />
            </a>
          </div>
        </div>
        <div>{/*Sponsor Bar*/}</div>
      </section>
    </>
  );
}

export default App;
