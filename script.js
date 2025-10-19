$(document).ready(async function() {
  const flipbook = $('#flipbook');

  // Try to load all image files in /myfile/
  const images = [];
  for (let i = 1; i <= 70; i++) { // support up to 50 pages
    const imgPath = `myfile/page${i}.jpg`;
    const res = await fetch(imgPath);
    if (res.ok) images.push(imgPath);
    else break;
  }

  if (images.length === 0) {
    flipbook.html('<p style="padding:40px;">No images found. Please put page1.jpg, page2.jpg, etc. inside myfile/.</p>');
    return;
  }

  // Create pages
  for (const src of images) {
    flipbook.append(`<div class="page"><img src="${src}" draggable="false"></div>`);
  }

  // Initialize Turn.js flipbook
  flipbook.turn({
    width: 900,
    height: 600,
    autoCenter: true,
    gradients: true,
    acceleration: true,
    duration: 1000,
    elevation: 50
  });

  // Button controls
  $('#prevBtn').click(() => flipbook.turn('previous'));
  $('#nextBtn').click(() => flipbook.turn('next'));
});
