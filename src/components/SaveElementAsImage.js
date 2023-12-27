////////////////////////////////////////////////////////////////
// for downloading the image
//

function SaveElementAsImage(elementId, filename) {
  console.log("saving...");
  // Get a reference to the element
  const element = document.getElementById(elementId);

  // Create a canvas and get its context
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Set the canvas dimensions to match the element
  canvas.width = element.offsetWidth;
  canvas.height = element.offsetHeight;

  // Draw the element onto the canvas
  context.drawImage(element, 0, 0, canvas.width, canvas.height);

  // Convert the canvas content to a data URL
  const dataURL = canvas.toDataURL();

  // Create a downloadable link
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = filename;

  // Append the link to the DOM
  document.body.appendChild(link);

  // Programmatically click the link to trigger the download
  link.click();

  // Clean up by removing the link
  document.body.removeChild(link);
}
export default SaveElementAsImage;
