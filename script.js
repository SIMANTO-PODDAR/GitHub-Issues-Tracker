// Global Elements
const allIssueD = document.getElementById('all-issues-d');
const searchIssueParent = document.getElementById('search-issue-p');
const allIssueParent = document.getElementById('all-issue-p');
const openIssueParent = document.getElementById('open-issue-p');
const closedIssueParent = document.getElementById('closed-issue-p');
const topBarCounter = document.getElementById('top-bar-counter');
const modal = document.getElementById('modal');

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('top-search');
const noSearchIssue = document.getElementById('no-search-issue');

const allBtn = document.getElementById('btn-all');
const openBtn = document.getElementById('btn-open');
const closedBtn = document.getElementById('btn-closed');

// Statistics DOM Elements
const statTotal = document.getElementById('stat-total');
const statOpen = document.getElementById('stat-open');
const statClosed = document.getElementById('stat-closed');
const statOpenProgress = document.getElementById('stat-open-progress');
const statClosedProgress = document.getElementById('stat-closed-progress');

// Parse ISO dates into human-friendly relative time
function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = now - past;

    if (isNaN(elapsed) || elapsed < 0) {
        return "recently";
    }

    if (elapsed < msPerMinute) {
        return 'just now';
    } else if (elapsed < msPerHour) {
        const m = Math.round(elapsed / msPerMinute);
        return m === 1 ? '1 min ago' : `${m} mins ago`;
    } else if (elapsed < msPerDay) {
        const h = Math.round(elapsed / msPerHour);
        return h === 1 ? '1 hour ago' : `${h} hours ago`;
    } else if (elapsed < msPerMonth) {
        const d = Math.round(elapsed / msPerDay);
        return d === 1 ? 'yesterday' : `${d} days ago`;
    } else if (elapsed < msPerMonth * 2) {
        return '1 month ago';
    } else if (elapsed < msPerYear) {
        const mo = Math.round(elapsed / msPerMonth);
        return `${mo} months ago`;
    } else {
        const y = Math.round(elapsed / msPerYear);
        return y === 1 ? '1 year ago' : `${y} years ago`;
    }
}

// Logout Utility
function logout() {
    window.location.assign("index.html");
}

// Filter Tabs active styling and visibility toggle
function filter(id, id2) {
    loadingSpinnerS();

    // Reset all tabs active states
    allBtn.classList.remove('btn-primary', 'bg-indigo-600', 'text-white');
    openBtn.classList.remove('btn-primary', 'bg-indigo-600', 'text-white');
    closedBtn.classList.remove('btn-primary', 'bg-indigo-600', 'text-white');

    // Hide all issue grids
    allIssueParent.classList.add('hidden');
    openIssueParent.classList.add('hidden');
    closedIssueParent.classList.add('hidden');
    noSearchIssue.classList.add('hidden');
    searchIssueParent.classList.add('hidden');

    // Make active tab primary
    const activeBtn = document.getElementById(id);
    activeBtn.classList.add('btn-primary', 'bg-indigo-600', 'text-white');

    // Make active grid visible
    const activeParent = document.getElementById(id2);
    activeParent.classList.remove('hidden');

    // Retrieve and render
    allIssue();
    allIssueD.classList.remove('hidden');
}

// Fetch Issues from Server
const allIssue = () => {
    loadingSpinnerS();
    
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(issueData => {
            displayAllIssues(issueData.data || []);
        })
        .catch(err => {
            console.error("API fetch failed:", err);
            loadingSpinnerH();
        });
};

