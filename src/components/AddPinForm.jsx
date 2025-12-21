import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AddPinForm() {
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#fef3c7'); 
  const [isSending, setIsSending] = useState(false);

  const colors = [
    { name: 'Yellow', hex: '#fef3c7' },
    { name: 'Blue', hex: '#dbeafe' },
    { name: 'Green', hex: '#dcfce7' },
    { name: 'Pink', hex: '#fce7f3' },
    { name: 'Purple', hex: '#f3e8ff' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setIsSending(true);
    
    const { error } = await supabase
      .from('pins')
      .insert([{ content, color_hex: color, author_name: 'Guest' }]);

    if (!error) {
      setContent('');
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <textarea
        className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-gray-200 resize-none"
        placeholder="Type a vibe..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-2">
          {colors.map((c) => (
            <button key={c.hex} type="button" onClick={() => setColor(c.hex)}
              className={`w-6 h-6 rounded-full border-2 ${color === c.hex ? 'border-black' : 'border-transparent'}`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
        <button type="submit" disabled={isSending} className="px-6 py-2 bg-black text-white rounded-full">
          {isSending ? '...' : 'Pin It'}
        </button>
      </div>
    </form>
  );
}