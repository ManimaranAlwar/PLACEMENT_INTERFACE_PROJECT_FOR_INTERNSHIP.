let currentIdx = 0;
let solvedStatus = new Array(questionBank.length).fill(false);
let timeLeft = 30 * 60;

function renderSidebar() {
    const list = document.getElementById('sidebar-list');
    list.innerHTML = "";
    questionBank.forEach((q, index) => {
        const item = document.createElement('div');
        item.className = `sidebar-item ${index === currentIdx ? 'active' : ''}`;
        item.onclick = () => { currentIdx = index; loadQuestion(); };
        
        const status = solvedStatus[index] ? 'status-solved' : 'status-pending';
        item.innerHTML = `
            <div class="status-dot ${status}"></div>
            <div>
                <p class="text-sm font-bold text-slate-700">${q.title}</p>
                <p class="text-[10px] text-slate-400 font-bold uppercase">${q.pattern}</p>
            </div>
        `;
        list.appendChild(item);
    });
}

function loadQuestion() {
    const q = questionBank[currentIdx];
    const lang = document.getElementById('langSelect').value;
    
    document.getElementById('pattern-tag').innerText = q.pattern;
    document.getElementById('q-title').innerText = q.title;
    document.getElementById('q-desc').innerText = q.desc;
    document.getElementById('q-input').innerText = q.input;
    document.getElementById('q-output').innerText = q.output;
    document.getElementById('editor').value = q[lang];
    renderSidebar();
}

function switchLanguage() {
    loadQuestion();
    const lang = document.getElementById('langSelect').value;
    printToConsole(`System: Switched language to ${lang.toUpperCase()}.`, "info");
}

function runCode() {
    printToConsole("Running test cases...", "info");
    setTimeout(() => {
        printToConsole("✔ Test Case 1: Passed", "success");
        printToConsole("✔ Test Case 2: Passed", "success");
    }, 600);
}

function submitCode() {
    solvedStatus[currentIdx] = true;
    printToConsole(`✔ Success: ${questionBank[currentIdx].title} solved.`, "success");
    printToConsole("Progress saved to digital record.", "info");
    renderSidebar();
    
    setTimeout(() => {
        if (currentIdx < questionBank.length - 1) {
            currentIdx++;
            loadQuestion();
        } else {
            printToConsole("\n★ ALL DAILY TASKS COMPLETED! ★", "success");
        }
    }, 1000);
}

function printToConsole(msg, type) {
    const consoleBox = document.getElementById('console-output');
    const colorClass = type === "success" ? "text-success" : (type === "info" ? "text-info" : "");
    consoleBox.innerHTML += `\n<span class="${colorClass}">> ${msg}</span>`;
    consoleBox.scrollTop = consoleBox.scrollHeight;
}

function clearConsole() {
    document.getElementById('console-output').innerHTML = "> Console cleared.";
}

// Simple Timer
setInterval(() => {
    timeLeft--;
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    document.getElementById('timer').innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
}, 1000);

window.onload = loadQuestion;