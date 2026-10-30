import { useState } from 'react'
import './Game.css'

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<p style={{ fontSize: '36px', padding: 0, margin: 0 }}>{count}</p>
			<button style={{ fontSize: '36px' }} onClick={() => setCount(count + 1)}>
				Click
			</button>
		</>
	)
}

export default App
