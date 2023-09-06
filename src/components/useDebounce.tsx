import { useState, useEffect } from 'react';

//Implementación de un hook personalizado
//se utiliza para retrasar la actualización de un valor de estado durante un cierto período 
//de tiempo (el "retraso" o "delay" especificado) después de que el valor cambia

function useDebounce(value:any, delay:number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;