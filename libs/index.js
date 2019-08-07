/**
 * Docsify config
 */

window.$docsify = {
  name: "环境环保建议书",
  /*repo: "https://teawlili.github.io/green-proposal/",*/
  auto2top: true,
  loadSidebar: true,
  mergeNavbar: true,
  subMaxLevel: 2,
  homepage: "README.md",
  ga: "UA-122081516-1",
  search: {
    noData: {
      "/zh-cn/": "找不到结果!",
      "/": "No results!"
    },
    paths: "auto",
    placeholder: {
      "/zh-cn/": "搜索",
      "/": "Search"
    }
  },
  plugins: [
    function(hook, vm) {
      /*hook.beforeEach(function(html) {
        var url =
          "https://github.com/l-hammer/You-need-to-know-css/blob/master/" +
          vm.route.file;
        var editHtml = "[📝 EDIT DOCUMENT](" + url + ")\n";

        return editHtml + html;
      });*/

      hook.doneEach(function() {
        var label, domObj, main, divEle, gitalk;
        label = vm.route.path.split("/").pop();
        domObj = Docsify.dom;
        main = domObj.getNode("#main");

        /**
         * render gittalk
         */
        if (vm.route.path.includes("zh-cn")) {
          gitalkConfig.language = "zh-CN";
        }
        Array.apply(
          null,
          document.querySelectorAll("div.gitalk-container")
        ).forEach(function(ele) {
          ele.remove();
        });
        divEle = domObj.create("div");
        divEle.id = "gitalk-container-" + label;
        divEle.className = "gitalk-container";
        divEle.style = "width: " + main.clientWidth + "px; margin: 0 auto 20px;";
        domObj.appendTo(domObj.find(".content"), divEle);
        gitalk = new Gitalk(
          Object.assign(gitalkConfig, { id: !label ? "home" : label })
        );
        gitalk.render("gitalk-container-" + label);
      });
    }
  ]
};
