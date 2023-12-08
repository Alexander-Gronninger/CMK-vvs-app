function createCookie(data) {
  const dataString = JSON.stringify(data);
  console.log("setting cookie");
  // Set a cookie with the JSON string, and set the expiration time to 1 hour
  document.cookie = `GF2Data=${encodeURIComponent(dataString)}; max-age=3600`;
}

function getCookie(name) {
  console.log("getting cookie");
  const cookies = document?.cookie?.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

export { createCookie, getCookie };
