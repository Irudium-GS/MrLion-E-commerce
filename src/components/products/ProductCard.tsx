import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="product-card group">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          {product.discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded">
              {product.discountPercentage}% OFF
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center mb-2">
            <div className="flex text-gold">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                  className={i < Math.floor(product.rating) ? "" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.ratingCount})</span>
          </div>
          <h3 className="font-medium text-sm mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-xs text-gray-500 mb-2 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <div>
              {product.discountPercentage > 0 ? (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary">
                    ₹{(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                  <span className="text-sm line-through text-gray-400">₹{product.price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="font-semibold text-primary">₹{product.price.toFixed(2)}</span>
              )}
            </div>
            <button 
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;