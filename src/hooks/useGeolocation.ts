import { useState, useCallback } from "react";

interface Position {
  latitude: number;
  longitude: number;
}

export function useGeolocation() {
  const [position, setPosition] = useState<Position | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ latitude, longitude });
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  return { position, error, getLocation };
}
