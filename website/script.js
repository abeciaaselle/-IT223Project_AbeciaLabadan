let prevContainer = document.querySelector('.products-preview');
let previewBox = prevContainer.querySelectorAll('.preview');

document.querySelectorAll('.products-container2 .products').forEach(product => {
  let image = product.querySelector('img'); // Get the image element within the product container
  image.onclick = () => {
    prevContainer.style.display = 'flex';
    let name = product.getAttribute('data-name');
    previewBox.forEach(preview => {
      let target = preview.getAttribute('data-target');
      if (name === target) {
        preview.classList.add('active');
      } else {
        preview.classList.remove('active'); // Remove 'active' class from other previews
      }
    });
  };
});

previewBox.forEach(close => {
  close.querySelector('.bi-x').onclick = () => {
    close.classList.remove('active');
    prevContainer.style.display = 'none';
  };
});




