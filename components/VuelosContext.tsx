import React, { createContext, useContext, useState, useEffect } from 'react';

export type Vuelo = {
  id: number;
  origen: string;
  destino: string;
  horaSalidaUTC: string;
  horaLlegadaUTC: string;
  aerolinea: string;
  avion: string;
  tipoVuelo: string;
  nombreTripulante: string;
};

type VuelosContextType = {
  vuelos: Vuelo[];
  setVuelos: React.Dispatch<React.SetStateAction<Vuelo[]>>;
  loading: boolean;
  error: string | null;
  retry: () => void;
  rutasSeleccionadas: Vuelo[];
  setRutasSeleccionadas: React.Dispatch<React.SetStateAction<Vuelo[]>>;
  eliminarRuta: (id: number) => void;
};

const VuelosContext = createContext<VuelosContextType | null>(null);

export const VuelosProvider = ({ children }: { children: React.ReactNode }) => {
  const [vuelos, setVuelos] = useState<Vuelo[]>([]);
  const [rutasSeleccionadas, setRutasSeleccionadas] = useState<Vuelo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const eliminarRuta = (id: number) => {
  setVuelos(prev =>
    prev.map(v =>
      v.id === id && v.nombreTripulante === 'Bugs Bunny'
        ? { ...v, nombreTripulante: '' }
        : v
    )
  );
};


  const cargarVuelos = () => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    fetch('http://192.168.87.22:3000/vuelos', { signal: controller.signal })

      .then((res) => {
        if (!res.ok) throw new Error('Respuesta no válida del servidor');
        return res.json();
      })
      .then((data) => setVuelos(data))
      .catch(() => setError('No se pudo cargar los vuelos. Verifica tu conexión.'))
      .finally(() => {
        clearTimeout(timeoutId);
        setLoading(false);
      });
  };

  useEffect(cargarVuelos, []);

  return (
    <VuelosContext.Provider
      value={{
        vuelos,
        setVuelos,
        loading,
        error,
        retry: cargarVuelos,
        rutasSeleccionadas,
        setRutasSeleccionadas,
        eliminarRuta
      }}
    >
      {children}
    </VuelosContext.Provider>
  );
};

export const useVuelos = () => {
  const context = useContext(VuelosContext);
  if (!context) {
    throw new Error('useVuelos debe usarse dentro de un VuelosProvider');
  }
  return context;
};

export default VuelosContext;