// Create a premium card element
function createCard(issue) {
    const statusColorClass = issue.status === 'open' 
        ? 'border-t-[4px] border-t-emerald-500' 
        : 'border-t-[4px] border-t-violet-500';
    
    // Priority badge styling
    let priorityBadge = '';
    if (issue.priority.toLowerCase() === 'high') {
        priorityBadge = `<span class="px-2.5 py-1 text-[10px] font-bold rounded-full bg-red-950/40 border border-red-500/30 text-red-400 flex items-center gap-1"><i class="fa-solid fa-triangle-exclamation text-[9px]"></i> High</span>`;
    } else if (issue.priority.toLowerCase() === 'medium') {
        priorityBadge = `<span class="px-2.5 py-1 text-[10px] font-bold rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-400 flex items-center gap-1"><i class="fa-solid fa-circle-exclamation text-[9px]"></i> Medium</span>`;
    } else {
        priorityBadge = `<span class="px-2.5 py-1 text-[10px] font-bold rounded-full bg-slate-800/40 border border-slate-700/30 text-slate-400 flex items-center gap-1"><i class="fa-solid fa-circle-info text-[9px]"></i> Low</span>`;
    }

    // Status Badge
    const statusBadge = issue.status === 'open'
        ? `<span class="px-2 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center gap-1"><i class="fa-solid fa-circle-dot"></i> Open</span>`
        : `<span class="px-2 py-1 rounded-lg bg-violet-950/40 border border-violet-500/20 text-violet-400 text-[10px] font-bold flex items-center gap-1"><i class="fa-solid fa-circle-check"></i> Closed</span>`;

    // Render Labels
    let labelsHTML = '';
    if (issue.labels && Array.isArray(issue.labels)) {
        issue.labels.forEach(label => {
            const cleanLabel = label.toLowerCase().trim();
            if (cleanLabel === 'bug') {
                labelsHTML += `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-red-950/20 text-red-400 border border-red-500/20"><i class="fa-solid fa-bug text-[8px]"></i> BUG</span>`;
            } else if (cleanLabel === 'help wanted') {
                labelsHTML += `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-amber-950/20 text-amber-400 border border-amber-500/20"><i class="fa-solid fa-life-ring text-[8px]"></i> HELP</span>`;
            } else if (cleanLabel === 'enhancement') {
                labelsHTML += `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-violet-950/20 text-violet-400 border border-violet-500/20"><i class="fa-solid fa-arrow-up-right-dots text-[8px]"></i> ENHANCE</span>`;
            } else if (cleanLabel === 'documentation') {
                labelsHTML += `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-blue-950/20 text-blue-400 border border-blue-500/20"><i class="fa-brands fa-readme text-[8px]"></i> DOCS</span>`;
            } else if (cleanLabel === 'good first issue') {
                labelsHTML += `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-950/20 text-emerald-400 border border-emerald-500/20"><i class="fa-solid fa-hand-holding-heart text-[8px]"></i> GOOD FIRST</span>`;
            }
        });
    }

    const friendlyDate = timeAgo(issue.createdAt);

    const cardHTML = `
        <div class="glass-panel hover:-translate-y-1 hover:shadow-xl hover:border-slate-700/50 transition-all duration-300 rounded-2xl p-5 flex flex-col justify-between h-72 cursor-pointer border border-slate-800/80 group ${statusColorClass}" onclick="modalSet(${issue.id})">
            <div>
                <!-- Top Badge Row -->
                <div class="flex justify-between items-center mb-3">
                    ${statusBadge}
                    ${priorityBadge}
                </div>

                <!-- Issue Title -->
                <h3 class="font-extrabold text-sm text-slate-100 dark:text-slate-100 line-clamp-1 group-hover:text-indigo-400 transition-colors" title="${issue.title}">
                    ${issue.title}
                </h3>

                <!-- Issue Description -->
                <p class="text-[11px] text-slate-400 dark:text-slate-400 mt-2 mb-3 line-clamp-3 leading-relaxed">
                    ${issue.description}
                </p>

                <!-- Labels Row -->
                <div class="flex flex-wrap gap-1.5 mt-2">
                    ${labelsHTML}
                </div>
            </div>

            <!-- Card Bottom Meta -->
            <div class="pt-3 border-t border-slate-900/85 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-400">
                <span class="flex items-center gap-1 font-semibold">
                    <i class="fa-solid fa-circle-user text-slate-500"></i>
                    ${issue.author}
                </span>
                <span class="flex items-center gap-1 font-semibold">
                    <i class="fa-regular fa-clock"></i>
                    ${friendlyDate}
                </span>
            </div>
        </div>
    `;
    
    const div = document.createElement('div');
    div.innerHTML = cardHTML;
    return div.firstElementChild;
}

