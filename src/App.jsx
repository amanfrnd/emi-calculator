import { useState } from 'react'
import './App.css'
import EMICalculate from './component/EMICalculator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <EMICalculate />
    </>
  )
}

export default App
