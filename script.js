// Your code here.
const items = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

items.addEventListener('mousedown', (e) => {
  isDown = true;
  items.classList.add('active');
  startX = e.pageX - items.offsetLeft;
  scrollLeft = items.scrollLeft;
});

items.addEventListener('mouseleave', () => {
  isDown = false;
  items.classList.remove('active');
});

items.addEventListener('mouseup', () => {
  isDown = false;
  items.classList.remove('active');
});

items.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - items.offsetLeft;
  const walk = (x - startX) * 2; // Adjust the sliding speed here
  items.scrollLeft = scrollLeft - walk;
});

// Disable text selection while dragging
items.addEventListener('selectstart', (e) => {
  e.preventDefault();
});
cy.get('.items')
  .trigger('mousedown', { which: 1, pageX: 493, pageY: 391 })
  .trigger('mousemove', { which: 1, pageX: 271, pageY: 391 })
  .trigger('mouseup')
  .should($items => {
    expect($items[0].scrollLeft).to.be.greaterThan(0);
    expect($items[0].scrollTop).to.equal(0);
    expect($items[0].clientWidth).to.be.lessThan($items[0].scrollWidth);
    expect($items[0].clientHeight).to.be.lessThan($items[0].scrollHeight);
  });
