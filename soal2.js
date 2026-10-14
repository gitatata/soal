function generateSquare(N) {
    // 1. Boundary Checks
    if (N <= 2) {
        console.log("square = Nilai terlalu kecil");
        return;
    }
    if (N >= 10) {
        console.log("square = Nilai terlalu besar");
        return;
    }

    console.log(`N = ${N}`);
    console.log("square =");

    // 2. Build the Square Grid
    const topBottomBorder = "=".repeat(N);
    const middleRow = "|" + " ".repeat(N - 2) + "|";

    // Print Top Border
    console.log(topBottomBorder);

    // Print Middle Rows
    let middleSection = "";
    for (let i = 0; i < N - 2; i++) {
        console.log(middleRow);
        middleSection += middleRow;
    }

    // Print Bottom Border
    console.log(topBottomBorder);

    // 3. Print Combined Horizontal Output
    const combined = topBottomBorder + middleSection + topBottomBorder;
    console.log("\nCombined Output:");
    console.log(combined);
}

// Get N from command-line argument, default to 5 if not provided
const inputN = parseInt(process.argv[2]) || 5;
generateSquare(inputN);