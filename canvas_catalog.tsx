import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, Filter, ChevronDown } from 'lucide-react';

export default function CatalogoDiba() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [sortBy, setSortBy] = useState('popular');

  const products = [
    { id: 1, name: 'Colar Dourado Elegante', category: 'colares', price: 89.90, image: '✨', popular: true },
    { id: 2, name: 'Brinco Pérola Sofisticado', category: 'brincos', price: 64.90, image: '💎', popular: true },
    { id: 3, name: 'Anel Cristal Premium', category: 'anéis', price: 54.90, image: '💍', popular: false },
    { id: 4, name: 'Pulseira Corrente Ouro', category: 'pulseiras', price: 79.90, image: '🔗', popular: true },
    { id: 5, name: 'Colar Pingente Coração', category: 'colares', price: 74.90, image: '❤️', popular: true },
    { id: 6, name: 'Brinco Argola Dourada', category: 'brincos', price: 49.90, image: '⭕', popular: false },
    { id: 7, name: 'Anel Ajustável Florido', category: 'anéis', price: 59.90, image: '🌸', popular: true },
    { id: 8, name: 'Pulseira Infinito Prata', category: 'pulseiras', price: 69.90, image: '∞', popular: false },
    { id: 9, name: 'Colar Grosso Texturizado', category: 'colares', price: 99.90, image: '⛓️', popular: true },
    { id: 10, name: 'Brinco Borboleta Cristal', category: 'brincos', price: 59.90, image: '🦋', popular: false },
    { id: 11, name: 'Anel Duplo Versátil', category: 'anéis', price: 69.90, image: '👑', popular: true },
    { id: 12, name: 'Pulseira Miçangas Premium', category: 'pulseiras', price: 54.90, image: '📿', popular: false },
  ];

  const categories = [
    { id: 'all', name: 'Todas as Joias' },
    { id: 'colares', name: 'Colares' },
    { id: 'brincos', name: 'Brincos' },
    { id: 'anéis', name: 'Anéis' },
    { id: 'pulseiras', name: 'Pulseiras' },
  ];

  let filtered = products.filter(p => {
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'popular') {
    filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
  }

  const toggleWishlist = (id) => {
    setWishlist(wishlist.includes(id) ? wishlist.filter(w => w !== id) : [...wishlist, id]);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Premium */}
      <div className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-5xl font-black tracking-wide">SEMI JOIAS</h1>
              <p className="text-yellow-300 font-bold text-lg">DIBA</p>
            </div>
            <div className="text-right">
              <p className="text-gray-300 text-sm">Elegância & Estilo</p>
              <p className="text-yellow-300 font-semibold">Qualidade Premium</p>
            </div>
          </div>
          
          {/* Search e Filtros */}
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1 min-w-64 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar joias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-yellow-300 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-gray-900 border border-yellow-300 text-white rounded cursor-pointer hover:bg-gray-800"
            >
              <option value="popular">Populares</option>
              <option value="price-low">Menor Preço</option>
              <option value="price-high">Maior Preço</option>
            </select>
            <div className="flex items-center gap-2 bg-yellow-300 text-black px-4 py-3 rounded font-bold">
              <ShoppingCart size={20} />
              <span>{cart.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Sidebar Categorias */}
          <div className="w-56 hidden lg:block">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-6">
                <Filter size={20} className="text-yellow-500" />
                <h3 className="font-bold text-lg text-gray-900">Categorias</h3>
              </div>
              <div className="space-y-3">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                      selectedCategory === cat.id
                        ? 'bg-yellow-300 text-black'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid de Produtos */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600 font-medium">
                {filtered.length} {filtered.length === 1 ? 'joia encontrada' : 'joias encontradas'}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-16 text-center">
                <p className="text-gray-500 text-xl">Nenhuma joia encontrada</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
                  >
                    {/* Imagem/Emoji */}
                    <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 p-8 text-center text-6xl h-48 flex items-center justify-center">
                      <span>{product.image}</span>
                      {product.popular && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          POPULAR
                        </div>
                      )}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition"
                      >
                        <Heart
                          size={20}
                          className={wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                        />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-3">{product.name}</h3>

                      <div className="flex justify-between items-center mb-4">
                        <span className="text-3xl font-black text-yellow-500">R$ {product.price.toFixed(2)}</span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => addToCart(product)}
                          className="flex-1 bg-black text-white py-3 rounded font-bold hover:bg-gray-900 transition"
                        >
                          Adicionar
                        </button>
                        <button className="flex-1 border-2 border-black text-black py-3 rounded font-bold hover:bg-gray-50 transition">
                          Detalhes
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-yellow-300 mb-2">SEMI JOIAS DIBA</h2>
          <p className="text-gray-400 mb-6">Qualidade, elegância e estilo em cada peça</p>
          <div className="flex justify-center gap-6 mb-6 text-sm text-gray-400">
            <span>📞 (11) 99999-9999</span>
            <span>📧 contato@diba.com.br</span>
            <span>📍 São Paulo - SP</span>
          </div>
          <p className="text-gray-600">© 2024 Semi Joias Diba. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}