import { useCallback, useState, useEffect, useRef } from "react";
import copy from "clipboard-copy";
import CopyButton from "./CopyButton";
import clipboardCopy from "clipboard-copy";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const [password, SetPassword] = useState("");

  //* useRef
  const passwordRef = useRef(null);

  // passwordGenerate function
  const passwordGenerater = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    // condition apply
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%&*_=.?";

    // applying for loop for generate password
    for (let i = 1; i <= length; i++) {
      // it will give random index number
      let char = Math.floor(Math.random() * str.length + 1);
      console.log(char);
      // charAt is convert index number into characters

      pass += str.charAt(char);
      console.log(pass);
    }
    SetPassword(pass);
  }, [length, numberAllowed, charAllowed, SetPassword]);

  // copyPasswordClipBoard;
  // const copyPasswordClipBoard = useCallback(() => {
  //   passwordRef.current?.setSelectionRange(0, 10);
  //   window.navigator.clipboard.writeText(password);
  // }, [password]);

  //* we call now passwordGenerater by using useEffect
  useEffect(() => {
    passwordGenerater();
    console.log("call have been done");
  }, [length, numberAllowed, charAllowed, SetPassword]);

  //* clipboardCopy function
  const [copiedText, setCopiedText] = useState("");

  const handleCopyClick = async () => {
    try {
      // Replace 'YourTextToCopy' with the text you want to copy
      await copy(password);
      passwordRef.current?.select();
      setCopiedText("Copied!");
      setInterval(() => {
        setCopiedText("");
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
      setCopiedText("Copy failed");
    }
  };

  return (
    <>
      <h1 className="text-2xl text-center text-white font-bold mt-24">
        Password Generator in React + Vite
      </h1>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-12 py-3 text-orange-800 bg-gray-800">
        <div className="flex shadow rounded-md overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            placeholder="Password"
            ref={passwordRef}
            readOnly
            className="outline-none w-full py-2 px-4 "
          />
          <CopyButton CopyClip={handleCopyClick} />
          <span className="absolute top-40 text-sm text-green-600 font-bold capitalize left-[62%] -translate-y-2 transition ease-in delay-150">
            {copiedText}
          </span>
        </div>
        <div className="flex text-sm gap-y-2">
          <input
            type="range"
            min={6}
            max={15}
            value={length}
            className="curson-pointer "
            id="range"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label
            for="range"
            className="text-md capitalize font-bold text-white px-5"
          >
            length {length}
          </label>
        </div>
        <div className="flex text-md mx-2 my-3 gap-4  ">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            value={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
            className="cursor-pointer"
            id="number"
          />
          <label
            htmlFor="number"
            className="text-md capitalize cursor-pointer font-bold text-white px-2"
          >
            Numbers
          </label>
        </div>
        <div className="flex text-md mx-2 my-3 gap-4 cursor-pointer">
          <input
            type="checkbox"
            // value={charAllowed}
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
            className="cursor-pointer"
            id="Char"
          />
          <label
            htmlFor="Char"
            className="text-md capitalize cursor-pointer font-bold text-white px-2"
          >
            characters
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
