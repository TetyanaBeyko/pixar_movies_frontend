const fetchData = (path: string) => {
  const data = fetch(path)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("HTTP-Error:", error);
    });

  return data;
};

export default fetchData;
