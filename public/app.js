//Part 1 & 2

/*I did not understand the conditions for creating a random identifier for each pixel, so I just added
unit for each new object
*/
const btnElement = document.querySelector('.btn')

class Pixel { //The pixel class
  constructor(r, g, b) {
    this.id = 10000000;
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

async function sendRequest(data) { //A func to send ajax request

  const dataObj = {
    id: data.id,
    genes: {
      r: data.r,
      g: data.g,
      b: data.b
    }
  }

  console.log(dataObj)

  const res = await fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(dataObj) //passing data in the request body
  })

  if (!res.ok) {
    console.log('Error') //Check if res has error
  }
}

function createNewPixel(obj1, obj2) { //function to create a new child pixel object
  const randomNum = Math.floor(Math.random() * 3) + 1;
  const secondRandomNum = Math.floor(Math.random() * 3 + 1);
  if (randomNum === 1) {
    if (secondRandomNum === 1) {
      return new Pixel(obj1.r, Math.floor(Math.random() * 255) + 1, Math.floor(Math.random() * 255) + 1)
    }

    else if (secondRandomNum === 2) {
      return new Pixel(Math.floor(Math.random() * 255) + 1, obj1.g, Math.floor(Math.random() * 255) + 1)
    }

    else {
      return new Pixel(Math.floor(Math.random() * 255) + 1, Math.floor(Math.random() * 255) + 1, obj1.b)
    }
  }

  else if (randomNum === 2) {
    if (secondRandomNum === 1) {
      return new Pixel(obj2.r, Math.floor(Math.random() * 255) + 1, Math.floor(Math.random() * 255) + 1)
    }

    else if (secondRandomNum === 2) {
      return new Pixel(Math.floor(Math.random() * 255) + 1, obj2.g, Math.floor(Math.random() * 255) + 1)
    }

    else {
      return new Pixel(Math.floor(Math.random() * 255) + 1, Math.floor(Math.random() * 255) + 1, obj2.b)
    }
  }

  else {
    return new Pixel(
      Math.floor(Math.random() * 255) + 1,
      Math.floor(Math.random() * 255) + 1,
      Math.floor(Math.random() * 255) + 1
    )
  }
}

//Two pixel parents objects
const obj1 = new Pixel(12, 43, 5) 
const obj2 = new Pixel(32, 54, 2)

const population = [obj1, obj2]; //array to save pixels object to create new pixels




btnElement.addEventListener('click', async function (e) {
  
  const res = await fetch('/', { //request for clear json file when app is starting
    method: 'DELETE',
  })

  if (!res.ok) {
    console.log('Error')
  }

  //for loop to create many of pixels


  for (let i = 0; i < 10; i++) {
    let randomIndex = Math.floor(Math.random() * population.length);
    let secondRandomIndex = Math.floor(Math.random() * population.length);
  
    console.log(randomIndex, secondRandomIndex)
  
    if (randomIndex === secondRandomIndex) { //checking if indices are equal
      secondRandomIndex = 0;
    }
  
    population[i] = createNewPixel(population[randomIndex], population[secondRandomIndex]) //createing new child pixel
    population[i].id += i; //Add id to child pixel
    console.log(population[i])
  
    await sendRequest(population[i]) //sending ajax requst with pixel data
  }
})

