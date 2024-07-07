export const getQuotes = async () => {
  try {
    const res = await fetch("https://api.breakingbadquotes.xyz/v1/quotes")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        return data[0];
      });
    return res;
  } catch (error) {
    console.error("Error fetching quotes: ", error);
    throw error;
  }
};
