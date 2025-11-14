import { DEFAULT_DATA } from './utils/findPeakTime'
import { PeakVisitors } from './components/PeakVisitors'
import './App.css'


function App() {
  return (
    <>
      <PeakVisitors data={DEFAULT_DATA} />
    </>
  )
}

export default App
