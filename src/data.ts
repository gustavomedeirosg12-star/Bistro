import { Product } from './types';

export const CATEGORIES = ['Todos', 'Pratos Especiais', 'Acompanhamentos', 'Executivos', 'Molhos', 'Bebidas'];

export const PRODUCTS: Product[] = [
  // PRATOS ESPECIAIS
  { id: 'pe1', name: 'Risoto de Tomate Seco', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'pe2', name: 'Risoto de Cogumelos', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'pe3', name: 'Risoto de Alho Poró', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'pe4', name: 'Risoto de Calabresa', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'pe5', name: 'Risoto Primavera', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'pe6', name: 'Risoto de Filé Mignon', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'pe7', name: 'Yakissoba', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'pe8', name: 'Lasanha Vegana', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'pe9', name: 'Parmegiana Vegana', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'pe10', name: 'Bobó Vegetariano', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1548943487-a2e4f43b4850?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'pe11', name: 'Moqueca de Banana da Terra', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1548943487-a2e4f43b4850?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'pe12', name: 'Moqueca de Berinjela', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1548943487-a2e4f43b4850?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'pe13', name: 'Guacamole', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1528768041982-5a2106721107?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'pe14', name: 'Quibe Vegano', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'pe15', name: 'Moqueca de Peixe', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1548943487-a2e4f43b4850?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'pe16', name: 'Bife Acebolado Vegano', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'pe17', name: 'Caponata de Berinjela', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'pe18', name: 'Ratatouille', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'pe19', name: 'Hambúrguer de Berinjela', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'pe20', name: 'Hambúrguer Bovino', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'pe21', name: 'Sanduíche de Costela', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1619881589316-56c7f9e6b587?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'pe22', name: 'Pastéis', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'pe23', name: 'Bife Ancho', description: 'Prato Especial', price: 0, category: 'Pratos Especiais', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800', isVisible: true },

  // ACOMPANHAMENTOS
  { id: 'ac1', name: 'Arroz Branco', description: 'Acompanhamento', price: 0, category: 'Acompanhamentos', image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ac2', name: 'Arroz Integral', description: 'Acompanhamento', price: 0, category: 'Acompanhamentos', image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ac3', name: 'Arroz de Brócolis', description: 'Acompanhamento', price: 0, category: 'Acompanhamentos', image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ac4', name: 'Feijão Carioca', description: 'Acompanhamento', price: 0, category: 'Acompanhamentos', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ac5', name: 'Feijão Preto', description: 'Acompanhamento', price: 0, category: 'Acompanhamentos', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ac6', name: 'Farofa de Bacon', description: 'Acompanhamento', price: 0, category: 'Acompanhamentos', image: 'https://images.unsplash.com/photo-1625938146369-adc83368bda7?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ac7', name: 'Farofa de Ovos', description: 'Acompanhamento', price: 0, category: 'Acompanhamentos', image: 'https://images.unsplash.com/photo-1625938146369-adc83368bda7?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ac8', name: 'Farofa de Banana', description: 'Acompanhamento', price: 0, category: 'Acompanhamentos', image: 'https://images.unsplash.com/photo-1625938146369-adc83368bda7?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ac9', name: 'Salada Verde', description: 'Alface e rúcula', price: 0, category: 'Acompanhamentos', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ac10', name: 'Salada Mista', description: '3 tipos de legumes variada em alface, cenoura, tomate, repolho, beterraba, pepino, brócolis...', price: 0, category: 'Acompanhamentos', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ac11', name: 'Vinagrete', description: 'Acompanhamento', price: 0, category: 'Acompanhamentos', image: 'https://images.unsplash.com/photo-1528768041982-5a2106721107?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ac12', name: 'Batata Chips', description: 'Acompanhamento', price: 0, category: 'Acompanhamentos', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ac13', name: 'Purê de Batata', description: 'Acompanhamento', price: 0, category: 'Acompanhamentos', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ac14', name: 'Arroz Carreteiro', description: 'Acompanhamento', price: 0, category: 'Acompanhamentos', image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ac15', name: 'Feijão Tropeiro', description: 'Acompanhamento', price: 0, category: 'Acompanhamentos', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ac16', name: 'Salada de Batata', description: 'Acompanhamento', price: 0, category: 'Acompanhamentos', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ac17', name: 'Mandioca Cozida', description: 'Acompanhamento', price: 0, category: 'Acompanhamentos', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=800', isVisible: true },

  // EXECUTIVOS
  { id: 'ex1', name: 'Frango Grelhado (Segunda)', description: 'Proteína com 3 acompanhamentos', price: 0, category: 'Executivos', image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ex2', name: 'Bife a Cavalo (Segunda)', description: 'Proteína com 3 acompanhamentos', price: 0, category: 'Executivos', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ex3', name: 'Picadinho de Carne com Legumes (Terça)', description: 'Proteína com 3 acompanhamentos', price: 0, category: 'Executivos', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ex4', name: 'Escalope de Filé Mignon (Terça)', description: 'Proteína com 3 acompanhamentos', price: 0, category: 'Executivos', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ex5', name: 'Rabada (Quarta)', description: 'Proteína com 3 acompanhamentos', price: 0, category: 'Executivos', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ex6', name: 'Parmegiana de Carne (Quarta)', description: 'Proteína com 3 acompanhamentos', price: 0, category: 'Executivos', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ex7', name: 'Parmegiana de Frango (Quinta)', description: 'Proteína com 3 acompanhamentos', price: 0, category: 'Executivos', image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ex8', name: 'Bife de Carne (Quinta)', description: 'Proteína com 3 acompanhamentos', price: 0, category: 'Executivos', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ex9', name: 'Frango Grelhado (Quinta)', description: 'Proteína com 3 acompanhamentos', price: 0, category: 'Executivos', image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ex10', name: 'Feijoada (Sexta)', description: 'Proteína com 3 acompanhamentos', price: 0, category: 'Executivos', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ex11', name: 'Bife de Carne (Sexta)', description: 'Proteína com 3 acompanhamentos', price: 0, category: 'Executivos', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ex12', name: 'Pernil Assado (Sexta)', description: 'Proteína com 3 acompanhamentos', price: 0, category: 'Executivos', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ex13', name: 'Estrogonofe de Frango (Sábado)', description: 'Proteína com 3 acompanhamentos', price: 0, category: 'Executivos', image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ex14', name: 'Carne de Sol com Mandioca (Sábado)', description: 'Proteína com 3 acompanhamentos', price: 0, category: 'Executivos', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'ex15', name: 'Churrasco (Domingo)', description: 'Proteína com 3 acompanhamentos', price: 0, category: 'Executivos', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800', isVisible: true },

  // MOLHOS
  { id: 'mo1', name: 'Molho Madeira', description: 'Adicional', price: 0, category: 'Molhos', image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'mo2', name: 'Molho Chimichurri', description: 'Adicional', price: 0, category: 'Molhos', image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'mo3', name: 'Molho de Ervas', description: 'Adicional', price: 0, category: 'Molhos', image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&q=80&w=800', isVisible: true },

  // BEBIDAS
  { id: 'be1', name: 'Suco de Morango', description: 'Natural', price: 0, category: 'Bebidas', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'be2', name: 'Suco de Laranja', description: 'Natural', price: 0, category: 'Bebidas', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'be3', name: 'Limonada Suíça', description: 'Natural', price: 0, category: 'Bebidas', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'be4', name: 'Suco de Maracujá', description: 'Natural', price: 0, category: 'Bebidas', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'be5', name: 'Coca-Cola', description: 'Lata', price: 0, category: 'Bebidas', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'be6', name: 'Fanta Laranja', description: 'Lata', price: 0, category: 'Bebidas', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800', isVisible: true },
  { id: 'be7', name: 'Guaraná Antarctica', description: 'Lata', price: 0, category: 'Bebidas', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800', isVisible: true },
];

