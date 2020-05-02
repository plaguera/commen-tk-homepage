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
        case 'user': placeholder = 'User'; break;
        case 'org': placeholder = 'Organization'; break;
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

document.getElementById("inputType").addEventListener('change', onTypeChanged);
document.getElementById("inputUser").addEventListener('change', onUserChanged);
document.getElementById("inputRepo").addEventListener('change', onRepoChanged);
document.getElementById("inputIssue").addEventListener('change', onIssueChanged);
document.getElementById("inputTheme").addEventListener('change', onThemeChanged);
document.getElementById("inputPageSize").addEventListener('input', onPageSizeChanged);