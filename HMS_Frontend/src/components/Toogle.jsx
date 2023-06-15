import React from "react";
import "../css/Toogle.css";

const Toogle = () => {
  const buttons = document.querySelectorAll("button");
  const minValue = 0;
  const maxValue = 4;

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      // 1. Get the clicked element
      const element = event.currentTarget;
      // 2. Get the parent
      const parent = element.parentNode;
      // 3. Get the number (within the parent)
      const numberContainer = parent.querySelector(".number");
      const number = parseFloat(numberContainer.textContent);
      // 4. Get the minus and plus buttons
      const increment = parent.querySelector(".plus");
      const decrement = parent.querySelector(".minus");
      // 5. Change the number based on click (either plus or minus)
      const newNumber = element.classList.contains("plus")
        ? number + 1
        : number - 1;
      numberContainer.textContent = newNumber;
      console.log(newNumber);
      // 6. Disable and enable buttons based on number value (and undim number)
      if (newNumber === minValue) {
        decrement.disabled = true;
        numberContainer.classList.add("dim");
        // Make sure the button won't get stuck in active state (Safari)
        element.blur();
      } else if (newNumber > minValue && newNumber < maxValue) {
        decrement.disabled = false;
        increment.disabled = false;
        numberContainer.classList.remove("dim");
      } else if (newNumber === maxValue) {
        increment.disabled = true;
        numberContainer.textContent = `${newNumber}+`;
        element.blur();
      }
    });
  });

  return (
    <div>
      <div class="container">
        <div class="input-row">
          <div class="title">
            <h2 class="label">Rooms</h2>
          </div>
          <div class="input">
            <button class="minus" aria-label="Decrease by one" disabled>
              <svg
                width="16"
                height="2"
                viewBox="0 0 16 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  y1="1"
                  x2="16"
                  y2="1"
                  stroke="#0064FE"
                  stroke-width="2"
                  class="icon"
                />
              </svg>
            </button>
            <div class="number dim">0</div>
            <button class="plus" aria-label="Increase by one">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="plus"
              >
                <line
                  x1="8"
                  y1="4.37114e-08"
                  x2="8"
                  y2="16"
                  stroke="#0064FE"
                  stroke-width="2"
                />
                <line y1="8" x2="16" y2="8" stroke="#0064FE" stroke-width="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toogle;
