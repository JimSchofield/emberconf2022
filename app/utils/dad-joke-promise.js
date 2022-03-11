export default async function ({ signal }) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  return fetch('https://icanhazdadjoke.com/', {
    headers: {
      accept: 'application/json',
      'User-Agent': 'ember-demonstration',
    },
    signal,
  });
}
