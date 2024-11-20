import fs from 'fs/promises';

export const generateHtml = async(metadata, fontName) => {
    const html = `<html>
<head>
    <title>SVG Icons</title>
    <link rel="stylesheet" href="./output/${fontName}.css">
    <style>
    .container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1.5rem;
    }
    
    .icon-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: .5rem;
        width: 200px;
    }
    
    .container .icon-container i {
        font-size: 2rem;
    }
    </style>
</head>
<body>
    <h1>SVG Icons</h1>
    <div class="container">
    ${metadata.map(({name}) => `${fontName}-${name}`)
              .map((className) => `<div class="icon-container"><i class="${className}"></i><span>${className}</span></div>`)
              .join('')}
    </div>
</body>
</html>`;

    try {
        await fs.writeFile('./index.html', html);
    } catch (ero) {
        console.error('Error while generating HTML file:', err);
    }
};
