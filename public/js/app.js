getWeather = (address) => {
  if (!address) {
    messageOne.classList.add('error');
    return (messageOne.textContent = 'Provide the Location!');
  }
  fetch(`/weather?address=${encodeURIComponent(address)}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.classList.add('error');
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = `Location: ${data[0].location}`;
        messageThree.textContent = `Local Time: ${data[0].forecast.localTime}`;
        messageTwo.textContent = `Forecast: Here's tempreture is ${data[0].forecast.actualTemp} but it feels like ${data[0].forecast.feelLikeTemp} and having Humidity ${data[0].forecast.humidity} `;
      }
    });
  });
};

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  messageOne.classList.remove('error');
  messageOne.textContent = 'Searching...';
  messageTwo.textContent = '';
  messageThree.textContent = '';
  getWeather(search.value);
});
