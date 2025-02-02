let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let winnerText = document.querySelector("#winner-text");
let turn0 = true; // true = "O", false = "X"

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Function to check winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            winnerText.innerText = `Winner: ${pos1}`;
            winnerText.classList.add("animate__animated", "animate__fadeIn"); // Winner text animation
            disableAllBoxes();
            return;
        }
    }
};

// Function to disable all boxes after a win
const disableAllBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// Adding event listener to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            box.innerText = turn0 ? "O" : "X";
            box.disabled = true;
            box.classList.add("animate__animated", "animate__bounce"); // Bounce animation on click
            turn0 = !turn0;
            checkWinner();
        }
    });
});

// Reset button functionality
resetBtn.addEventListener("click", () => {
    resetBtn.classList.add("animate__animated", "animate__shakeX"); // Reset button shakes
    setTimeout(() => {
        resetBtn.classList.remove("animate__shakeX");
    }, 1000);

    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
        box.classList.remove("animate__bounce"); // Remove animation on reset
    });

    winnerText.innerText = "";
    winnerText.classList.remove("animate__fadeIn");
    turn0 = true;
});
