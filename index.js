var inputType = document.getElementById("input-type");
var inputOwner = document.getElementById("input-owner");
var inputRepo = document.getElementById("input-repo");
var inputIssues = document.getElementsByName("input-issue");
var inputIssueNumber = document.getElementById("input-issuenumber");
var inputTheme = document.getElementById("input-theme");
var inputPageSize = document.getElementById("input-pagesize");
var btnCopyClipboard = document.getElementById("btnCopyClipboard");

inputOwner.addEventListener('change', onOwnerChanged);
inputRepo.addEventListener('change', onRepoChanged);
inputIssues.forEach(inputIssue => inputIssue.addEventListener('change', onIssueParam));
inputIssueNumber.addEventListener('change', onIssueNumberChanged);
inputTheme.addEventListener('change', onThemeChanged);
inputPageSize.addEventListener('input', onPageSizeChanged);
btnCopyClipboard.addEventListener('click', onCopyClipboardClicked);

function onOwnerChanged(event) {
    fetch('https://api.github.com/users/' + event.target.value + '/repos')
        .then(response => response.json())
        .then(data => {
            inputRepo.innerHTML = '';
            for (let repo of data) {
                var opt = document.createElement('option');
                opt.innerText = repo.name;
                opt.value = repo.name;
                inputRepo.appendChild(opt);
                console.log(repo.name);
            }
            inputRepo.parentElement.parentElement.style.display = 'block';
            document.getElementById("hljs-value-repo").innerText = `\'${inputOwner.value}/[REPO]\'`;
        })
        .catch(error => console.error(error));
}

function onRepoChanged(event) {
    document.getElementById("hljs-value-repo").innerText = `\'${inputOwner.value}/${inputRepo.value}\'`;
}

function onIssueParam(event) {
    let attr = document.getElementById("hljs-attribute-issue").innerText;
    if (event.target.value == 'number') {
        document.getElementById("hljs-value-issue").innerText = "'" + inputIssueNumber.value + "'";
        if (attr == 'issue-param')
            document.getElementById("hljs-attribute-issue").innerText = 'issue-number';
    }
    else {
        document.getElementById("hljs-value-issue").innerText = `\'${event.target.value}\'`;
        if (attr == 'issue-number')
            document.getElementById("hljs-attribute-issue").innerText = 'issue-param';
    }
}

function onIssueNumberChanged(event) {
    document.getElementById("hljs-value-issue").innerText = "'" + inputIssueNumber.value + "'";
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