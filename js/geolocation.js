function geolocationSupport() {
  // if (navigator.geolocation) {
  //   return true;
  // }
  // return false;
  return "geolocation" in navigator;
}

const defaultOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximunAge: 100000,
};

export function getCurrentPosition(options) {
  if (!geolocationSupport()) {
    throw new Error("There isnt support of geolocation in your browser!");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position.coords);
      },
      () => {
        reject("no hemos podido obtener tu ubicacion");
      },
      options
    );
  });
}

export async function getLatitudAndLongitud(options = defaultOptions) {
  try {
    const { latitude: lat, longitude: long } = await getCurrentPosition(
      options
    );
    return { lat, long, isError: false };
  } catch {
    return { lat: null, long: null, isError: true };
  }
}
