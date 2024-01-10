/// <reference lib="webworker" />

addEventListener('message', (event) => {
  const inputData = event.data;

  // Do some processing with the received data, replace this with your actual logic
  const processedData = processData(inputData);

  // Send the processed data back to the main thread
  console.log('_processed_data:', processedData);
  postMessage(processedData);
});

function processData(data) {
  if (!Array.isArray(data)) {
    console.error('Input data is not an array.');
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    ...item,
  }));
}
