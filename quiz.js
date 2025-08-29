// quiz.js
// Static quiz questions and answers
const quizData = [
    {
        question: "Plot the point (4, 5) on the grid below.",
        type: "point"
    },
    {
        question: "Look at the graph below. What is the slope of the line shown?",
        options: ["positive", "negative", "zero", "undefined"],
        answer: 2 // zero
    },
    {
        question: "Look at the graph below. What is the slope of the line shown?",
        options: ["positive", "negative", "zero", "undefined"],
        answer: 1 // negative
    },
    {
        question: "Make a positive slope by plotting two points on the grid below.",
        type: "twopoints"
    },
    {
        question: "True or False: If one point is plotted at (3,2) and a second point at (-3,8), is the line positive?",
        options: ["True", "False"],
    answer: 1 // False
    }
];
    // ...existing code...

const questionsDiv = document.getElementById('questions');
const quizForm = document.getElementById('quiz-form');
const resultsDiv = document.getElementById('results');
// No global solution div needed

function renderQuestions() {
    questionsDiv.innerHTML = '';
    window.studentPoint = null;
    quizData.forEach((q, idx) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'question';
        qDiv.innerHTML = `<p><strong>Q${idx + 1}:</strong> ${q.question}</p>`;
        // Only add options for non-point questions
        if (!q.type) {
            qDiv.innerHTML += q.options.map((opt, i) =>
                `<label><input type=\"radio\" name=\"q${idx}\" value=\"${i}\"> ${opt}</label><br>`
            ).join('');
        }
        // Add a graph container for each question
        const graphDiv = document.createElement('div');
        graphDiv.id = `plotly-q${idx+1}`;
        graphDiv.style = "width:100%;max-width:400px;height:300px;margin-bottom:8px;";
        qDiv.appendChild(graphDiv);
        // Add a solution container for each question
        const solDiv = document.createElement('div');
        solDiv.id = `solution-q${idx+1}`;
        qDiv.appendChild(solDiv);
        questionsDiv.appendChild(qDiv);
    });
    // Plot for question 1 (blank grid for point plotting)
    Plotly.newPlot('plotly-q1', [], {
        margin: { t: 10 },
        xaxis: { title: 'x', zeroline: false, range: [0, 10], dtick: 2, gridcolor: '#ddd', tickfont: {size: 16} },
        yaxis: { title: 'y', zeroline: false, range: [0, 10], dtick: 2, gridcolor: '#ddd', tickfont: {size: 16} },
        showlegend: false
    }, {displayModeBar: false});
    // Add click event for question 1
    document.getElementById('plotly-q1').onmousedown = function(e) {
        const rect = this.getBoundingClientRect();
        // Calculate grid coordinates
        let x = ((e.clientX - rect.left) / rect.width) * 10;
        let y = (1 - (e.clientY - rect.top) / rect.height) * 10;
        // Snap to nearest whole number intersection
        x = Math.round(x);
        y = Math.round(y);
        // Only allow clicks within grid bounds
        if (x < 0 || x > 10 || y < 0 || y > 10) return;
        window.studentPoint = {x, y};
        Plotly.react('plotly-q1', [{
            x: [x],
            y: [y],
            mode: 'markers',
            marker: {color: 'red', size: 12}
        }], {
            margin: { t: 10 },
            xaxis: { title: 'x', zeroline: false, range: [0, 10], dtick: 1, gridcolor: '#ddd' },
            yaxis: { title: 'y', zeroline: false, range: [0, 10], dtick: 1, gridcolor: '#ddd' },
            showlegend: false
        }, {displayModeBar: false});
    };
    // Plot for question 2 (y = 10), blue horizontal line
    Plotly.newPlot('plotly-q2', [{
        x: [0, 10],
        y: [10, 10],
        mode: 'lines',
        line: {color: '#007bff', width: 3},
        name: 'Line'
    }], {
        margin: { t: 10 },
        xaxis: { title: 'x', zeroline: false, range: [0, 10], dtick: 2, gridcolor: '#ddd', tickfont: {size: 16} },
        yaxis: { title: 'y', zeroline: false, range: [0, 15], dtick: 5, gridcolor: '#ddd', tickfont: {size: 16} },
        showlegend: false
    }, {displayModeBar: false});

    // Plot for question 3 (y = -2x + 10), blue line
    Plotly.newPlot('plotly-q3', [{
        x: [-5, 0, 5],
        y: [-5*-2+10, 0*-2+10, 5*-2+10],
        mode: 'lines',
        line: {color: '#007bff', width: 3},
        name: 'Line'
    }], {
        margin: { t: 10 },
        xaxis: { title: 'x', zeroline: false, range: [-5, 5], dtick: 5, gridcolor: '#ddd', tickfont: {size: 16} },
        yaxis: { title: 'y', zeroline: false, range: [-10, 20], dtick: 10, gridcolor: '#ddd', tickfont: {size: 16} },
        showlegend: false
    }, {displayModeBar: false});

    // Plot for question 4 (blank grid for two points and line)
    // Plot for question 5 (show the two points and line)
    Plotly.newPlot('plotly-q5', [
        {
            x: [3, -3],
            y: [2, 8],
            mode: 'markers+lines',
            marker: {color: 'red', size: 12},
            line: {color: '#007bff', width: 3},
            name: 'Line'
        }
    ], {
        margin: { t: 10 },
        xaxis: { title: 'x', zeroline: false, range: [-5, 5], dtick: 1, gridcolor: '#ddd' },
        yaxis: { title: 'y', zeroline: false, range: [0, 10], dtick: 2, gridcolor: '#ddd' },
        showlegend: false
    }, {displayModeBar: false});
    window.studentLinePoints = [];
    Plotly.newPlot('plotly-q4', [], {
        margin: { t: 10 },
        xaxis: { title: 'x', zeroline: false, range: [0, 10], dtick: 2, gridcolor: '#ddd', tickfont: {size: 16} },
        yaxis: { title: 'y', zeroline: false, range: [0, 10], dtick: 2, gridcolor: '#ddd', tickfont: {size: 16} },
        showlegend: false
    }, {displayModeBar: false});
    // Plot for question 5 (show the two points and line)
    Plotly.newPlot('plotly-q5', [
        {
            x: [3, -3],
            y: [2, 8],
            mode: 'markers+lines',
            marker: {color: 'red', size: 12},
            line: {color: '#007bff', width: 3},
            name: 'Line'
        }
    ], {
        margin: { t: 10 },
        xaxis: { title: 'x', zeroline: false, range: [-5, 5], dtick: 5, gridcolor: '#ddd', tickfont: {size: 16} },
        yaxis: { title: 'y', zeroline: false, range: [0, 10], dtick: 5, gridcolor: '#ddd', tickfont: {size: 16} },
        showlegend: false
    }, {displayModeBar: false});
    document.getElementById('plotly-q4').onmousedown = function(e) {
        if (window.studentLinePoints.length >= 2) return;
        const rect = this.getBoundingClientRect();
        let x = ((e.clientX - rect.left) / rect.width) * 10;
        let y = (1 - (e.clientY - rect.top) / rect.height) * 10;
        x = Math.round(x);
        y = Math.round(y);
        if (x < 0 || x > 10 || y < 0 || y > 10) return;
        window.studentLinePoints.push({x, y});
        let data = window.studentLinePoints.map(pt => ({x: [pt.x], y: [pt.y], mode: 'markers', marker: {color: 'red', size: 12}}));
        if (window.studentLinePoints.length === 2) {
            data.push({
                x: [window.studentLinePoints[0].x, window.studentLinePoints[1].x],
                y: [window.studentLinePoints[0].y, window.studentLinePoints[1].y],
                mode: 'lines',
                line: {color: '#007bff', width: 3}
            });
        }
        Plotly.react('plotly-q4', data, {
            margin: { t: 10 },
            xaxis: { title: 'x', zeroline: false, range: [0, 10], dtick: 1, gridcolor: '#ddd' },
            yaxis: { title: 'y', zeroline: false, range: [0, 10], dtick: 1, gridcolor: '#ddd' },
            showlegend: false
        }, {displayModeBar: false});
    };
}

quizForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let score = 0;
    quizData.forEach((q, idx) => {
        let solutionOutput = '';
        if (q.type === "point") {
            // Grade based on studentPoint
            if (window.studentPoint) {
                const dx = window.studentPoint.x - 4;
                const dy = window.studentPoint.y - 5;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 0.5) {
                    score++;
                    solutionOutput = `<div class='solution'>Q${idx + 1}: Correct! You plotted (${Math.round(window.studentPoint.x)}, ${Math.round(window.studentPoint.y)})</div>`;
                } else {
                    solutionOutput = `<div class='incorrect'>Q${idx + 1}: Incorrect. You plotted (${Math.round(window.studentPoint.x)}, ${Math.round(window.studentPoint.y)}), correct is (4, 5)</div>`;
                }
            } else {
                solutionOutput = `<div class='incorrect'>Q${idx + 1}: No point plotted. Correct is (4, 5)</div>`;
            }
        } else if (q.type === "twopoints") {
            // Grade based on two points: check if slope is positive
            if (window.studentLinePoints.length === 2) {
                const p1 = window.studentLinePoints[0];
                const p2 = window.studentLinePoints[1];
                const slope = (p2.y - p1.y) / (p2.x - p1.x);
                if (p2.x !== p1.x && slope > 0) {
                    score++;
                    solutionOutput = `<div class='solution'>Q${idx + 1}: Correct! Slope is positive. Points: (${p1.x}, ${p1.y}), (${p2.x}, ${p2.y})</div>`;
                } else if (p2.x === p1.x) {
                    solutionOutput = `<div class='incorrect'>Q${idx + 1}: Incorrect. The line is vertical (undefined slope). Points: (${p1.x}, ${p1.y}), (${p2.x}, ${p2.y})</div>`;
                } else {
                    solutionOutput = `<div class='incorrect'>Q${idx + 1}: Incorrect. Slope is not positive. Points: (${p1.x}, ${p1.y}), (${p2.x}, ${p2.y})</div>`;
                }
            } else {
                solutionOutput = `<div class='incorrect'>Q${idx + 1}: Please plot two points.`;
            }
        } else {
            const selected = quizForm[`q${idx}`].value;
            const correct = q.answer;
            if (selected == correct) {
                score++;
                solutionOutput = `<div class='solution'>Q${idx + 1}: Correct! (${q.options[correct]})</div>`;
            } else {
                solutionOutput = `<div class='incorrect'>Q${idx + 1}: Incorrect. Correct answer: ${q.options[correct]}</div>`;
            }
        }
        document.getElementById(`solution-q${idx+1}`).innerHTML = solutionOutput;
    });
    resultsDiv.innerHTML = `<div class='score'>Your Score: ${score} / ${quizData.length}</div>`;
    document.getElementById('submit-btn').disabled = true;
});

window.onload = function() {
    renderQuestions();
};
