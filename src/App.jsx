import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import backspace from "./assets/backspace.png"

function App() {

  const check = (a) => {
    if (isNumber(a)) {
      return true;
    }
    else if (a == '*' || a == '/' || a == '-' || a == '+') {
      return true;
    }
    else {
      return false;
    }
  }
  const [entered, setEntered] = useState('')
  const [main, setMain] = useState("");
  const inpRef = useRef();


  const handlePercent = ()=>{
    let a = ""
                  if(inpRef.current.textContent == "")
                    {
                      a= main
                    } 
    else{
      a = inpRef.current.textContent.substring(1);
    }
   let b = eval(a+"/100")
  //  console.log(b);
 
   setMain(b+"")

  }
  const handleChange = (e) => {

    let value = e.target.value;
    value = value.replace(/[a-zA-Z]/g, '');
    // value = value.replace(/([/*+-])\1+/g, '$1');
    if (!isNumber(e.target.value[e.target.value.length - 1]) && !isNumber(e.target.value[e.target.value.length - 2])) {
      value = value.substring(0, e.target.value.length - 1)
    }
    value = value.replace(/^[/*+-0]/, '');
    value = value.replace("=", "");
    setMain(value);


  }

  function isAlphabet(char) {
    let charCode = char.charCodeAt(0);
    return (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122);
  }
  function isNumber(char) {
    return /^\d$/.test(char);
  }

  const handleClick = (e) => {
    // console.log(e.currentTarget.textContent);
    let v = e.currentTarget.textContent
    if (main.length == 0) {
      if (!isNumber(v) || v == '0') {
        v = ''
      }

    }
    else if (main.length == 27) {
      v = ''
    }
    else{
      if(!isNumber(main[main.length-1]) && !isNumber(v))
        {
          v = ''
        }
    }
    setMain(main + v)

  }

  return (
    <>
      <div className='outerDiv'>
        <div className='calci'>
          <div className='inputField'>
            <input type="text" value={main} onChange={handleChange} className='mainText' onKeyUp={(e) => {
              if (check(e.key)) { setEntered(e.key) }

            }} onBlur={(e) => e.target.focus()} autoFocus inputMode="none" maxLength={27} />
            <p ref={inpRef} className='output'>{main.length > 0 && <span>= </span>}{isNumber(main[main.length - 1]) ? eval(main) : eval(main.substring(0, main.length - 1))}</p>



          </div>
          <div className="button">
            <div className="numberBtn">
              <div className="num">

                <button className="BtnOfNum" id="clear" onClick={() => {setMain("") }}>C</button>
                <button className="BtnOfNum" id="root" onClick={() => {
                  let a = ""
                  if(inpRef.current.textContent == "")
                    {
                      a= main
                    } 
                    else{
                      a = inpRef.current.textContent.substring(1);
                    }                  let b = a**(1/2);
                  setMain(b+"")
                }}>√</button>
                <button className="BtnOfNum" id="percent" onClick={() => {handlePercent()}}>%</button>

                <button className="BtnOfNum" onClick={handleClick}>9</button>
                <button className="BtnOfNum" onClick={handleClick}>8</button>
                <button className="BtnOfNum" onClick={handleClick}>7</button>
                <button className="BtnOfNum" onClick={handleClick}>6</button>
                <button className="BtnOfNum" onClick={handleClick}>5</button>
                <button className="BtnOfNum" onClick={handleClick}>4</button>
                <button className="BtnOfNum" onClick={handleClick}>3</button>
                <button className="BtnOfNum" onClick={handleClick}>2</button>
                <button className="BtnOfNum" onClick={handleClick}>1</button>
                <button className="BtnOfNum" onClick={handleClick}>.</button>
                <button className="BtnOfNum" onClick={handleClick}>0</button>
                <button className="BtnOfNum" onClick={()=>{setMain(main.substring(0,main.length-1))}}><img src={backspace}></img></button>
              </div>

            </div>
            <div className="operator">
              <div className='plusMinus'>
                <button className="op" onClick={handleClick}>+</button>
                <button className="op" onClick={handleClick}>-</button>
                <button className="op" onClick={handleClick}>/</button>
                <button className="op" onClick={handleClick}>*</button>
              </div>
              <div className="equal">
                <button onClick={()=>{
                  if(!isNumber(main[main.length-1]))
                    {
                      return
                    }
                    let v = ""
                    if(inpRef.current.textContent != "")
                      {
                        
                        v = inpRef.current.textContent.substring(1)
                      }
                      // inpRef.current.textContent = ''
                  setMain(v)
                }}>=</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
