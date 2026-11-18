(function () {
  if (window.__tmTickerPlaceInit) return;
  window.__tmTickerPlaceInit = true;

  function place() {
    var ticker = document.getElementById("home-booking-ticker");
    var booking = document.getElementById("home-travel-booking");
    if (!ticker || !booking || !booking.parentNode) return;
    // Always keep ticker immediately under booking (kills beach strip / journey-between gap).
    if (booking.nextElementSibling !== ticker) {
      booking.parentNode.insertBefore(ticker, booking.nextSibling);
    }
  }

  place();
  var n = 0;
  var t = setInterval(function () {
    place();
    n++;
    if (n > 80) clearInterval(t);
  }, 200);
  document.addEventListener("DOMContentLoaded", place);
  window.addEventListener("load", place);
})();
