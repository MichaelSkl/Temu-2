let products; 
let productList;
let imgScale = 1;
let totalTime = 120; // total seconds
let startTime;
let productPositions = [];
let numOfSelected = 0;
let displayModal = true;

function preload() {
  product1 = loadImage("resources/produkt1.png");
  product2 = loadImage("resources/produkt2.png");
  product3 = loadImage("resources/produkt3.png");
  product4 = loadImage("resources/produkt4.png");
  product5 = loadImage("resources/produkt5.png");
  product6 = loadImage("resources/produkt6.png");
  navbar = loadImage("resources/Temu Header Pasek.png");
  OpenSauceOne = loadFont("resources/OpenSauceOne-SemiBold.ttf");
  timer = loadImage("resources/timer.png");
  bar1 = loadImage("resources/bar1.png");
  bar2 = loadImage("resources/bar2.png");
  bar3 = loadImage("resources/bar3.png");
  bar4 = loadImage("resources/bar4.png");
  product1_hover = loadImage("resources/produkt1_hover.png");
  product2_hover = loadImage("resources/produkt2_hover.png");
  product3_hover = loadImage("resources/produkt3_hover.png");
  product4_hover = loadImage("resources/produkt4_hover.png");
  product5_hover = loadImage("resources/produkt5_hover.png");
  product6_hover = loadImage("resources/produkt6_hover.png");
  product1_selected = loadImage("resources/produkt1_selected.png");
  product2_selected = loadImage("resources/produkt2_selected.png");
  product3_selected = loadImage("resources/produkt3_selected.png");
  product4_selected = loadImage("resources/produkt4_selected.png");
  product5_selected = loadImage("resources/produkt5_selected.png");
  product6_selected = loadImage("resources/produkt6_selected.png");
  modal_start = loadImage("resources/modal_start.png");
  modal_end = loadImage("resources/modal_end.png");
}

function setup() {
  createCanvas(960, 540);
  productX = 115;
  productsHover = [product1_hover, product2_hover, product3_hover, product4_hover, product5_hover, product6_hover];
  products = [product1, product2, product3, product4, product5, product6];
  selectedProducts = [false, false, false, false, false, false];
  productsSelected = [product1_selected, product2_selected, product3_selected, product4_selected, product5_selected, product6_selected];
  //Wszystkie stany paska postępu
  progressBar = [bar1, bar2, bar3, bar4];
  productList = 0;
  startTime = millis();
}
//Kliknij na produkt
 function mousePressed() {
  // Only close modal, ignore everything else
  if (displayModal) {
    displayModal = false;
    startTime = millis(); // start the timer only now
    return; // prevent selecting a product on the same click
  }

  // Only allow product clicks if modal is not showing
  for (let i = 0; i < productPositions.length; i++) {
    let p = productPositions[i];
    if (
      mouseX > p.x && mouseX < p.x + p.w &&
      mouseY > p.y && mouseY < p.y + p.h
    ) {
      if (!selectedProducts[i]) {
        selectedProducts[i] = true;
        numOfSelected += 1;
      }
    }
  }
}


function draw() {
  background("#ffffff");
  
  image(navbar, 0, 0, 960, 500);
  
  //Licznik
  push();
  
  imageMode(CENTER);
  image(timer, width/2, 100, timer.width, timer.height);
  
  let elapsed = int((millis() - startTime) / 1000);
  let remaining = max(0, totalTime - elapsed);
  
  let minutes = floor(remaining / 60);
  let seconds = remaining % 60;
  let timerText = nf(minutes, 2) + ':' + nf(seconds, 2);
  
  fill("#fff");
  textAlign(CENTER);
  textSize(12);
  textFont(OpenSauceOne);
  text(timerText, width/2+5, 105);

  if (remaining === 0) {
    noLoop(); // stops the timer
  }

  pop();
  // Wyświetlanie tekstu
  fill(0);
  textAlign(CENTER);
  textSize(24);
  textFont(OpenSauceOne);
  text("Dobierz 3 wspaniałe produkty do koszyka!", width/2, 170)

  // Pozycja produktów
    let productX = 35;
    let productY = height / 2.5;
    productPositions = [];

    for (let i = 0; i < products.length; i++) {
  let imgW = products[i].width / imgScale;
  let imgH = products[i].height / imgScale;
  
  productPositions[i] = { x: productX, y: productY, w: imgW, h: imgH };

  if (selectedProducts[i] && displayModal === false) {
    image(productsSelected[i], productX, productY, imgW, imgH);
  } else if (
    mouseX > productX && mouseX < productX + imgW &&
    mouseY > productY && mouseY < productY + imgH && displayModal === false
  ) {
    image(productsHover[i], productX, productY, imgW, imgH);
  } else {
    image(products[i], productX, productY, imgW, imgH);
  }

    productX += imgW + 10;
    }
    // Pasek postępu
    push();

    imageMode(CENTER);
    image(progressBar[numOfSelected], width/2, 500, bar1.width, bar1.height);

    pop();

  // Modal start
  if (displayModal === true) {
  background(0, 0, 0, 20); // Clear the background with transparency
  push();
  imageMode(CENTER);
  image(modal_start, width/2, height/2, modal_start.width, modal_start.height);
  pop();
  }

  if (numOfSelected === 3) {
    // Show the end modal
    push();
    imageMode(CENTER);
    background(0, 0, 0, 20); // Clear the background with transparency
    image(modal_end, width/2, height/2, modal_end.width, modal_end.height);
    pop();
    
  }
} 