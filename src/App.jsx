import { useState, useCallback, useEffect,useRef} from 'react';
import './App.css'; 

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+[]{}|;:,.<>?";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed,setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="app-container bg-custom-gradient flex flex-col items-center justify-center h-screen">
      <h1 className='text-white text-4xl mb-8 '>Password Generator</h1>
      <div className="flex px-4 my-8 ">
  <div className="flex w-full items-center">
    <input
      type="text"
      value={password}
      placeholder="Password"
            readOnly
            ref={passwordRef}
      className="outline-none w-full py-2 px-3 text-center text-black border border-gray-300 rounded-lg"
    />
    <button onClick={copyPassword} className='bg-blue-800 text-white p-2 mx-2 rounded-md hover:bg-blue-600'>Copy</button>
  </div>
</div>


      <div className="flex text-sm gap-x-2 mx-5">
        {/* for length */}
        <div className='flex items-center gap-x-2 '>
          <input
            type="range"
            min={6}
            max={50}
            value={length}
            className='cursor-pointer '
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label className='text-white'>Length : {length}</label>
        </div>
        {/* for number */}
        <div className='flex items-center gap-x-2 mx-5'>
          <input
            type="checkbox"
            checked={numberAllowed}
            id='numberInput'
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label className='text-white' htmlFor='numberInput'>Numbers</label>
        </div>
        {/* for characters */}
        <div className='flex items-center gap-x-2'>
          <input
            type="checkbox"
            checked={charAllowed}
            id='characterInput'
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label className='text-white' htmlFor='characterInput'>Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
