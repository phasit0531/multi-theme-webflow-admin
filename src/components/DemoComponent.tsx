
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Star, Heart, Share, MessageCircle } from 'lucide-react';

const DemoComponent = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [likes, setLikes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(8);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleComment = () => {
    setComments(comments + 1);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Demo Component Showcase</CardTitle>
            <CardDescription>
              Interactive component demonstrating theme and language features
            </CardDescription>
          </div>
          <Badge variant="secondary">
            {theme === 'dark' ? '🌙' : '☀️'} {theme}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Current Language</h4>
            <p className="text-sm text-muted-foreground">
              {t('masterData')} | {t('dashboard')} | {t('settings')}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Interactive Elements</h4>
            <div className="flex space-x-2">
              <Button
                variant={isLiked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className="flex items-center space-x-1"
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>{likes}</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleComment}>
                <MessageCircle className="h-4 w-4 mr-1" />
                {comments}
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Feature Preview</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Badge variant="outline" className="justify-center">
              <Star className="h-3 w-3 mr-1" />
              Multi-language
            </Badge>
            <Badge variant="outline" className="justify-center">
              Theme Toggle
            </Badge>
            <Badge variant="outline" className="justify-center">
              Responsive Design
            </Badge>
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-sm">
            This demo component showcases the application's theming system, 
            language switching capabilities, and interactive UI elements. 
            The pagination below demonstrates how data can be efficiently 
            displayed across multiple pages.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoComponent;
