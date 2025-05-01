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
  
    // Mapping of languages to their GitHub colors
    const languageColors = {
      "Python": "#3572A5",
      "Jupyter Notebook": "#DA5B0B",
      "R": "#198CE7",
      "JavaScript": "#f1e05a",
      "HTML": "#e34c26",
      "CSS": "#563d7c",
      // Add more languages and their colors as needed
    };
  
    const container = document.getElementById("github-repos");
    if (!container) return;
  
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
      .then(r => r.json())
      .then(repos => {
        const filtered = repos.filter(r => includeRepos.includes(r.name));
  
        container.innerHTML = "";
  
        filtered.forEach(repo => {
          if (!repo.name || !repo.html_url) return;
  
          const language = repo.language || "N/A";
          const color = languageColors[language] || "#ccc";
  
          const card = document.createElement("div");
          card.className = "repo-card";
          card.innerHTML = `
            <a href="${repo.html_url}" target="_blank">
                <h3>${repo.name}</h3>
                <p style="flex-grow:1;">${repo.description?.trim() || "No description available."}</p>
                <div class="repo-meta">
                <span class="language-indicator">
                    <span class="language-color" style="background-color:${color};"></span>
                    ${language}
                </span>
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
  