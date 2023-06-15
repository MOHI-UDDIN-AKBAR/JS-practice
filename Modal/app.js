const button = document.querySelector(".modal-content button");
const modal = document.querySelector(".modal");
const modalOff = document.querySelector(".modal span");
const modalContainer = document.querySelector(".modal-container");
const openModal = () => {
  button.addEventListener("click", () => {
    modal.style.display = "flex";
    modalContainer.classList.add("background");
  });
};

const closeModal = () => {
  modalOff.addEventListener("click", () => {
    modal.style.display = "none";
    modalContainer.classList.remove("background");
  });
};

closeModal();
openModal();
