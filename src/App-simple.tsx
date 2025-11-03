function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'Inter, Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <header style={{
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          JS Portfolio
        </div>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <a href="#home" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="#portfolio" style={{ color: 'white', textDecoration: 'none' }}>Portfolio</a>
          <a href="#about" style={{ color: 'white', textDecoration: 'none' }}>Sobre</a>
          <a href="#services" style={{ color: 'white', textDecoration: 'none' }}>Serviços</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 2rem'
      }}>
        <div style={{ maxWidth: '800px' }}>
          {/* Profile Image */}
          <div style={{
            width: '120px',
            height: '120px',
            margin: '0 auto 2rem',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            border: '3px solid rgba(255,255,255,0.2)'
          }}>
            JS
          </div>

          {/* Content */}
          <p style={{
            fontSize: '0.9rem',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '1rem',
            opacity: 0.9
          }}>
            Olá, eu sou
          </p>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            lineHeight: '1.2'
          }}>
            Desenvolvedor Flutter & Designer
          </h1>

          <p style={{
            fontSize: '1.3rem',
            marginBottom: '1rem',
            opacity: 0.9,
            fontWeight: '500'
          }}>
            Criando experiências digitais incríveis
          </p>

          <p style={{
            fontSize: '1.1rem',
            marginBottom: '2.5rem',
            opacity: 0.8,
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 2.5rem'
          }}>
            Especialista em desenvolvimento mobile com Flutter e design gráfico. 
            Transformo ideias em aplicativos funcionais e interfaces atrativas.
          </p>

          {/* CTA Button */}
          <button style={{
            background: 'white',
            color: '#1f2937',
            padding: '1rem 2rem',
            borderRadius: '8px',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
          }} 
          onMouseOver={(e) => {
            const target = e.currentTarget as HTMLButtonElement;
            target.style.transform = 'translateY(-2px)';
            target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
          }}
          onMouseOut={(e) => {
            const target = e.currentTarget as HTMLButtonElement;
            target.style.transform = 'translateY(0)';
            target.style.boxShadow = '0 4px 14px rgba(0,0,0,0.2)';
          }}>
            Meus Serviços
          </button>

          {/* Decorative dots */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '3rem'
          }}>
            {[0, 1, 2].map(i => (
              <div
                key={i}
                style={{
                  width: '8px',
                  height: '8px',
                  background: 'white',
                  borderRadius: '50%',
                  opacity: 0.6,
                  animation: `bounce 2s ease-in-out infinite ${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Simple Portfolio Section */}
      <section style={{
        padding: '4rem 2rem',
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', fontWeight: 'bold' }}>
            Portfolio
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '2rem',
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{
                  width: '100%',
                  height: '200px',
                  background: `linear-gradient(135deg, hsl(${i * 60}, 70%, 60%), hsl(${i * 60 + 30}, 70%, 50%))`,
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}></div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                  Projeto {i}
                </h3>
                <p style={{ opacity: 0.8 }}>
                  Descrição do projeto desenvolvido com tecnologias modernas.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '2rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        opacity: 0.8
      }}>
        <p>© 2024 JS Portfolio. Todos os direitos reservados.</p>
      </footer>

      {/* Add bounce animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-6px); }
            60% { transform: translateY(-3px); }
          }
        `
      }} />
    </div>
  )
}

export default App
