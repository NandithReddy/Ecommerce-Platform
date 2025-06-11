const addToCart = (product, navigate) => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
    return;
  }

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find((item) => item.productId === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ productId: product.id, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};