// Render Dashboard grids
function displayAllIssues(data) {
    allIssueParent.innerHTML = '';
    openIssueParent.innerHTML = '';
    closedIssueParent.innerHTML = '';

    let allIssueCount = 0;
    let openIssueCount = 0;
    let closedIssueCount = 0;

    data.forEach(issue => {
        // Increment counters
        allIssueCount++;
        if (issue.status === "open") openIssueCount++;
        if (issue.status === "closed") closedIssueCount++;

        // Append to respective grids using dedicated DOM elements
        allIssueParent.appendChild(createCard(issue));

        if (issue.status === "open") {
            openIssueParent.appendChild(createCard(issue));
        } else if (issue.status === "closed") {
            closedIssueParent.appendChild(createCard(issue));
        }
    });

    // Update statistics numbers and progress tracks
    updateStatsPanel(allIssueCount, openIssueCount, closedIssueCount);

    // Update active tab counter
    topBarCounterF(allIssueCount, openIssueCount, closedIssueCount);

    loadingSpinnerH();
}

// Update dashboard analytics metrics
function updateStatsPanel(total, open, closed) {
    statTotal.innerText = String(total).padStart(2, '0');
    statOpen.innerText = String(open).padStart(2, '0');
    statClosed.innerText = String(closed).padStart(2, '0');

    if (total > 0) {
        const openPercent = (open / total) * 100;
        const closedPercent = (closed / total) * 100;
        statOpenProgress.style.width = `${openPercent}%`;
        statClosedProgress.style.width = `${closedPercent}%`;
    } else {
        statOpenProgress.style.width = '0%';
        statClosedProgress.style.width = '0%';
    }
}

// Loading Skeleton Toggles
function loadingSpinnerS() {
    // Hide active grids
    allIssueParent.classList.add('hidden');
    openIssueParent.classList.add('hidden');
    closedIssueParent.classList.add('hidden');
    searchIssueParent.classList.add('hidden');

    const spinner = document.getElementById('loading-spinner');
    spinner.classList.remove('hidden');
}

function loadingSpinnerH() {
    const spinner = document.getElementById('loading-spinner');
    spinner.classList.add('hidden');

    // Restore active grids based on selected tab state
    if (!allBtn.classList.contains('bg-indigo-600') && 
        !openBtn.classList.contains('bg-indigo-600') && 
        !closedBtn.classList.contains('bg-indigo-600')) {
        // If searching
        searchIssueParent.classList.remove('hidden');
    } else if (allBtn.classList.contains('bg-indigo-600')) {
        allIssueParent.classList.remove('hidden');
    } else if (openBtn.classList.contains('bg-indigo-600')) {
        openIssueParent.classList.remove('hidden');
    } else if (closedBtn.classList.contains('bg-indigo-600')) {
        closedIssueParent.classList.remove('hidden');
    }
}

// Top Bar Counter update
function topBarCounterF(a, o, c) {
    if (allBtn.classList.contains('bg-indigo-600')) {
        topBarCounter.innerText = a;
    } else if (openBtn.classList.contains('bg-indigo-600')) {
        topBarCounter.innerText = o;
    } else if (closedBtn.classList.contains('bg-indigo-600')) {
        topBarCounter.innerText = c;
    }
}

// Detail Dialog Trigger
function modalSet(id) {
    loadingSpinnerS();
    
    // Fetch directly from API
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
        .then(res => res.json())
        .then(crd => {
            loadingSpinnerH();
            modalHtml(crd.data);
        })
        .catch(err => {
            console.error("Could not fetch issue details:", err);
            loadingSpinnerH();
        });
}

