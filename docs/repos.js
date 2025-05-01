document.addEventListener("DOMContentLoaded", () => {
    const username = "michaelmontemurri";
    const includeRepos = [
      "gnn-lspe",
      "DGB-edgebank2.0",
      "BigData25",
      "RFandFriends",
      "RegressionPackage",
      "ProbabilisticPCA"
    ];
  
    const container = document.getElementById("github-repos");
    if (!container) return;
  
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
      .then(r => r.json())
      .then(repos => {
        const filtered = repos.filter(r => includeRepos.includes(r.name));
  
        container.innerHTML = "";          //  ← clear **once**
  
        filtered.forEach(repo => {
          if (!repo.name || !repo.html_url) return;
  
          const card = document.createElement("div");
          card.className = "repo-card";
          card.innerHTML = `
            <a href="${repo.html_url}" target="_blank">
              <h3>${repo.name}</h3>
              <p>${repo.description?.trim() || "No description available."}</p>
              <div class="repo-meta">
                <span>${repo.language || "N/A"}</span>

              </div>
            </a>
          `;
          container.appendChild(card);
        });
      })
      .catch(err => {
        container.innerHTML = "<p>Failed to load repositories.</p>";
        console.error("GitHub API error:", err);
      });
  });
  