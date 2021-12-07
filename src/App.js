import Menu from './components/menu'
import HeroPage from './components/heroPage';
import TopTracksSection from './components/topTracksSectionElements/topTracksSection';

import './App.css';

function App() {
  return (
    <div className="App">
      <Menu />
      <HeroPage />
      <TopTracksSection />
    </div>
  );
}

export default App;
