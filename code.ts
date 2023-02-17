// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'rename-layers') {
    const nodes = figma.currentPage.selection;
    const lines = selectRandomCSVLines(pathToCSV);
    nodes.forEach((node, index) => {
      console.log(node)
        if (node.type === "FRAME" || node.type === "GROUP" || node.type === "COMPONENT") {
          node.name = "test";
        }
      })

    }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};


const pathToCSV = "https://raw.githubusercontent.com/tanvibhakta/name-your-layers/main/names.csv";
async function selectRandomCSVLines(filePath: string): Promise<string[]> {
  const response = await fetch(filePath);
  if (!response.ok) {
    throw new Error(`Failed to fetch CSV file: ${response.status} ${response.statusText}`);
  }
  const fileContent = await response.text();
  const lines = fileContent.split(/\r?\n/);
  const linesToPrint = 5;
  const printedLines = new Set();
  const selectedLines: string[] = [];
  while (printedLines.size < linesToPrint) {
    const randomIndex = Math.floor(Math.random() * lines.length);
    if (!printedLines.has(randomIndex)) {
      selectedLines.push(lines[randomIndex]);
      printedLines.add(randomIndex);
      // console.log("selected lines", selectedLines)
      //   console.log("printed lines", printedLines)
    }
  }
  return selectedLines;
}

selectRandomCSVLines(pathToCSV).then((lines) => {
  console.log("lines", lines)
}).catch((error) => {
  console.error(error);
});