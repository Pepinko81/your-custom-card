import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Youtube } from "lucide-react";
import { toast } from "sonner";

interface MusicUploaderProps {
  open: boolean;
  onClose: () => void;
  onAddMusic: (type: 'file' | 'youtube', url: string) => void;
}

export const MusicUploader = ({ open, onClose, onAddMusic }: MusicUploaderProps) => {
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('audio/')) {
        toast.error("Моля изберете аудио файл");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        onAddMusic('file', base64);
        toast.success("Музиката е добавена!");
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleYoutubeSubmit = () => {
    if (!youtubeUrl) {
      toast.error("Моля въведете YouTube линк");
      return;
    }
    
    // Extract video ID from various YouTube URL formats
    const videoIdMatch = youtubeUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    
    if (!videoIdMatch) {
      toast.error("Невалиден YouTube линк");
      return;
    }
    
    onAddMusic('youtube', videoIdMatch[1]);
    toast.success("YouTube музиката е добавена!");
    setYoutubeUrl("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Добави музика</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="file" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file" className="gap-2">
              <Upload className="w-4 h-4" />
              MP3 Файл
            </TabsTrigger>
            <TabsTrigger value="youtube" className="gap-2">
              <Youtube className="w-4 h-4" />
              YouTube
            </TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="audio-file">Избери MP3 файл</Label>
              <Input
                id="audio-file"
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="cursor-pointer"
              />
            </div>
          </TabsContent>

          <TabsContent value="youtube" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="youtube-url">YouTube линк</Label>
              <Input
                id="youtube-url"
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
            </div>
            <Button
              onClick={handleYoutubeSubmit}
              className="w-full bg-gradient-primary hover:opacity-90"
            >
              Добави
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
