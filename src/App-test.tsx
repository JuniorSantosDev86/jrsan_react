import { ThemeProvider } from './features/theme/ThemeProvider'

function App() {
  return (
    <ThemeProvider>
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            Portfolio Test
          </h1>
          <p style={{ fontSize: '1.2rem' }}>
            Se você está vendo isso, o React está funcionando!
          </p>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App