// Render detailed modal popup markup
function modalHtml(crd) {
    modal.innerHTML = '';
    const div = document.createElement('div');

    const friendlyDate = timeAgo(crd.createdAt);
    const friendlyUpdate = timeAgo(crd.updatedAt);
    
    // Labels list
    let labelsHTML = '';
    if (crd.labels && Array.isArray(crd.labels)) {
        crd.labels.forEach(label => {
            const cleanLabel = label.toLowerCase().trim();
            if (cleanLabel === 'bug') {
                labelsHTML += `<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-950/20 text-red-400 border border-red-500/20"><i class="fa-solid fa-bug"></i> BUG</span>`;
            } else if (cleanLabel === 'help wanted') {
                labelsHTML += `<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/20 text-amber-400 border border-amber-500/20"><i class="fa-solid fa-life-ring"></i> HELP WANTED</span>`;
            } else if (cleanLabel === 'enhancement') {
                labelsHTML += `<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-violet-950/20 text-violet-400 border border-violet-500/20"><i class="fa-solid fa-arrow-up-right-dots"></i> ENHANCEMENT</span>`;
            } else if (cleanLabel === 'documentation') {
                labelsHTML += `<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/20 text-blue-400 border border-blue-500/20"><i class="fa-brands fa-readme"></i> DOCUMENTATION</span>`;
            } else if (cleanLabel === 'good first issue') {
                labelsHTML += `<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/20 text-emerald-400 border border-emerald-500/20"><i class="fa-solid fa-hand-holding-heart"></i> GOOD FIRST ISSUE</span>`;
            }
        });
    }

    // Status styling
    const statusBadge = crd.status === 'open'
        ? `<span class="px-3 py-1 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5"><i class="fa-solid fa-circle-dot"></i> Open</span>`
        : `<span class="px-3 py-1 rounded-xl bg-violet-950/40 border border-violet-500/30 text-violet-400 text-xs font-bold flex items-center gap-1.5"><i class="fa-solid fa-circle-check"></i> Closed</span>`;

    // Priority Styling
    let priorityBadge = '';
    if (crd.priority.toLowerCase() === 'high') {
        priorityBadge = `<span class="px-3 py-1 text-xs font-bold rounded-xl bg-red-950/40 border border-red-500/30 text-red-400 flex items-center gap-1.5"><i class="fa-solid fa-triangle-exclamation"></i> High</span>`;
    } else if (crd.priority.toLowerCase() === 'medium') {
        priorityBadge = `<span class="px-3 py-1 text-xs font-bold rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-400 flex items-center gap-1.5"><i class="fa-solid fa-circle-exclamation"></i> Medium</span>`;
    } else {
        priorityBadge = `<span class="px-3 py-1 text-xs font-bold rounded-xl bg-slate-800/40 border border-slate-700/30 text-slate-400 flex items-center gap-1.5"><i class="fa-solid fa-circle-info"></i> Low</span>`;
    }

    div.innerHTML = `
    <dialog id="my_modal_1" class="modal bg-slate-950/80 backdrop-blur-sm">
        <div class="modal-box bg-slate-900 border border-slate-800 max-w-2xl rounded-2xl p-7 shadow-2xl relative">
            
            <!-- Close Modal Icon -->
            <form method="dialog">
                <button class="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer text-lg">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </form>

            <!-- Modal Header Title -->
            <div class="pr-6">
                <h3 class="text-2xl font-extrabold text-white leading-tight font-display">${crd.title}</h3>
                <div class="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-400 border-b border-slate-800 pb-4">
                    ${statusBadge}
                    <span>Opened by <strong class="text-slate-300 font-semibold">@${crd.author}</strong></span>
                    <span class="w-1.5 h-1.5 bg-slate-700 rounded-full"></span>
                    <span>Created ${friendlyDate}</span>
                    <span class="w-1.5 h-1.5 bg-slate-700 rounded-full"></span>
                    <span>Updated ${friendlyUpdate}</span>
                </div>
            </div>

            <!-- Labels -->
            <div class="flex flex-wrap gap-2 mt-5">
                ${labelsHTML}
            </div>

            <!-- Description Body -->
            <div class="mt-6">
                <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
                <div class="bg-slate-950/40 border border-slate-850 rounded-xl p-4 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap min-h-20">
                    ${crd.description}
                </div>
            </div>

            <!-- Meta Info Panel -->
            <div class="mt-6 grid grid-cols-2 gap-4">
                <!-- Assignee -->
                <div class="p-4 bg-slate-950/20 border border-slate-850 rounded-xl flex items-center gap-3.5">
                    <div class="w-10 h-10 bg-indigo-950 text-indigo-400 border border-indigo-500/20 rounded-full flex items-center justify-center text-lg font-bold">
                        ${crd.assignee ? crd.assignee.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                        <p class="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Assignee</p>
                        <p class="text-sm font-bold text-slate-200 mt-0.5">@${crd.assignee || 'unassigned'}</p>
                    </div>
                </div>

                <!-- Priority -->
                <div class="p-4 bg-slate-950/20 border border-slate-850 rounded-xl flex items-center gap-3.5">
                    <div class="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-lg text-slate-400">
                        <i class="fa-solid fa-flag"></i>
                    </div>
                    <div>
                        <p class="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Priority Level</p>
                        <div class="mt-0.5">${priorityBadge}</div>
                    </div>
                </div>
            </div>

            <!-- Bottom Close Button -->
            <div class="flex justify-end mt-7 border-t border-slate-800 pt-4">
                <form method="dialog">
                    <button class="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl border-none shadow-md active:scale-95 transition-all duration-200 cursor-pointer">
                        Close Details
                    </button>
                </form>
            </div>
            
        </div>
    </dialog>
    `;

    modal.appendChild(div);
    const dialogElement = document.getElementById('my_modal_1');
    dialogElement.showModal();

    // Close when clicking backdrop
    dialogElement.addEventListener('click', (e) => {
        const dialogDimensions = dialogElement.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            dialogElement.close();
        }
    });
}

