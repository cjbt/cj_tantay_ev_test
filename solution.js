import _ from 'lodash';

const fullCatalog = [
  {
    id: 1,
    name: 'Software App',
    price: 899.99,
    tags: ['phone', 'application'],
  },
  {
    id: 2,
    name: 'Wireless mouse',
    price: 789.99,
    tags: ['peripheral', 'wireless'],
  }, // 2
  { id: 3, name: 'Software', price: 89.99, tags: ['phone', 'wireless'] }, // 1
  {
    id: 4,
    name: 'Wireless headset',
    price: 79.99,
    tags: ['peripheral', 'wireless'], // 2
  },
  { id: 6, name: 'Laptop mouse', price: 389.99, tags: ['device', 'computer'] },
  { id: 5, name: 'Laptop', price: 489.99, tags: ['device', 'computer'] },
  {
    id: 7,
    name: 'Wireless headset',
    price: 389.99,
    tags: ['phone', 'wireless'], // 2
  },
  { id: 8, name: 'Laptop cooler', price: 789.99, tags: ['misc', 'peripheral'] },
  { id: 9, name: 'Wireless thing', price: 889.99, tags: ['phone', 'wireless'] }, // 1
];

const getFrequency = (item, query) => {
  if (typeof item !== 'object' || typeof query !== 'string') {
    throw new Error('Incorrect arguments');
  }

  let count = 0;

  if (item.name.toLowerCase().includes(query)) {
    count++;
  }

  if (item.tags.some((tag) => tag.includes(query))) {
    count++;
  }

  return count;
};

const solution = (catalog, query) => {
  if (typeof query !== 'string' || !_.isArray(catalog) || !catalog.length)
    return [];

  const lowerCasedQuery = query.toLocaleLowerCase();

  // filter
  const filtered = _.filter(catalog, (item) => {
    return (
      item.name.toLowerCase().includes(lowerCasedQuery) ||
      item.tags.some((tag) => tag.includes(lowerCasedQuery))
    );
  });

  // build hash
  const hash = filtered.reduce((acc, curr) => {
    if (acc[getFrequency(curr, lowerCasedQuery)]) {
      acc[getFrequency(curr, lowerCasedQuery)].push(curr);
    } else {
      acc[getFrequency(curr, lowerCasedQuery)] = [curr];
    }

    return acc;
  }, {});

  // sort
  const sortedByFreq = Object.values(hash).reverse();
  const sortedByPrice = sortedByFreq
    .map((itemSortedByFreq) => _.sortBy(itemSortedByFreq, ['price']))
    .flat();

  return sortedByPrice.map((item) => item.id);
};

solution(fullCatalog, 'wire');

for (let testItem of [
  ['wire', [4, 7, 2, 9, 3]],
  ['wireless', [4, 7, 2, 9, 3]],
  ['soft', [3, 1]],
  ['mouse', [6, 2]],
  ['cooler', [8]],
  ['device', [6, 5]],
  ['app', [1]],
]) {
  const [query, expected] = testItem;
  const assert = solution(fullCatalog, query);

  console.log(_.isEqual(assert, expected));
}
