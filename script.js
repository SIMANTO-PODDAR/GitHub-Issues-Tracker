// Get Elements
const allIssueParent = document.getElementById('all-issue-p');
const openIssueParent = document.getElementById('open-issue-p');
const closedIssueParent = document.getElementById('closed-issue-p');


// Get Top Btn 
const allBtn = document.getElementById('btn-all');
const openBtn = document.getElementById('btn-open');
const closedBtn = document.getElementById('btn-closed');

// function for Filter & color activeBtn
function filter(id, id2) {
    allBtn.classList.remove('btn-primary');
    openBtn.classList.remove('btn-primary');
    closedBtn.classList.remove('btn-primary');

    allIssueParent.classList.add('hidden')
    openIssueParent.classList.add('hidden')
    closedIssueParent.classList.add('hidden')


    const activeBtn = document.getElementById(id).classList.add('btn-primary');
    const activeParent = document.getElementById(id2).classList.remove('hidden');

}


// function & API All Issues
const allIssue = () => {
    loadingSpinnerS();
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues").then(res => res.json())
        .then(issueData => displayAllIssues(issueData.data));

};


function displayAllIssues(data) {
    allIssueParent.innerHTML = '';
    openIssueParent.innerHTML = '';
    closedIssueParent.innerHTML = '';
    
    data.forEach(issue => {
        // 1 Create Element
        let issueDiv1 = document.createElement('div');
        let issueDiv2 = document.createElement('div');
        let issueDiv3 = document.createElement('div');

        // 2 Set HTML
        issueDiv1.innerHTML = `
                                <div
                            class="w-[320px] h-80 border-t-3 shadow-md outline-[0.5px] rounded-xl ${issue.status == "open" ? 'outline-green-500 border-green-500' : 'outline-fuchsia-800 border-fuchsia-800'} bg-sky-50">
                            <!-- Card -->

                            <div class="p-3">

                                <div class="flex justify-between mb-1">
                                    <span class="w-5 h-5 bg-emerald-300 rounded-full flex items-center justify-center">${issue.status == "open" ? '<img class=" w-6 h-6 " src="./img/OpenStatus.png" alt="Open-Status">' : '<img class=" w-6 h-6 " src="./img/ClosedStatus.png" alt="Closed">'}</span>
                                    <span class="w-20 h-6 pl-1.5 bg-yellow-200 rounded-2xl">${issue.priority}</span>
                                </div>

                                <h1 class="font-bold text-xl my-1.5">${issue.title}</h1>

                                <p class="mb-3 line-clamp-2">${issue.description}</p>

                                <div class="my-1.5 pt-1.5 flex">
                                    <div
                                        class=" ${issue.labels.includes("bug") ? 'flex' : 'hidden'}   p-1 ml-1 bg-red-100 text-red-700 outline-red-500 rounded-2xl w-16  items-center justify-center outline-1 ">
                                        <i class="fa-solid fa-bug"></i>
                                        <p class="text-[12px]">BUG</p>
                                    </div>

                                    <div
                                        class=" ${issue.labels.includes("help wanted") ? 'flex' : 'hidden'} p-1 ml-1 bg-yellow-100 text-yellow-700 outline-yellow-500 rounded-2xl w-40 outline-1 flex items-center justify-center">
                                        <i class="fa-solid fa-life-ring"></i>
                                        <p class="text-[12px]">HELP WANTED</p>
                                    </div>

                                    <div
                                        class="  ${issue.labels.includes("enhancement") ? 'flex' : 'hidden'} p-1 ml-1 bg-green-100 text-green-700 outline-green-500 rounded-2xl w-40 outline-1 flex items-center justify-center">
                                        <i class="fa-solid fa-arrow-up-right-dots"></i>
                                        <p class="text-[12px]">ENHANCEMENT </p>
                                    </div>

                                    <div
                                        class="  ${issue.labels.includes("documentation") ? 'flex' : 'hidden'} p-1 ml-1 bg-green-100 text-green-700 outline-green-500 rounded-2xl w-40 outline-1 flex items-center justify-center">
                                        <i class="fa-brands fa-readme"></i>
                                        <p class="text-[12px]">DOCUMENTATION</p>
                                    </div>

                                    <div
                                        class="  ${issue.labels.includes("good first issue") ? 'flex' : 'hidden'} p-1 ml-1 bg-yellow-100 text-yellow-700 outline-yellow-500 rounded-2xl w-40 outline-1 flex items-center justify-center">
                                        <i class="fa-solid fa-file-circle-exclamation "></i>
                                        <p class="text-[12px]"> GOOD FIRST ISSUE</p>
                                    </div>

                                </div>

                            </div>

                            <div class="divider my-2"></div>

                            <div class="p-3">
                                <p> Author <span> #${issue.author} </p>
                                <p class="pb-0.5"> Created At <span> ${issue.createdAt} </span></p>
                            </div>

                        </div> <!-- END Card -->
        `
        issueDiv2.innerHTML = `
                                <div
                            class="w-[320px] h-80 border-t-3 shadow-md outline-[0.5px] rounded-xl ${issue.status == "open" ? 'outline-green-500 border-green-500' : 'outline-fuchsia-800 border-fuchsia-800'} bg-sky-50">
                            <!-- Card -->

                            <div class="p-3">

                                <div class="flex justify-between mb-1">
                                    <span class="w-5 h-5 bg-emerald-300 rounded-full flex items-center justify-center">${issue.status == "open" ? '<img class=" w-6 h-6 " src="./img/OpenStatus.png" alt="Open-Status">' : '<img class=" w-6 h-6 " src="./img/ClosedStatus.png" alt="Closed">'}</span>
                                    <span class="w-20 h-6 pl-1.5 bg-yellow-200 rounded-2xl">${issue.priority}</span>
                                </div>

                                <h1 class="font-bold text-xl my-1.5">${issue.title}</h1>

                                <p class="mb-3 line-clamp-2">${issue.description}</p>

                                <div class="my-1.5 pt-1.5 flex">
                                    <div
                                        class=" ${issue.labels.includes("bug") ? 'flex' : 'hidden'}   p-1 ml-1 bg-red-100 text-red-700 outline-red-500 rounded-2xl w-16  items-center justify-center outline-1 ">
                                        <i class="fa-solid fa-bug"></i>
                                        <p class="text-[12px]">BUG</p>
                                    </div>

                                    <div
                                        class=" ${issue.labels.includes("help wanted") ? 'flex' : 'hidden'} p-1 ml-1 bg-yellow-100 text-yellow-700 outline-yellow-500 rounded-2xl w-40 outline-1 flex items-center justify-center">
                                        <i class="fa-solid fa-life-ring"></i>
                                        <p class="text-[12px]">HELP WANTED</p>
                                    </div>

                                    <div
                                        class="  ${issue.labels.includes("enhancement") ? 'flex' : 'hidden'} p-1 ml-1 bg-green-100 text-green-700 outline-green-500 rounded-2xl w-40 outline-1 flex items-center justify-center">
                                        <i class="fa-solid fa-arrow-up-right-dots"></i>
                                        <p class="text-[12px]">ENHANCEMENT </p>
                                    </div>

                                    <div
                                        class="  ${issue.labels.includes("documentation") ? 'flex' : 'hidden'} p-1 ml-1 bg-green-100 text-green-700 outline-green-500 rounded-2xl w-40 outline-1 flex items-center justify-center">
                                        <i class="fa-brands fa-readme"></i>
                                        <p class="text-[12px]">DOCUMENTATION</p>
                                    </div>

                                    <div
                                        class="  ${issue.labels.includes("good first issue") ? 'flex' : 'hidden'} p-1 ml-1 bg-yellow-100 text-yellow-700 outline-yellow-500 rounded-2xl w-40 outline-1 flex items-center justify-center">
                                        <i class="fa-solid fa-file-circle-exclamation "></i>
                                        <p class="text-[12px]"> GOOD FIRST ISSUE</p>
                                    </div>

                                </div>

                            </div>

                            <div class="divider my-2"></div>

                            <div class="p-3">
                                <p> Author <span> #${issue.author} </p>
                                <p class="pb-0.5"> Created At <span> ${issue.createdAt} </span></p>
                            </div>

                        </div> <!-- END Card -->
        `
        issueDiv3.innerHTML = `
                                <div
                            class="w-[320px] h-80 border-t-3 shadow-md outline-[0.5px] rounded-xl ${issue.status == "open" ? 'outline-green-500 border-green-500' : 'outline-fuchsia-800 border-fuchsia-800'} bg-sky-50">
                            <!-- Card -->

                            <div class="p-3">

                                <div class="flex justify-between mb-1">
                                    <span class="w-5 h-5 bg-emerald-300 rounded-full flex items-center justify-center">${issue.status == "open" ? '<img class=" w-6 h-6 " src="./img/OpenStatus.png" alt="Open-Status">' : '<img class=" w-6 h-6 " src="./img/ClosedStatus.png" alt="Closed">'}</span>
                                    <span class="w-20 h-6 pl-1.5 bg-yellow-200 rounded-2xl">${issue.priority}</span>
                                </div>

                                <h1 class="font-bold text-xl my-1.5">${issue.title}</h1>

                                <p class="mb-3 line-clamp-2">${issue.description}</p>

                                <div class="my-1.5 pt-1.5 flex">
                                    <div
                                        class=" ${issue.labels.includes("bug") ? 'flex' : 'hidden'}   p-1 ml-1 bg-red-100 text-red-700 outline-red-500 rounded-2xl w-16  items-center justify-center outline-1 ">
                                        <i class="fa-solid fa-bug"></i>
                                        <p class="text-[12px]">BUG</p>
                                    </div>

                                    <div
                                        class=" ${issue.labels.includes("help wanted") ? 'flex' : 'hidden'} p-1 ml-1 bg-yellow-100 text-yellow-700 outline-yellow-500 rounded-2xl w-40 outline-1 flex items-center justify-center">
                                        <i class="fa-solid fa-life-ring"></i>
                                        <p class="text-[12px]">HELP WANTED</p>
                                    </div>

                                    <div
                                        class="  ${issue.labels.includes("enhancement") ? 'flex' : 'hidden'} p-1 ml-1 bg-green-100 text-green-700 outline-green-500 rounded-2xl w-40 outline-1 flex items-center justify-center">
                                        <i class="fa-solid fa-arrow-up-right-dots"></i>
                                        <p class="text-[12px]">ENHANCEMENT </p>
                                    </div>

                                    <div
                                        class="  ${issue.labels.includes("documentation") ? 'flex' : 'hidden'} p-1 ml-1 bg-green-100 text-green-700 outline-green-500 rounded-2xl w-40 outline-1 flex items-center justify-center">
                                        <i class="fa-brands fa-readme"></i>
                                        <p class="text-[12px]">DOCUMENTATION</p>
                                    </div>

                                    <div
                                        class="  ${issue.labels.includes("good first issue") ? 'flex' : 'hidden'} p-1 ml-1 bg-yellow-100 text-yellow-700 outline-yellow-500 rounded-2xl w-40 outline-1 flex items-center justify-center">
                                        <i class="fa-solid fa-file-circle-exclamation "></i>
                                        <p class="text-[12px]"> GOOD FIRST ISSUE</p>
                                    </div>

                                </div>

                            </div>

                            <div class="divider my-2"></div>

                            <div class="p-3">
                                <p> Author <span> #${issue.author} </p>
                                <p class="pb-0.5"> Created At <span> ${issue.createdAt} </span></p>
                            </div>

                        </div> <!-- END Card -->
        `

        // 3 Append


        allIssueParent.appendChild(issueDiv1);

        if (issue.status == "open") {
            openIssueParent.appendChild(issueDiv2);
        }

        if (issue.status == "closed") {
            closedIssueParent.appendChild(issueDiv3);
        }

        loadingSpinnerH();
    });

}




//  loadingSpinner function
function loadingSpinnerS() {
    let spinner = document.getElementById('loading-spinner')
    spinner.classList.remove('hidden');
    spinner.classList.add('flex');
}
function loadingSpinnerH() {
    let spinner = document.getElementById('loading-spinner')
    spinner.classList.remove('flex');
    spinner.classList.add('hidden');
}





// Cll All Btn
allBtn.addEventListener('click', function () {
    allIssue();
})

//Cll 1st
allIssue();