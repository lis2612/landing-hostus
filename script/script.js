const cards = document.getElementsByClassName("quality__card");

const toggleActiveCard = function (el) {
  if (el.classList.contains("quality__card_active")) el.classList.remove("quality__card_active");
  else el.classList.add("quality__card_active");
};

for (let i = 0; i < cards.length; i++) {
  let timerId = setTimeout(function tick() {
    toggleActiveCard(cards[i]);
    setTimeout(() => toggleActiveCard(cards[i]), 2000);
    timerId = setTimeout(tick, 2000 * cards.length);
  }, i*2000 );
}
