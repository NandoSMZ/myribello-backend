export const products = [
  // Hamburguesas
  {
    name: 'Americana',
    description:
      'Carne Angus, queso americano, tocineta, pepinillos, lechuga crespa, tomate, cebolla morada, salsa americana, salsa ranch, acompañada de papas a la francesa',
    image: 'ham1.jpg',
    price: 22000,
    categoryId: 1,
  },
  {
    name: 'Argentina',
    description:
      'Carne Angus, queso americano, tocineta, chorizo argentino, salsa BBQ, lechuga Batavia, tomate, acompañada de papas a la francesa',
    image: 'ham2.jpg',
    price: 24000,
    categoryId: 1,
  },
  {
    name: 'Western Bacon',
    description:
      'Doble carne Angus, queso americano, tocineta, pepinillos, aros de cebolla apanados, salsa BBQ, salsa Ranch, acompañada con papas a la francesa',
    image: 'ham3.jpg',
    price: 28000,
    categoryId: 1,
  },
  {
    name: 'Magistral',
    description:
      'Carne Angus. queso americano. tocineta, carne de res ahumada terminada en cocción lenta, con cerveza, cebolla crispy, lechuga crespa, tomate, salsas de la casa, acompañada de papas a la francesa.',
    image: 'ham4.jpg',
    price: 28000,
    categoryId: 1,
  },
  {
    name: 'Gorrino',
    description:
      'Carne Angus, queso americano, tocineta, pepinillos, cebolla crispy, lechuga crespa, tomate, carne de cerdo Ahumada terminada en cocción lenta con cerveza roja, acompañada de papas a la francesa.',
    image: 'ham5.jpg',
    price: 28000,
    categoryId: 1,
  },

  // Pizzas
  {
    name: 'Hawaiana',
    description: 'Jamón, piña melada, parmesano.',
    image: 'default.jpg',
    price: 24000,
    categoryId: 2,
  },
  {
    name: 'Pollo y champiñones',
    description: 'Pollo, champiñones, parmesano.',
    image: 'default.jpg',
    price: 24000,
    categoryId: 2,
  },
  {
    name: 'Margarita',
    description: 'Tomate, albahaca, parmesano.',
    image: 'default.jpg',
    price: 24000,
    categoryId: 2,
  },
  {
    name: 'Pepperoni',
    description: 'Pepperoni, parmesano.',
    image: 'piz4.jpg',
    price: 24000,
    categoryId: 2,
  },
  {
    name: 'De carnes',
    description:
      'Chorizo, salami, tocineta, cabano, pepperoni, maduro, maicitos, pimentón escalibado, parmesano.',
    image: 'default.jpg',
    price: 26000,
    categoryId: 2,
  },
  {
    name: 'Napolitana',
    description:
      'Pollo, tocineta, champiñones, tomate cherry, aceituna, tomate seco, albahaca genovesa, parmesano.',
    image: 'default.jpg',
    price: 26000,
    categoryId: 2,
  },
  {
    name: '4 Quesos',
    description:
      'Queso mozzarella, queso azul., queso cheddar, parmesano, tomate cherry, albahaca.',
    image: 'default.jpg',
    price: 26000,
    categoryId: 2,
  },
  {
    name: 'BBQ',
    description:
      'Costilla desmechada, salsa BBQ, tocineta, pimentón escalibado, maicitos.',
    image: 'default.jpg',
    price: 27000,
    categoryId: 2,
  },
  {
    name: 'Carbonara',
    description: 'Salsa carbonara, tocineta, maicitos, parmesano.',
    image: 'default.jpg',
    price: 26000,
    categoryId: 2,
  },
  {
    name: 'Vegetariana',
    description:
      'Tomate cherry, aceitunas, pimentón escalibado, champiñones, tomate seco, maicitos, parmesano.',
    image: 'piz10.jpg',
    price: 26000,
    categoryId: 2,
  },
  {
    name: 'Boloñesa',
    description: 'Queso mozzarella, carne en salsa boloñesa, parmesano.',
    image: 'default.jpg',
    price: 27000,
    categoryId: 2,
  },
  {
    name: 'Picante Mexicana',
    description:
      'Carne molida, jalapeños, cebolla, pimientos, queso mozzarella.',
    image: 'default.jpg',
    price: 24000,
    categoryId: 2,
  },
  {
    name: 'Italiana',
    description:
      'Tocineta,pepperoni,tomate cherry, pimentón escalibado, parmesano.',
    image: 'piz13.jpg',
    price: 26000,
    categoryId: 2,
  },

  // Sandwiches
  {
    name: 'Ropa vieja',
    description:
      'Pan ciabatta, carne desmechada, queso americano, tomate,lechuga, salsa ranch, salsa BBQ, acompañado con papas a la francesa.',
    image: 'sand1.jpg',
    price: 25000,
    categoryId: 3,
  },
  {
    name: 'BBQ',
    description:
      'Pan ciabatta, cerdo desmechado, salsa BBQ, maicitos, queso americano, lechuga Batavia, salsas de la casa, acompañado con papas a la francesa.',
    image: 'sand2.jpg',
    price: 25000,
    categoryId: 3,
  },
  {
    name: 'Pollo',
    description:
      'Pan ciabatta, pollo en salsa carbonara, queso mozzarella, tocineta, lechuga Batavia, salsa salsas de la casa, acompañado con papas a la francesa.',
    image: 'sand3.jpg',
    price: 25000,
    categoryId: 3,
  },
  {
    name: 'Jamón y cordero',
    description:
      'Pan ciabatta, jamón de cordero, jamón de cerdo, tocineta, queso mozzarella, salsas de la casa, acompañado con papas a las francesas.',
    image: 'default.jpg',
    price: 24000,
    categoryId: 3,
  },
  {
    name: 'Hawaiano',
    description:
      'Pan ciabatta, jamón de cerdo, piña melada, lechuga Batavia, queso mozzarella, acompañado con papas a la francesa.',
    image: 'default.jpg',
    price: 24000,
    categoryId: 3,
  },

  // Lasagna
  {
    name: 'Lasagna de carne',
    description: 'Bolognesa, queso mozzarrella, parmesano.',
    image: 'las1.jpg',
    price: 23000,
    categoryId: 4,
  },
  {
    name: 'Lasagna de pollo',
    description:
      'Pollo en salsa bechamel, champiñones, tocineta, queso mozzarella.',
    image: 'las1.jpg',
    price: 23000,
    categoryId: 4,
  },
  {
    name: 'Lasagna mixta',
    description:
      'Bolognesa, pollo en salsa bechamel, queso mozzarella, tocineta, maduro, maicitos, parmesano.',
    image: 'las3.jpg',
    price: 25000,
    categoryId: 4,
  },

  // Gaseosas
  {
    name: 'Gaseosa personal',
    description: 'Bebida de 350 ml',
    image: 'bev1.jpg',
    price: 4000,
    categoryId: 5,
  },
  {
    name: 'Gaseosa litro',
    description: 'bebida de 1 litro',
    image: 'bev2.jpg',
    price: 8000,
    categoryId: 5,
  },
  {
    name: 'Jugos HiT',
    description: 'Jugo hit personal de 350 ml',
    image: 'bev3.jpg',
    price: 4000,
    categoryId: 5,
  },
  {
    name: 'Botella de agua',
    description: 'Agua Crystal de 500 ml',
    image: 'bev4.jpg',
    price: 3000,
    categoryId: 5,
  },

  // Limonadas
  {
    name: 'Cereza',
    description: 'Limonada natural con cereza fresca.',
    image: 'bev5.jpg',
    price: 12000,
    categoryId: 6,
  },
  {
    name: 'Coco',
    description: 'Limonada natural de Coco.',
    image: 'bev6.jpg',
    price: 12000,
    categoryId: 6,
  },
  {
    name: 'Natural',
    description: 'Limonada natural.',
    image: 'bev7.jpg',
    price: 8000,
    categoryId: 6,
  },

  // Jugos Naturales
  {
    name: 'Jugo en Agua',
    description: 'Naranja, piña y maracuyá',
    image: 'bev8.jpg',
    price: 8000,
    categoryId: 7,
  },
  {
    name: 'Jugo en Leche',
    description: 'Banano, fresa y mora',
    image: 'bev9.jpg',
    price: 12000,
    categoryId: 7,
  },

  // Cervezas
  {
    name: 'Cerveza Corona',
    description: 'Cerveza de 300 ml',
    image: 'bev10.jpg',
    price: 7000,
    categoryId: 8,
  },
  {
    name: 'Cerveza Aguila',
    description: 'Cerveza de 300 ml',
    image: 'bev11.jpg',
    price: 5000,
    categoryId: 8,
  },
  {
    name: 'Cerveza Poker',
    description: 'Cerveza de 300 ml',
    image: 'bev12.jpg',
    price: 5000,
    categoryId: 8,
  },

  // Con Licor
  {
    name: 'Fresa Boom',
    description: 'Fresa Bombombum con Whiskey',
    image: 'cock1.jpg',
    price: 18000,
    categoryId: 9,
  },
  {
    name: 'Miami',
    description: 'Kola, Melón, Ron Blanco',
    image: 'cock2.jpg',
    price: 18000,
    categoryId: 9,
  },

  // Sin Licor
  {
    name: 'Mango Viche',
    description: 'Refrescante Mango Viche sin licor',
    image: 'cock3.jpg',
    price: 15000,
    categoryId: 10,
  },
  {
    name: 'Maracuya',
    description: 'Refrescante Maracuya sin licor',
    image: 'cock4.jpg',
    price: 15000,
    categoryId: 10,
  },
  {
    name: 'Mora Azul',
    description: 'Refrescante Mora Azul sin licor',
    image: 'cock5.jpg',
    price: 15000,
    categoryId: 10,
  },
];
