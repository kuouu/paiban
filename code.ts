figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
  if (msg.type === "debug") {
    const selectedNodes = figma.currentPage.selection;
    selectedNodes.forEach((node) => {
      console.log(node);
    });
  }

  if (msg.type === "paiban") {
    const platforms = [
      { name: "instagram", height: 1, width: 1 },
      { name: "tiktok", height: 16, width: 9 },
      { name: "xiaohongshu", height: 4, width: 3 },
      { name: "vocus", height: 630, width: 1200, onlyCover: true },
      { name: "woman.udn", height: 2, width: 3, onlyCover: true },
    ];
    const selectedNodes = figma.currentPage.selection;
    const newPage = figma.createPage();
    newPage.name = "New Page";
    selectedNodes.forEach((node) => {
      for (let i = 0; i < platforms.length; i++) {
        const postSize = platforms[i];
        if(!node.name.includes('cover') && postSize.onlyCover) 
          continue;
        // create frame
        const newFrame = figma.createFrame();
        newFrame.name = `${postSize.name}_${node.name}-${i}`;
        const unit = node.width / postSize.width;
        newFrame.resize(unit * postSize.width, unit * postSize.height);
        newFrame.x = i * 2000;
        newFrame.y = node.y;
        newFrame.backgrounds = [
          { type: "SOLID", color: { r: 255/255, g: 245/255, b: 232/255 } },
        ];
        // create node
        const newNode = node.clone();
        newNode.x = 0;
        newNode.y = (newFrame.height - node.height) / 2;
        newFrame.appendChild(newNode);
        // logo
        const logoNode = figma.getNodeById("2675:2952");
        if (logoNode && logoNode.type === "RECTANGLE") {
          const newLogoNode = logoNode.clone();
          newLogoNode.x = 540 - logoNode.width / 2;
          newLogoNode.y = postSize.height * unit - 150;
          newFrame.appendChild(newLogoNode);
        }

        newPage.appendChild(newFrame);
      }
    });
    figma.notify("New page created");
    figma.currentPage = newPage;
  }

  figma.closePlugin();
};
