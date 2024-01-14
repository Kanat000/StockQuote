import appStyle from './app.module.scss'
import StockPages from "./companents/StockPages.tsx";

function App() {
  return (
    <div className={appStyle.container}>
        <StockPages />
    </div>
  )
}

export default App
