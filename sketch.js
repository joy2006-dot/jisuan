let input;
let slider;
let button;
let isJumping = false;
let dropdown;
let iframe;

function setup() {
  //這是一個設定函數，只會執行一次
  // 產生一個畫布，充滿整個視窗，背景顏色為f4d58d
  createCanvas(windowWidth, windowHeight);
  background(244, 213, 141);

  // 產生一個輸入框，寬300高80，位置在(10,10)
  input = createInput();
  input.position(10, 10);
  input.size(280, 60);
  input.value("🐻");

  // 產生一個滑桿，位置在(320,10)，寬100
  slider = createSlider(24, 50, 24);
  slider.position(320, 10);
  slider.size(100);

  // 產生一個按鈕，位置在(450, 10)
  button = createButton('跳動');
  button.position(450, 10);
  button.mousePressed(toggleJump);

  // 產生一個下拉式選單，位置在(800,10)，寬100
  dropdown = createSelect();
  dropdown.position(800, 10);
  dropdown.size(100);
  dropdown.option('淡江大學', 'https://www.tku.edu.tw/');
  dropdown.option('淡江大學教育科技學系', 'https://edcollege.tku.edu.tw/');
  dropdown.changed(loadPage);

  // 產生一個iframe，顯示選擇的網頁
  iframe = createElement('iframe');
  iframe.position(10, 100);
  iframe.size(windowWidth - 20, windowHeight - 120);
}

function draw() {
  // 清除背景
  background(244, 213, 141);

  // 設定文字屬性
  let textSizeValue = slider.value(); // 根據滑桿的值設定文字大小
  textSize(textSizeValue);
  textAlign(LEFT, TOP); // 文字對齊方式
  fill(127); // 文字顏色

  // 計算文字的寬度
  let textWidth = 300;
  let textHeight = 50;
  let textContent = input.value(); // 使用輸入框的值作為顯示文字的內容

  // 計算起始位置，使文字從左上角開始，並在上面空100
  let startX = 0;
  let startY = 100;

  // 在視窗中重複顯示文字，並在文字之間留空一格
  for (let x = startX; x < windowWidth; x += textWidth + 32) {
    for (let y = startY; y < windowHeight; y += textHeight + 32) {
      if (isJumping) {
        let frequency = 0.1 + ((y / textHeight) % 2) * 0.1; // 隔行的頻率相同
        let amplitude = 10 + ((y / textHeight) % 2) * 10; // 隔行的跳動距離相同
        y += sin(frameCount * frequency) * amplitude; // 文字跳動效果
      }
      text(textContent, x, y, textWidth, textHeight);
    }
  }
}

function toggleJump() {
  isJumping = !isJumping;
}

function loadPage() {
  let url = dropdown.value();
  iframe.attribute('src', url);
}


