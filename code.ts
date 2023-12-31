figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
  if (msg.type === "test") {
    const postSizes = [
      { platform: "instagram", height: 1, width: 1 },
      { platform: "tiktok", height: 16, width: 9 },
      { platform: "xiaohongshu", height: 4, width: 3 },
    ];
    const selectedNodes = figma.currentPage.selection;
    const newPage = figma.createPage();
    newPage.name = "New Page";
    selectedNodes.forEach((node) => {
      for (let i = 0; i < postSizes.length; i++) {
        const postSize = postSizes[i];
        // create frame
        const newFrame = figma.createFrame();
        newFrame.name = `${postSize.platform}_${node.name}-${i}`;
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
        newPage.appendChild(newFrame);
      }
    });
    figma.notify("New page created");
    figma.currentPage = newPage;
  }

  figma.closePlugin();
};
