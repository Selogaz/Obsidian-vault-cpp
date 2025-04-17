<%*
let alias = "new"

while (alias != null && alias != "") {

	alias = await tp.system.prompt("new alias")

	if (alias != null && alias != "") {
	  setTimeout(() => {
	    app.fileManager.processFrontMatter(tp.config.target_file, (frontmatter) => {
	      if (frontmatter.aliases) {
	        if (!frontmatter.aliases.includes(alias)) {
	          frontmatter.aliases.push(alias);
	        }
	      } else {
	        frontmatter.aliases = [alias];
	      }
	    });
	  }, 200);
	}

}
-%>