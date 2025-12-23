import { supabase } from './lib/supabaseClient';
import AddPinForm from './components/AddPinForm';
import PinsBoard from './components/PinsBoard';

export default function App() {
    window.supabase = supabase;
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-gray-900">
      <nav className="p-8 text-center">
        <h1 className="text-3xl font-black italic tracking-tighter">NAVYA.SPACE / COLLAB</h1>
        <p className="text-sm text-gray-400 mt-2">Experimental real-time board</p>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4">
        <AddPinForm />
        <PinsBoard />
      </main>
    </div>
  );
}