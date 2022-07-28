const mobileElements = document.querySelectorAll(".mobile");
const openOverlayElements = document.querySelectorAll('.open_overlay');

const backdropElements = document.querySelectorAll(".backdrop_style");

const backArrowBtnElements = document.querySelectorAll(".back_arrow_style");

const bodyElement = document.querySelector("body");

let selectedMobileNo = 0;

function openOverlay(event) {
  const selectedElement = event.target;
  const selectedMobile = selectedElement.dataset.mobileno;
  selectedMobileNo = selectedMobile;
  console.log(selectedMobileNo);
  const overlayElement = document.getElementById(
    "full_spec_overlay" + selectedMobile
  );
  const backdropElement = document.getElementById("backdrop" + selectedMobile);
  overlayElement.style.display = "flex";
  backdropElement.style.display = "block";
  bodyElement.style.overflow = "hidden";
}

function closeOverlay() {
  const overlayElement = document.getElementById(
    "full_spec_overlay" + selectedMobileNo
  );
  const backdropElement = document.getElementById(
    "backdrop" + selectedMobileNo
  );
  overlayElement.style.display = "none";
  backdropElement.style.display = "none";
  bodyElement.style.overflow = "scroll";
}

for (const openOverlayElement of openOverlayElements) {
  openOverlayElement.addEventListener("click", openOverlay);
}

for (const backdropElement of backdropElements) {
  backdropElement.addEventListener("click", closeOverlay);
}

for (const backArrowBtnElement of backArrowBtnElements) {
  backArrowBtnElement.addEventListener("click", closeOverlay);
}
