import { CharacterProvider } from './context/CharacterProvider';
import { NavBar } from './components/NavBar';
import Home from './pages/Home';

export default function App() {
  return (
    <CharacterProvider>
      <NavBar />
      <Home />
    </CharacterProvider>
  );
}
