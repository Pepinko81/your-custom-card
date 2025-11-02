import { CardData } from "@/types/card";

export const exportToHtml = async (cardData: CardData): Promise<string> => {
  const htmlTemplate = `<!DOCTYPE html>
<html lang="bg">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Моята Картичка - Cardify</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .card-container {
            max-width: 800px;
            width: 100%;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }
        
        .card-canvas {
            position: relative;
            width: 100%;
            padding-bottom: 75%; /* 4:3 aspect ratio */
            background-size: cover;
            background-position: center;
            background-image: url('${cardData.backgroundImage || ''}');
            background-color: #f0f4f8;
        }
        
        .sticker {
            position: absolute;
            pointer-events: none;
        }
        
        .music-controls {
            padding: 20px;
            background: #f8f9fa;
        }
        
        audio {
            width: 100%;
            margin-bottom: 10px;
        }
        
        .youtube-container {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
        }
        
        .youtube-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
        }
        
        .footer {
            padding: 15px;
            text-align: center;
            background: #f8f9fa;
            color: #666;
            font-size: 14px;
            border-top: 1px solid #e9ecef;
        }
        
        .footer a {
            color: #14b8a6;
            text-decoration: none;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="card-container">
        <div class="card-canvas">
            ${cardData.elements.map(element => `
            <img 
                src="${element.imageUrl}" 
                class="sticker"
                style="
                    left: ${element.x}px;
                    top: ${element.y}px;
                    width: ${element.width}px;
                    height: ${element.height}px;
                    transform: rotate(${element.rotation}deg);
                "
                alt="Sticker"
            />
            `).join('')}
        </div>
        
        ${cardData.music.url ? `
        <div class="music-controls">
            ${cardData.music.type === 'file' ? `
            <audio controls autoplay loop>
                <source src="${cardData.music.url}" type="audio/mpeg">
                Вашият браузър не поддържа аудио елемент.
            </audio>
            ` : `
            <div class="youtube-container">
                <iframe
                    src="https://www.youtube.com/embed/${cardData.music.url}?autoplay=1&loop=1&playlist=${cardData.music.url}"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
            `}
        </div>
        ` : ''}
        
        <div class="footer">
            Създадено с <a href="https://cardify.app" target="_blank">Cardify</a> ❤️
        </div>
    </div>
</body>
</html>`;

  return htmlTemplate;
};

export const downloadHtml = (html: string, filename: string = 'моята-картичка.html') => {
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
