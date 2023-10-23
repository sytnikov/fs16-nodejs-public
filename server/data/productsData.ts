import { Product } from "../types/Product";

export const productsData: Product[] = [
  {
    id: 1,
    name: "Item 1",
    price: 122,
    category: {
      id: 1,
      name: "Clothes",
      images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
    },
  },
  {
    id: 2,
    name: "Item 2",
    price: 333,
    category: {
      id: 2,
      name: "Books",
      images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
    },
  },
  {
    id: 3,
    name: "Item 3",
    price: 432,
    category: {
      id: 3,
      name: "Others",
      images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
    },
  },
];
