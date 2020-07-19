const animals = [
  { id: "animal", group: -1, label: "Animals", level: 0 },
  { id: "mammal", group: 0, label: "Mammals", level: 1 },
  { id: "dog", group: 0, label: "Dogs", level: 2 },
  { id: "cat", group: 0, label: "Cats", level: 2 },
  { id: "fox", group: 0, label: "Foxes", level: 2 },
  { id: "elk", group: 0, label: "Elk", level: 2 },
  { id: "insect", group: 1, label: "Insects", level: 1 },
  { id: "ant", group: 1, label: "Ants", level: 2 },
  { id: "bee", group: 1, label: "Bees", level: 2 },
  { id: "fish", group: 2, label: "Fish", level: 1 },
  { id: "carp", group: 2, label: "Carp", level: 2 },
  { id: "pike", group: 2, label: "Pikes", level: 2 },
  { id: "bird", group: 4, label: "Bird", level: 1 },
  { id: "magpie", group: 4, label: "Magpies", level: 2 },
  { id: "cockatoo", group: 4, label: "Cockatoos", level: 2 },
  { id: "hawk", group: 4, label: "Hawks", level: 2 },
];

const links = [
  { target: "animal", source: "mammal", strength: 0.030 },
  { target: "animal", source: "insect", strength: 0.030 },
  { target: "animal", source: "fish", strength: 0.030 },
  { target: "animal", source: "bird", strength: 0.030 },
  { target: "mammal", source: "dog", strength: 0.07 },
  { target: "mammal", source: "cat", strength: 0.07 },
  { target: "mammal", source: "fox", strength: 0.07 },
  { target: "mammal", source: "elk", strength: 0.07 },
  { target: "insect", source: "ant", strength: 0.07 },
  { target: "insect", source: "bee", strength: 0.07 },
  { target: "fish", source: "carp", strength: 0.07},
  { target: "fish", source: "pike", strength: 0.07 },
  { target: "magpie", source: "bird", strength: 0.07 },
  { target: "cockatoo", source: "bird", strength: 0.07 },
  { target: "hawk", source: "bird", strength: 0.07 },
  
]

export { animals, links };