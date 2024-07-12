export function shouldFetchData(): boolean {
    const lastFetchTime = localStorage.getItem('lastFetchTime');
    if (!lastFetchTime) {
      localStorage.setItem('lastFetchTime', Date.now().toString());
      return true;
    }
  
    const currentTime = Date.now();
    const fifteenMinutes = 15 * 60 * 1000;
    const timeDifference = currentTime - parseInt(lastFetchTime, 10);
  
    if (timeDifference > fifteenMinutes) {
      localStorage.setItem('lastFetchTime', Date.now().toString());
      return true;
    }
  
    return false;
  }
  