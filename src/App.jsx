import { ThemeProvider } from './context/ThemeProvider';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Home />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
