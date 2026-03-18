import NavigationBar from './components/Navbar/Navbar';
import AutoControlledVideo from './components/AutoControlledVideo/AutoControlledVideo';

function App() {
  return (
    // min-vh-100 ensures the background color stretches the full height of the screen
    <div className="min-vh-100 bg-dark text-light d-flex flex-column">
      {/* 1. The Navigation */}
      <NavigationBar />

      {/* 2. The Main Content Area */}
      <main className="flex-grow-1">
        <AutoControlledVideo />
      </main>
    </div>
  );
}

export default App;