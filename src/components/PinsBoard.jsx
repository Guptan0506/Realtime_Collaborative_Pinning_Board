import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function PinsBoard() {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    // 1. Initial Load
    const fetchPins = async () => {
      let { data } = await supabase.from('pins').select('*').order('created_at', { ascending: false });
      setPins(data || []);
    };
    fetchPins();

    // 2. Real-time Subscription
    const channel = supabase
      .channel('realtime-pins')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pins' }, 
        (payload) => {
          setPins((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <div className="p-5 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {pins.map((pin) => (
        <div key={pin.id} 
          className="break-inside-avoid p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:-translate-y-1"
          style={{ backgroundColor: pin.color_hex }}
        >
          <p className="text-gray-800">{pin.content}</p>
          <div className="mt-4 text-[10px] uppercase tracking-widest text-gray-500">
            By {pin.author_name} • {new Date(pin.created_at).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}