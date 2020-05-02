var inputType = document.getElementById("input-type");
var inputUser = document.getElementById("input-user");
var inputRepo = document.getElementById("input-repo");
var inputIssue = document.getElementById("input-issue");
var inputTheme = document.getElementById("input-theme");
var inputPageSize = document.getElementById("input-pagesize");
var btnCopyClipboard = document.getElementById("btnCopyClipboard");

inputType.addEventListener('change', onTypeChanged);
inputUser.addEventListener('change', onUserChanged);
inputRepo.addEventListener('change', onRepoChanged);
inputIssue.addEventListener('change', onIssueChanged);
inputTheme.addEventListener('change', onThemeChanged);
inputPageSize.addEventListener('input', onPageSizeChanged);
btnCopyClipboard.addEventListener('click', onCopyClipboardClicked);

function onTypeChanged(event) {
    let placeholder = 'User';
    switch (event.target.value) {
        case 'users': placeholder = 'User'; break;
        case 'orgs': placeholder = 'Organization'; break;
    }
    inputUser.parentElement.parentElement.querySelector('.form-group-header label').innerText = placeholder;
    inputUser.placeholder = placeholder;
}

function onUserChanged(event) {
    fetch('https://api.github.com/' + inputType.value + '/' + event.target.value + '/repos')
        .then(response => response.json())
        .then(data => {
            inputRepo.innerHTML = '';
            for (let repo of data) {
                var opt = document.createElement('option');
                opt.innerText = repo.name;
                opt.value = repo.name;
                inputRepo.appendChild(opt);
            }
            inputRepo.parentElement.parentElement.style.display = 'block';
        })
        .catch(error => console.error(error));
}

function onRepoChanged(event) {
    fetch(`https://api.github.com/repos/${inputUser.value}/${event.target.value}/issues`)
        .then(response => response.json())
        .then(data => {
            inputIssue.innerHTML = '';
            if (data && data.length) {
                for (let issue of data.sort(compare)) {
                    var opt = document.createElement('option');
                    opt.innerText = issue.title;
                    opt.value = issue.number;
                    inputIssue.appendChild(opt);
                }
            } else {
                var opt = document.createElement('option');
                opt.innerText = 'No Issues';
                opt.value = -1;
                inputIssue.appendChild(opt);
            }
            inputIssue.parentElement.parentElement.style.display = 'block';
        })
        .catch(error => console.error(error));
}

function onIssueChanged(event) {
    let issue = event.target.value;
    if (issue !== -1)
        document.getElementById("hljs-value-repo").innerText = `\'${inputUser.value}/${inputRepo.value}/${issue}\'`;
}

function onThemeChanged(event) {
    document.getElementById("hljs-value-theme").innerText = '\'' + event.target.value.toLowerCase() + '\'';
}

function onPageSizeChanged(event) {
    document.getElementById("hljs-value-page-size").innerText = '\'' + event.target.value + '\'';
}

function onCopyClipboardClicked(event) {
    event.target.innerHTML = '<svg aria-hidden="true" height="16" role="img" viewBox="0 0 14 16" width="14" style="display:inline-block;fill:#28a745;user-select:none;vertical-align:text-bottom"><path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path></svg>';
    var range = document.createRange();
    range.selectNode(document.getElementById('copyArea'));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    setTimeout(function () {
        event.target.innerHTML = '<svg aria-hidden="true" height="16" role="img" viewBox="0 0 14 16" width="14" style="display:inline-block;fill:currentColor;user-select:none;vertical-align:text-bottom"><path fill-rule="evenodd" d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"></path></svg>';
    }, 1000);
}

function compare(a, b) {
    if (a.number < b.number) return -1;
    if (a.number > b.number) return 1;
    return 0;
}