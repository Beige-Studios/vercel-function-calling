const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer 9f593270-7deb-4f44-8f5f-5fb27d315725', 'Content-Type': 'application/json'},
  body: ``
};

fetch('https://api.vapi.ai/assistant', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

  