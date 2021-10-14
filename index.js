const combinePagination = require("combine-pagination").default;

const modernHats = [
  {
    name: "Baseball Cap",
    popularity: 95,
  },
  {
    name: "Beanie",
    popularity: 50,
  },
  {
    name: "Flat Cap",
    popularity: 20,
  },
];

const oldHats = [
  {
    name: "Top Hat",
    popularity: 85,
  },
  {
    name: "Beret",
    popularity: 15,
  },
  {
    name: "Bowler Hat",
    popularity: 9,
  },
];


function paginate(array, page_size, page_number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}
const getData = (data, page) => {
  const a =  paginate(data, 2, page + 1);
  console.log(a);
  return a;
};

(async () => {
  const combinedGetters = combinePagination({
    getters: [
      (page) => getData(modernHats, page),
      (page) => getData(oldHats, page),
    ],
    sortKey: "popularity",
  });

  const pageOne = await combinedGetters.getNext();
  console.log({pageOne});
  const pageTwo = await combinedGetters.getNext();
  console.log({pageTwo});
})();
