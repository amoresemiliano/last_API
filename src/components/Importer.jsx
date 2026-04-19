import React from 'react';
import { parseLastAppFiles } from '../utils/dataParser';

export const Importer = ({ onDataImported }) => {
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      try {
        const processedData = await parseLastAppFiles(files);
        onDataImported(processedData);
      } catch (error) {
        console.error("Error procesando archivos:", error);
        alert("Hubo un error con los archivos. Asegúrate de que sean los CSV correctos.");
      }
    }
  };

  return (
    <div className="flex items-center gap-3">
      <input 
        type="file" 
        multiple 
        onChange={handleFileChange} 
        className="hidden" 
        id="lastapp-upload" 
        accept=".csv"
      />
      <label 
        htmlFor="lastapp-upload" 
        className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 text-green-500 px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 group"
      >
        <span className="text-lg group-hover:scale-110 transition-transform">📂</span>
        <span className="text-[10px] font-black uppercase tracking-widest">Importar El Criollo</span>
      </label>
    </div>
  );
};

