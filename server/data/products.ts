import { Product } from "../types/Product";

export const products: Product[] = [
  {
    id: 1,
    name: "Item 1",
    price: 122,
    category: {
      id: 1,
      name: "Clothes",
      image: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
    },
  },
  {
    id: 2,
    name: "Item 2",
    price: 333,
    category: {
      id: 2,
      name: "Books",
      image: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
    },
  },
  {
    id: 3,
    name: "Item 3",
    price: 432,
    category: {
      id: 3,
      name: "Others",
      image: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
    },
  },
];
