async function findPDF() {
  try {
    const response = await fetch('myfile/');
    const text = await response.text();
    const parser = new DOMParser();
    const html = parser.parseFromString(text, 'text/html');
    const links = html.querySelectorAll('a');
    for (let link of links) {
      if (link.href.endsWith('.pdf')) return 'myfile/' + link.textContent;
    }
  } catch (e) {
    console.error("Could not find PDF:", e);
  }
  return null;
}

async function loadPDF(pdfPath) {
  const flipbook = $('#flipbook');
  flipbook.html('');

  // Use the built-in browser renderer via <embed>
  const embed = document.createElement('embed');
  embed.src = pdfPath + '#view=FitH';
  embed.type = 'application/pdf';
  embed.style.width = '100%';
  embed.style.height = '100%';
  embed.style.border = 'none';
  embed.style.borderRadius = '12px';
  
  // Create 1-page placeholder and use flip effect
  const pageDiv = document.createElement('div');
  pageDiv.classList.add('page');
  pageDiv.appendChild(embed);
  flipbook.append(pageDiv);

  flipbook.turn({
    width: 900,
    height: 600,
    autoCenter: true,
    gradients: true,
    duration: 1000
  });

  $('#prevBtn').click(() => flipbook.turn('previous'));
  $('#nextBtn').click(() => flipbook.turn('next'));
}

(async () => {
  const pdf = 'myfile/book.pdf';

  if (pdf) loadPDF(pdf);
  else alert("Put a PDF file inside the 'myfile' folder first.");
})();