// Search Issues (REST Search API queries)
function searchIsu() {
    loadingSpinnerS();
    const inputValue = searchInput.value.trim();

    if (inputValue === '') {
        filter('btn-all', 'all-issue-p');
        return;
    }

    // Hide standard category views
    allIssueD.classList.add('hidden');
    searchIssueParent.classList.remove('hidden');
    noSearchIssue.classList.add('hidden');
    searchIssueParent.innerHTML = '';

    // Clear active states of category filter tabs
    allBtn.classList.remove('btn-primary', 'bg-indigo-600', 'text-white');
    openBtn.classList.remove('btn-primary', 'bg-indigo-600', 'text-white');
    closedBtn.classList.remove('btn-primary', 'bg-indigo-600', 'text-white');

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValue}`)
        .then(res => res.json())
        .then(issueData => {
            searchRI(issueData.data || []);
        })
        .catch(err => {
            console.error("Search API failed:", err);
            searchRI([]);
        });
}

// Render search cards
function searchRI(data) {
    searchIssueParent.innerHTML = '';
    
    if (data.length > 0) {
        data.forEach(issue => {
            searchIssueParent.appendChild(createCard(issue));
        });
        noSearchIssue.classList.add('hidden');
        searchIssueParent.classList.remove('hidden');
    } else {
        searchIssueParent.classList.add('hidden');
        noSearchIssue.classList.remove('hidden');
    }
    
    // Update count displayed to reflect search results size
    topBarCounter.innerText = data.length;
    loadingSpinnerH();
}

// Clear Search box
function clearSearch() {
    searchInput.value = '';
    filter('btn-all', 'all-issue-p');
}

// Live Search Debounce Trigger
let debounceTimer;
searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    const value = searchInput.value.trim();
    if (value === '') {
        filter('btn-all', 'all-issue-p');
    } else {
        debounceTimer = setTimeout(() => {
            searchIsu();
        }, 300);
    }
});

// Setup triggers on load
allBtn.classList.add('btn-primary', 'bg-indigo-600', 'text-white');
allIssue();