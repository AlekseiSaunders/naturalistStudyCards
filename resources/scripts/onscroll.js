let stopScroll = (window.onscroll = function () {
  let prevScrollPosition = 50;
  let currentScrollPosition = window.scrollY;
  if (
    prevScrollPosition > currentScrollPosition &&
    currentScrollPosition < 110
  ) {
    document.getElementById('siteNav').style.top = '0';
  } else {
    document.getElementById('siteNav').style.top = '-145px';
  }
  prevScrollPosition = currentScrollPosition;
});

export default stopScroll;
