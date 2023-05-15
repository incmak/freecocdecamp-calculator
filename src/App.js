import { useState } from "react";
import "./styles.css";
const calculatorButtons = [
  { value: "AC", type: "function", id: "clear" },
  { value: "+/-", type: "function" },
  { value: "%", type: "function" },
  { value: "/", type: "operator", id: "divide" },
  { value: "7", type: "number", id: "seven" },
  { value: "8", type: "number", id: "eight" },
  { value: "9", type: "number", id: "nine" },
  { value: "*", type: "operator", id: "multiply" },
  { value: "4", type: "number", id: "four" },
  { value: "5", type: "number", id: "five" },
  { value: "6", type: "number", id: "six" },
  { value: "-", type: "operator", id: "subtract" },
  { value: "1", type: "number", id: "one" },
  { value: "2", type: "number", id: "two" },
  { value: "3", type: "number", id: "three" },
  { value: "+", type: "operator", id: "add" },
  { value: "0", type: "number", id: "zero" },
  { value: ".", type: "number", id: "decimal" },
  { value: "=", type: "operator", id: "equals" },  
]
export default function App() {
  const [display, setDisplay] = useState("0")
  const [prevCalc, setPrevCalc] = useState("")

  const handleClick = (e) => {
    setDisplay(prev => { 
      if(e.target.value === "AC") {
        return "0"
      }
      if(e.target.value === "+/-") {
        return prev * -1
      }
      if(e.target.value === "%") {
        return prev / 100
      }
      if (e.target.value === "=") {
        if(prev === "0") {
          return prev
        }
        setPrevCalc(prev)
        return eval(prev)
      }
      if(e.target.value === ".") {
        if(prev.includes(".")) {
          return prev
        }
        return prev + "."
      }
      if(prev === "0" && e.target.value !== ".") {
        return e.target.value 
      }

      if (prev === "0") { 
        return e.target.value
      }
      const lastChar = prev[prev.length - 1];
      const currentChar = e.target.value;
      if (lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "/") {
        if (currentChar === "+" || currentChar === "-" || currentChar === "*" || currentChar === "/") {
          return prev.slice(0, prev.length - 1) + currentChar;
        }
      }
      return prev + e.target.value
    })
  }

  return (
    <div className="w-[390px] border border-white rounded-xl">
        <div className="display h-[100px] border-b border-white px-5">
          <div className="flex justify-end items-end flex-col  h-full">
            <p className="text-2xl font-bold text-white">{prevCalc}</p>
            <p className="text-4xl font-bold text-white" id="display">{display}</p>
            </div>
          </div>
          <div className="grid gap-5 p-5 grid-cols-4"> 
            {calculatorButtons.map((button, index) => (
              <button type="button"
              key={index}
              value={button.value}
              onClick={handleClick}
              className={`border bg-[#ffffff20] rounded-full w-[68px] h-[68px] flex justify-center items-center border-white text-white text-2xl font-bold ${button.value==="=" ? "col-span-2 w-full" : ""} ${button.type !== "number" ? "bg-[#6BD439]": ""} `}>{button.value}</button>
            ))}
          </div>
    </div>
  );
}
