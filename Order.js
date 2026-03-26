let currentState = welcoming;

const menu = {
  coffee:{
    sizes: ["small", "medium", "large"],
    types: ["latte", "cappuccino", "americano"],
    temperatures:["iced", "hot"]
  },
  tea: {
    sizes: ["small", "medium", "large"],
    types: ["peppermint", "herbal", "green", "matcha", "vanilla matcha"],
    temperatures:["iced", "hot"]
  }
};

let order = [];

export function handleInput(sInput) {
  return currentState(sInput);
}

export function clearInput(){
  currentState = welcoming;
  order = [];
}

function welcoming() {
  let aReturn = [];
  currentState = ordering;

  aReturn.push("Welcome to The Velvet Roast!");
  aReturn.push("What would you like? (coffee or tea)");

  return aReturn;
}

function ordering(sInput) {
  let aReturn = [];
  const input = sInput.toLowerCase();

  if(menu[input]){
    currentState = choosingSize;
    order.push({item: input});

    aReturn.push(`You chose ${input}. What size? ${menu[input].sizes.join(", ")}`);

  } else {
    aReturn.push("Sorry, we only have coffee or tea.");
  }

  return aReturn;
}

function choosingSize(sInput){
  let aReturn = [];
  const size = sInput.toLowerCase();
  const lastItem = order[order.length-1];

  if(menu[lastItem.item].sizes.includes(size)){
    lastItem.size = size;
    currentState = choosingType;

    aReturn.push(`Nice. What type? ${menu[lastItem.item].types.join(", ")}`);

  } else {
    aReturn.push("Invalid size. Try again.");
  }

  return aReturn;
}

function choosingType(sInput){
  let aReturn = [];
  const type = sInput.toLowerCase();
  const lastItem = order[order.length-1];

  if(menu[lastItem.item].types.includes(type)){
    lastItem.type = type;
    currentState = choosingTemperature;

    aReturn.push(`Got it. Hot or iced? (${menu[lastItem.item].temperatures.join(", ")})`);

  } else {
    aReturn.push("Invalid type. Try again.");
  }

  return aReturn;
}

function choosingTemperature(sInput){
  let aReturn = [];
  const temp = sInput.toLowerCase();
  const lastItem = order[order.length-1];

  if(menu[lastItem.item].temperatures.includes(temp)){
    lastItem.temperature = temp;
    currentState = summary;

    aReturn.push(`Perfect. Added ${temp} ${lastItem.size} ${lastItem.type} ${lastItem.item}.`);
    aReturn.push(showOrder());

  } else {
    aReturn.push("Invalid temperature. Try again.");
  }

  return aReturn;
}

function summary(){
  let aReturn = [];
  aReturn.push("Thank you for your order!");
  currentState = welcoming;
  return aReturn;
}

function showOrder(){
  let text = "Your order:\n";

  for(let item of order){
    text += `${item.temperature} ${item.size} ${item.type} ${item.item}\n`;
  }

  return text;
}