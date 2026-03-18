import Navbar from './components/Navbar/Navbar';
import AutoControlledVideo from './components/AutoControlledVideo/AutoControlledVideo';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 1. The Navigation */}
      <Navbar />

      {/* 2. The Main Content Area */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-400">Lecture 1: Introduction to React</h1>
          <p className="text-gray-400">AI Engagement Monitor: Active</p>
        </div>
      </main>
      <AutoControlledVideo />;
    </div>
  );
}export default App; 
