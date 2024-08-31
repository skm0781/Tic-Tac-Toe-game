// Select necessary elements
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container"); 
let msg = document.querySelector("#msg");
let turnO = true;

// Define win patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Reset the game
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide"); 
};

// Enable all boxes
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Disable all boxes
const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// Show winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide"); // Corrected to classList
    disableBoxes();
};

// Check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return; // Exit after finding a winner
            }
        }
    }
};

// Add click event to boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "" && !box.disabled) { // Check if box is empty and not disabled
            box.innerText = turnO ? "O" : "X";
            turnO = !turnO; // Toggle turn
            box.disabled = true; // Disable box after click

            checkWinner();
        }
    });
});

// Reset button event listener
resetBtn.addEventListener("click", resetGame);

// New Game button event listener
newGameBtn.addEventListener("click", resetGame);

// Initialize game
resetGame(); // Set up the game when page loads
