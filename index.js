function compare(a, b) {
    if (a.number < b.number) {
        return -1;
    }
    if (a.number > b.number) {
        return 1;
    }
    return 0;
}

function onTypeChanged(event) {
    let placeholder = 'User';
    switch (event.target.value) {
        case 'users': placeholder = 'User'; break;
        case 'orgs': placeholder = 'Organization'; break;
    }
    document.getElementById('inputUser').placeholder = placeholder;
}

function onUserChanged(event) {
    let scope = document.getElementById('inputType').value;
    fetch('https://api.github.com/' + scope + '/' + event.target.value + '/repos')
        .then(response => response.json())
        .then(data => {
            let inputRepo = document.getElementById("inputRepo");
            inputRepo.innerHTML = '';
            for (let repo of data) {
                var opt = document.createElement('option');
                opt.innerText = repo.name;
                opt.value = repo.name;
                inputRepo.appendChild(opt);
            }
        })
        .catch(error => console.error(error));
}

function onRepoChanged(event) {
    let user = document.getElementById('inputUser').value;
    fetch(`https://api.github.com/repos/${user}/${event.target.value}/issues`)
        .then(response => response.json())
        .then(data => {
            let inputIssue = document.getElementById("inputIssue");
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
        })
        .catch(error => console.error(error));
}

function onIssueChanged(event) {
    let user = document.getElementById('inputUser').value;
    let repo = document.getElementById('inputRepo').value;
    let issue = event.target.value;
    if (issue !== -1)
        document.getElementById("hljs-value-repo").innerText = `\'${user}/${repo}/${issue}\'`;
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

document.getElementById("inputType").addEventListener('change', onTypeChanged);
document.getElementById("inputUser").addEventListener('change', onUserChanged);
document.getElementById("inputRepo").addEventListener('change', onRepoChanged);
document.getElementById("inputIssue").addEventListener('change', onIssueChanged);
document.getElementById("inputTheme").addEventListener('change', onThemeChanged);
document.getElementById("inputPageSize").addEventListener('input', onPageSizeChanged);
document.getElementById("btnCopyClipboard").addEventListener('click', onCopyClipboardClicked);