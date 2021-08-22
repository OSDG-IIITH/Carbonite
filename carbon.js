const puppeteer = require("puppeteer");

const getImageFile = async (code, language) => {
	return new Promise(async (resolve, reject) => {
		try {
			const browser = await puppeteer.launch();
			const carbonPage = await browser.newPage({
				waitUntil: "networkidle0",
				timeout: 0,
			});

			await carbonPage.setViewport({
				width: 1920,
				height: 1080,
				deviceScaleFactor: 2.5,
			});

			code = encodeURIComponent(code);
			link = `https://carbon.now.sh/?code=${code}&l=${language}`;

			await carbonPage.goto(link);

			await carbonPage.waitForSelector("#export-container");
			const element = await carbonPage.$("#export-container");

			const carbonPic = await element.screenshot({
				type: "jpeg",
				quality: 100,
			});

			await carbonPage.close();
			await browser.close();

			resolve(carbonPic);
		} catch (e) {
			reject(e);
		}
	});
};

const checkLanguage = async (language) => {
	languages = {
		auto: "auto",
		apache: "text%2Fapache",
		bash: "application%2Fx-sh",
		plaintext: "text",
		c: "text%2Fx-csrc",
		"c++": "text%2Fx-c%2B%2Bsrc",
		cpp: "text%2Fx-c%2B%2Bsrc",
		"c#": "text%2Fx-csharp",
		clojure: "clojure",
		cobol: "cobol",
		coffeeScript: "coffeescript",
		crystal: "crystal",
		css: "css",
		d: "d",
		dart: "dart",
		diff: "text%2Fx-diff",
		django: "django",
		docker: "dockerfile",
		elixir: "elixir",
		elm: "elm",
		erlang: "erlang",
		fortran: "fortran",
		gherkin: "gherkin",
		graphQL: "graphql",
		go: "text%2Fx-go",
		groovy: "groovy",
		handlebars: "handlebars",
		haskell: "haskell",
		html: "htmlmixed",
		xml: "htmlmixed",
		java: "text%2Fx-java",
		javascript: "javascript",
		js: "javascript",
		json: "application%2Fjson",
		jsx: "jsx",
		julia: "julia",
		kotlin: "text%2Fx-kotlin",
		latex: "stex",
		lisp: "commonlisp",
		lua: "lua",
		markdown: "markdown",
		md: "markdown",
		mathematica: "mathematica",
		matlab: "text%2Fx-octave",
		octave: "text%2Fx-octave",
		mysql: "text%2Fx-mysql",
		"n-triples": "application%2Fn-triples",
		nginx: "nginx",
		nim: "nim",
		"objective-c": "text%2Fx-objectivec",
		"ocaml/F#": "mllike",
		"f#": "mllike",
		pascal: "pascal",
		perl: "perl",
		php: "text%2Fx-php",
		powershell: "powershell",
		python: "python",
		py: "python",
		r: "r",
		"risc-v": "riscv",
		ruby: "ruby",
		rust: "rust",
		sass: "sass",
		scala: "text%2Fx-scala",
		smalltalk: "smalltalk",
		solidity: "solidity",
		sparql: "application%2Fsparql-query",
		sql: "sql",
		stylus: "stylus",
		swift: "swift",
		tcl: "tcl",
		toml: "toml",
		turtle: "text%2Fturtle",
		typescript: "application%2Ftypescript",
		tsx: "text%2Ftypescript-jsx",
		twig: "text%2Fx-twig",
		"vb-net": "vb",
		Verilog: "verilog",
		VHDL: "vhdl",
		Vue: "vue",
		XQuery: "xquery",
		YAML: "yaml",
	};

	if (languages[language]) return languages[language];
	else return "auto";
};

module.exports = { getImageFile, checkLanguage };
