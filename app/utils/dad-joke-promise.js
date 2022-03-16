export default async function (searchTerm, signal, newTerm = null) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  if (newTerm === '' || searchTerm === '') {
    throw new Error('Please enter a search term');
  }

  console.log(searchTerm);

  const url = searchTerm
    ? `https://icanhazdadjoke.com/search?term=${newTerm ?? searchTerm}`
    : 'https://icanhazdadjoke.com/';

  return fetch(url, {
    headers: {
      accept: 'application/json',
      'User-Agent': 'ember-demonstration',
    },
    signal,
  });
}
