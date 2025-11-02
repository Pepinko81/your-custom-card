import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Image as FabricImage } from "fabric";
import { CardElement } from "@/types/card";

interface FabricObjectWithData extends FabricImage {
  elementId?: string;
  imageUrl?: string;
}

interface CardCanvasProps {
  backgroundImage: string | null;
  elements: CardElement[];
  onElementsChange: (elements: CardElement[]) => void;
}

export const CardCanvas = ({ backgroundImage, elements, onElementsChange }: CardCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);

  // Initialize Fabric canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#f0f4f8',
    });

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  // Update background
  useEffect(() => {
    if (!fabricCanvas || !backgroundImage) return;

    FabricImage.fromURL(backgroundImage, {
      crossOrigin: 'anonymous',
    }).then((img) => {
      img.scaleToWidth(800);
      img.scaleToHeight(600);
      img.set({
        selectable: false,
        evented: false,
      });
      fabricCanvas.backgroundImage = img;
      fabricCanvas.renderAll();
    });
  }, [fabricCanvas, backgroundImage]);

  // Handle object modifications
  useEffect(() => {
    if (!fabricCanvas) return;

    const handleModified = () => {
      const objects = fabricCanvas.getObjects();
      const updatedElements: CardElement[] = objects
        .filter((obj) => {
          const imgObj = obj as FabricObjectWithData;
          return imgObj.elementId;
        })
        .map((obj) => {
          const imgObj = obj as FabricObjectWithData;
          return {
            id: imgObj.elementId || '',
            type: 'sticker' as const,
            imageUrl: imgObj.imageUrl || '',
            x: obj.left || 0,
            y: obj.top || 0,
            width: (obj.width || 100) * (obj.scaleX || 1),
            height: (obj.height || 100) * (obj.scaleY || 1),
            rotation: obj.angle || 0,
          };
        });
      onElementsChange(updatedElements);
    };

    fabricCanvas.on('object:modified', handleModified);

    return () => {
      fabricCanvas.off('object:modified', handleModified);
    };
  }, [fabricCanvas, onElementsChange]);

  // Sync elements from props to canvas
  useEffect(() => {
    if (!fabricCanvas) return;

    // Clear existing objects (except background)
    const objects = fabricCanvas.getObjects();
    objects.forEach(obj => {
      const imgObj = obj as FabricObjectWithData;
      if (imgObj.elementId) {
        fabricCanvas.remove(obj);
      }
    });

    // Add elements from props
    elements.forEach((element) => {
      FabricImage.fromURL(element.imageUrl, {
        crossOrigin: 'anonymous',
      }).then((img) => {
        const imgWithData = img as FabricObjectWithData;
        imgWithData.set({
          left: element.x,
          top: element.y,
          angle: element.rotation,
          scaleX: element.width / (img.width || 100),
          scaleY: element.height / (img.height || 100),
        });
        imgWithData.elementId = element.id;
        imgWithData.imageUrl = element.imageUrl;
        fabricCanvas.add(imgWithData);
        fabricCanvas.renderAll();
      });
    });
  }, [elements, fabricCanvas]);

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="relative rounded-2xl overflow-hidden shadow-hover border-2 border-border bg-white">
        <canvas ref={canvasRef} />
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm text-muted-foreground border border-border">
          Влачи, въртеше и мащабирай фигурките
        </div>
      </div>
    </div>
  );
};
