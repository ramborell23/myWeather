


const backgrounds = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL5P0JhJXVhvOsxgbp3kt3QqflTNuBVlsl44blkQUiYqBLJ0j-",
  ""
];


const randomize = (yourArray) =>{
    let randint = Math.floor(Math.random() * backgrounds.length);
    return randint;
};

export default {
  backgrounds,
  randomize
};