// your code here

function displayRepositories() {
    var repos = JSON.parse(this.responseText);
    const repoList = `<ul>${repos
      .map(
        r =>
          `<li><a href="https://github.com/${r.full_name}/">${r.name}</a> 
          <a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getCommits(this)">Get Commits</a></li>
          <a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getBranches(this)">Get Branches</a></li>`
      )
      .join('')}</ul>`;
    document.getElementById('repositories').innerHTML = repoList;
}
   
function getRepositories() {
    let username = document.querySelector('input').value
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayRepositories);
    req.open('GET', `https://api.github.com/users/${username}/repos`);
    req.send();
}

function getCommits(el) {
    const username = el.dataset.username
    const name = el.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', `https://api.github.com/repos/${username}/${name}/commits`);
    req.send();
  }

  function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits
      .map(
        commit =>
          `<li>${commit.author.login}<strong>${commit.commit.author.name}</strong> - ${commit.commit.message}</li>`
      )
      .join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
  }

function displayBranches(){
    const branches = JSON.parse(this.responseText);

    const branchesList = `<ul>${branches
      .map(
        branch =>
          `<li><strong>${branch.name}</strong></li>`
      )
      .join('')}</ul>`;
    document.getElementById('details').innerHTML = branchesList;
}

function getBranches(el){
    const username = el.dataset.username
    const name = el.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayBranches);
    req.open('GET', `https://api.github.com/repos/${username}/${name}/branches`);
    req.send();
}