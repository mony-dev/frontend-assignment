"use client"

import { useEffect, useState } from 'react';

// Type for each item
type Item = {
  type: 'Fruit' | 'Vegetable';
  name: string;
};

const initialItems: Item[] = [
  { type: 'Fruit', name: 'Apple' },
  { type: 'Vegetable', name: 'Broccoli' },
  { type: 'Vegetable', name: 'Mushroom' },
  { type: 'Fruit', name: 'Banana' },
  { type: 'Vegetable', name: 'Tomato' },
  { type: 'Fruit', name: 'Orange' },
  { type: 'Fruit', name: 'Mango' },
  { type: 'Fruit', name: 'Pineapple' },
  { type: 'Vegetable', name: 'Cucumber' },
  { type: 'Fruit', name: 'Watermelon' },
  { type: 'Vegetable', name: 'Carrot' },
];

export default function Home() {
  const [mainList, setMainList] = useState<Item[]>(initialItems);
  const [fruits, setFruits] = useState<Item[]>([]);
  const [vegetables, setVegetables] = useState<Item[]>([]);
  const timeouts: { [key: string]: NodeJS.Timeout } = {};

  const handleClickMain = (item: Item, index: number) => {
    setMainList((prev) => prev.filter((_, i) => i !== index));
    if (item.type === 'Fruit') setFruits((prev) => [...prev, item]);
    else setVegetables((prev) => [...prev, item]);

    timeouts[item.name] = setTimeout(() => {
      if (item.type === 'Fruit') {
        setFruits((prev) => prev.filter((i) => i.name !== item.name));
      } else {
        setVegetables((prev) => prev.filter((i) => i.name !== item.name));
      }
      setMainList((prev) => [...prev, item]);
    }, 5000);
  };

  const handleClickType = (item: Item, type: 'Fruit' | 'Vegetable') => {
    clearTimeout(timeouts[item.name]);
    if (type === 'Fruit') {
      setFruits((prev) => prev.filter((i) => i.name !== item.name));
    } else {
      setVegetables((prev) => prev.filter((i) => i.name !== item.name));
    }
    setMainList((prev) => [...prev, item]);
  };

  return (
    <main className="flex flex-col items-center p-8 gap-8">
      <h1 className="text-2xl font-bold">Auto Delete Todo List</h1>
      <div className="grid grid-cols-3 gap-6 w-full max-w-5xl">
        <div>
          <div className="flex flex-col gap-2">
            {mainList.map((item, i) => (
              <button
                key={`${item.name}-${i}`}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-black cursor-pointer"
                onClick={() => handleClickMain(item, i)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Fruits</h2>
          <div className="flex flex-col gap-2">
            {fruits.map((item, i) => (
              <button
                key={`${item.name}-fruit-${i}`}
                className="bg-yellow-100 hover:bg-yellow-200 px-4 py-2 rounded text-black cursor-pointer"
                onClick={() => handleClickType(item, 'Fruit')}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Vegetables</h2>
          <div className="flex flex-col gap-2">
            {vegetables.map((item, i) => (
              <button
                key={`${item.name}-veg-${i}`}
                className="bg-green-100 hover:bg-green-200 px-4 py-2 rounded text-black cursor-pointer"
                onClick={() => handleClickType(item, 'Vegetable')}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
