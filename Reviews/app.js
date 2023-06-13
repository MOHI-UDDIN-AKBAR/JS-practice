const reviews = [
  {
    id: 1,
    name: "susan smith",
    job: "web developer",
    img: "https://www.course-api.com/images/people/person-1.jpeg",
    text: "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
  },
  {
    id: 2,
    name: "anna johnson",
    job: "web designer",
    img: "https://www.course-api.com/images/people/person-2.jpeg",
    text: "Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.",
  },
  {
    id: 3,
    name: "peter jones",
    job: "intern",
    img: "https://www.course-api.com/images/people/person-4.jpeg",
    text: "Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.",
  },
  {
    id: 4,
    name: "bill anderson",
    job: "the boss",
    img: "https://www.course-api.com/images/people/person-3.jpeg",
    text: "Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ",
  },
];

const picture = document.querySelector("img");
const personName = document.querySelector(".name");
const position = document.querySelector(".position");
const description = document.querySelector(".description p");
const leftOrRight = document.querySelectorAll(".prev-or-next-person span");
// const next = document.querySelector(".right");
const random = document.querySelector(".random-person button");

const card = ({ img, name, job, text }) => {
  picture.src = img;
  personName.innerText = name;
  position.innerText = job;
  description.innerText = text;
};

card(reviews[0]);

const indexLocation = () => {
  const name = personName.innerText.toLowerCase();
  const currentLocation = reviews.findIndex(
    (each) => each.name.toLowerCase() == name
  );
  return currentLocation;
};

const handleEventListener = (icon) => {
  const currentPersonLocation = indexLocation();
  if (icon.classList.contains("left")) {
    currentPersonLocation > 0
      ? card(reviews[currentPersonLocation - 1])
      : card(reviews[reviews.length - 1]);
  } else if (icon.classList.contains("right")) {
    currentPersonLocation < reviews.length - 1
      ? card(reviews[currentPersonLocation + 1])
      : card(reviews[0]);
  }
};

Array.from(leftOrRight).forEach((icon) => {
  icon.removeEventListener("click", () => handleEventListener(icon));
  icon.addEventListener("click", () => handleEventListener(icon));
});

const randomPerson = () => {
  const randomIndex = Math.round(Math.random() * reviews.length);

  if (randomIndex < reviews.length && indexLocation() != randomIndex) {
    card(reviews[randomIndex]);
    console.log(randomIndex);
  } else {
    randomPerson();
  }
};

random.removeEventListener("click", () => {
  randomPerson();
});
random.addEventListener("click", () => {
  randomPerson();
});
