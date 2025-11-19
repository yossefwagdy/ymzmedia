import React from 'react'
import { Canvas } from '@react-three/fiber'
import Layout from './components/Layout'
import Experience from './3d/Experience'

function App() {
  return (
    <Layout>
      <div className="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh' }}>
        <Canvas>
          <Experience />
        </Canvas>
      </div>
    </Layout>
  )
}

export default App
